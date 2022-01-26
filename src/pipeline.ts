import { mkdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import { Stage } from 'aws-cdk-lib';
import { EnvironmentPlaceholders } from 'aws-cdk-lib/cx-api';
import { PipelineBase, PipelineBaseProps, ShellStep, StackAsset, StackDeployment, StackOutputReference, Step } from 'aws-cdk-lib/pipelines';
import { AGraphNode, PipelineGraph, Graph, isGraph } from 'aws-cdk-lib/pipelines/lib/helpers-internal';
import { Construct } from 'constructs';
import * as decamelize from 'decamelize';
import * as YAML from 'yaml';
import * as github from './workflows-model';

const CDKOUT_ARTIFACT = 'cdk.out';
const RUNS_ON = 'ubuntu-latest';

/**
 * Props for `GitHubWorkflow`.
 */
export interface GitHubWorkflowProps extends PipelineBaseProps {
  /**
   * File path for the GitHub workflow.
   *
   * @default ".github/workflows/deploy.yml"
   */
  readonly workflowPath?: string;

  /**
   * Name of the workflow.
   *
   * @default "deploy"
   */
  readonly workflowName?: string;

  /**
   * GitHub workflow triggers.
   *
   * @default - By default, workflow is triggered on push to the `main` branch
   * and can also be triggered manually (`workflow_dispatch`).
   */
  readonly workflowTriggers?: github.Triggers;

  /**
   * Version of the CDK CLI to use.
   * @default - automatic
   */
  readonly cdkCliVersion?: string;

  /**
   * Indicates if the repository already contains a synthesized `cdk.out` directory, in which
   * case we will simply checkout the repo in jobs that require `cdk.out`.
   *
   * @default false
   */
  readonly preSynthed?: boolean;

  /**
   * Names of GitHub repository secrets that include AWS credentials for
   * deployment.
   *
   * @default - `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
   */
  readonly awsCredentials?: AwsCredentialsSecrets;

  /**
   * Build container options.
   * @default - GitHub defaults
   */
  readonly buildContainer?: github.ContainerOptions;

  /**
   * GitHub workflow steps to execute before build.
   * @default []
   */
  readonly preBuildSteps?: github.JobStep[];

  /**
   * GitHub workflow steps to execute after build.
   * @default []
   */
  readonly postBuildSteps?: github.JobStep[];

  /**
   * Names of Docker Hub secrets that include Docker Hub credentials for
   * deployment.
   *
   * @default - `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.
   */
  readonly dockerHubCredentials?: DockerHubCredentialsSecrets;
}

/**
 * CDK Pipelines for GitHub workflows.
 */
export class GitHubWorkflow extends PipelineBase {
  public readonly workflowPath: string;
  public readonly workflowName: string;

  private readonly workflowTriggers: github.Triggers;
  private readonly preSynthed: boolean;
  private readonly awsCredentials: AwsCredentialsSecrets;
  private readonly dockerHubCredentials: DockerHubCredentialsSecrets;
  private readonly cdkCliVersion?: string;
  private readonly buildContainer?: github.ContainerOptions;
  private readonly preBuildSteps: github.JobStep[];
  private readonly postBuildSteps: github.JobStep[];
  private readonly jobOutputs: Record<string, github.JobStepOutput[]> = {};

  constructor(scope: Construct, id: string, props: GitHubWorkflowProps) {
    super(scope, id, props);

    this.cdkCliVersion = props.cdkCliVersion;
    this.preSynthed = props.preSynthed ?? false;
    this.buildContainer = props.buildContainer;
    this.preBuildSteps = props.preBuildSteps ?? [];
    this.postBuildSteps = props.postBuildSteps ?? [];

    this.awsCredentials = props.awsCredentials ?? {
      accessKeyId: 'AWS_ACCESS_KEY_ID',
      secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
    };

    this.dockerHubCredentials = props.dockerHubCredentials ?? {
      username: 'DOCKERHUB_USERNAME',
      personalAccessToken: 'DOCKERHUB_TOKEN',
    };

    this.workflowPath = props.workflowPath ?? '.github/workflows/deploy.yml';
    if (!this.workflowPath.endsWith('.yml') && !this.workflowPath.endsWith('.yaml')) {
      throw new Error('workflow file is expected to be a yaml file');
    }
    if (!this.workflowPath.includes('.github/workflows/')) {
      throw new Error('workflow files must be stored in the \'.github/workflows\' directory of your repository');
    }

    this.workflowName = props.workflowName ?? 'deploy';
    this.workflowTriggers = props.workflowTriggers ?? {
      push: { branches: ['main'] },
      workflowDispatch: {},
    };
  }

  protected doBuildPipeline() {
    const app = Stage.of(this);
    if (!app) { throw new Error('');}
    const cdkoutDir = app?.outdir;

    const jobs = new Array<Job>();

    const structure = new PipelineGraph(this, {
      selfMutation: false,
      publishTemplate: true,
      prepareStep: false, // we create and execute the changeset in a single job
    });

    for (const stageNode of flatten(structure.graph.sortedChildren())) {
      if (!isGraph(stageNode)) {
        throw new Error(`Top-level children must be graphs, got '${stageNode}'`);
      }

      const tranches = stageNode.sortedLeaves();

      for (const tranche of tranches) {
        for (const node of tranche) {
          const job = this.jobForNode(node, {
            assemblyDir: cdkoutDir,
            structure,
          });

          if (job) {
            jobs.push(job);
          }
        }
      }
    }

    // convert jobs to a map and make sure there are no duplicates
    const jobmap: Record<string, github.Job> = {};
    for (const job of jobs) {
      if (job.id in jobmap) {
        throw new Error(`duplicate job id ${job.id}`);
      }
      jobmap[job.id] = snakeCaseKeys(job.definition);
    }

    // Update jobs with late-bound output requests
    this.insertJobOutputs(jobmap);

    const workflow = {
      name: this.workflowName,
      on: snakeCaseKeys(this.workflowTriggers, '_'),
      jobs: jobmap,
    };

    // write as a yaml file
    const yaml = YAML.stringify(workflow, {
      indent: 2,
    });

    // eslint-disable-next-line no-console
    console.error(`writing ${this.workflowPath}`);
    mkdirSync(path.dirname(this.workflowPath), { recursive: true });
    writeFileSync(this.workflowPath, yaml);
  }

  private insertJobOutputs(jobmap: Record<string, github.Job>) {
    for (const [jobId, jobOutputs] of Object.entries(this.jobOutputs)) {
      jobmap[jobId] = {
        ...jobmap[jobId],
        outputs: {
          ...jobmap[jobId].outputs,
          ...this.renderJobOutputs(jobOutputs),
        },
      };
    }
  }

  private renderJobOutputs(outputs: github.JobStepOutput[]) {
    const renderedOutputs: Record<string, string> = {};
    for (const output of outputs) {
      renderedOutputs[output.outputName] = `\${{ steps.${output.stepId}.outputs.${output.outputName} }}`;
    }
    return renderedOutputs;
  }

  /**
   * Make an action from the given node and/or step
   */
  private jobForNode(node: AGraphNode, options: Context): Job | undefined {
    switch (node.data?.type) {
      // Nothing for these, they are groupings (shouldn't even have popped up here)
      case 'group':
      case 'stack-group':
      case undefined:
        throw new Error(`jobForNode: did not expect to get group nodes: ${node.data?.type}`);

      case 'self-update':
        throw new Error('github workflows does not support self mutation');

      case 'publish-assets':
        return this.jobForAssetPublish(node, node.data.assets, options);

      case 'prepare':
        throw new Error('"prepare" is not supported by GitHub worflows');

      case 'execute':
        return this.jobForDeploy(node, node.data.stack, node.data.captureOutputs);

      case 'step':
        if (node.data.isBuildStep) {
          return this.jobForBuildStep(node, node.data.step);
        } else if (node.data.step instanceof ShellStep) {
          return this.jobForScriptStep(node, node.data.step);
        } else {
          throw new Error(`unsupported step type: ${node.data.step.constructor.name}`);
        }
    }
  }

  private jobForAssetPublish(node: AGraphNode, assets: StackAsset[], options: Context): Job {
    const installSuffix = this.cdkCliVersion ? `@${this.cdkCliVersion}` : '';
    const cdkoutDir = options.assemblyDir;

    // create one file and make one step
    const relativeToAssembly = (p: string) => path.posix.join(cdkoutDir, path.relative(path.resolve(cdkoutDir), p));
    const fileContents: string[] = ['set -x'].concat(assets.map((asset) => {
      return `npx cdk-assets --path "${relativeToAssembly(asset.assetManifestPath)}" --verbose publish "${asset.assetSelector}"`;
    }));

    const publishStepFile = path.join(cdkoutDir, `publish-${node.uniqueId}-step.sh`);
    mkdirSync(path.dirname(publishStepFile), { recursive: true });
    writeFileSync(publishStepFile, fileContents.join('\n'), { encoding: 'utf-8' });

    const publishStep: github.JobStep = {
      name: `Publish ${node.uniqueId}`,
      run: `/bin/bash ./cdk.out/${path.relative(cdkoutDir, publishStepFile)}`,
    };

    return {
      id: node.uniqueId,
      definition: {
        name: `Publish Assets ${node.uniqueId}`,
        needs: this.renderDependencies(node),
        permissions: {
          contents: github.JobPermission.READ,
        },
        runsOn: RUNS_ON,
        steps: [
          ...this.stepsToDownloadAssembly(cdkoutDir),
          {
            name: 'Install',
            run: `npm install --no-save cdk-assets${installSuffix}`,
          },
          ...this.stepsToConfigureAws({ region: 'us-west-2' }),
          publishStep,
        ],
      },
    };
  }

  private jobForDeploy(node: AGraphNode, stack: StackDeployment, _captureOutputs: boolean): Job {
    const region = stack.region;
    const account = stack.account;
    if (!region || !account) {
      throw new Error('"account" and "region" are required');
    }

    if (!stack.templateUrl) {
      throw new Error(`unable to determine template URL for stack ${stack.stackArtifactId}`);
    }

    const resolve = (s: string): string => {
      return EnvironmentPlaceholders.replace(s, {
        accountId: account,
        region: region,
        partition: 'aws',
      });
    };

    const params: Record<string, any> = {
      'name': stack.stackName,
      'template': resolve(stack.templateUrl),
      'no-fail-on-empty-changeset': '1',
    };

    if (stack.executionRoleArn) {
      params['role-arn'] = resolve(stack.executionRoleArn);
    }
    const assumeRoleArn = stack.assumeRoleArn ? resolve(stack.assumeRoleArn) : undefined;

    return {
      id: node.uniqueId,
      definition: {
        name: `Deploy ${stack.stackArtifactId}`,
        permissions: { contents: github.JobPermission.NONE },
        needs: this.renderDependencies(node),
        runsOn: RUNS_ON,
        steps: [
          ...this.stepsToConfigureAws({ region, assumeRoleArn }),
          {
            id: 'Deploy',
            uses: 'aws-actions/aws-cloudformation-github-deploy@v1',
            with: params,
          },
        ],
      },
    };
  }

  private jobForBuildStep(node: AGraphNode, step: Step): Job {
    if (!(step instanceof ShellStep)) {
      throw new Error('synthStep must be a ScriptStep');
    }

    if (step.inputs.length > 0) {
      throw new Error('synthStep cannot have inputs');
    }

    if (step.outputs.length > 1) {
      throw new Error('synthStep must have a single output');
    }

    if (!step.primaryOutput) {
      throw new Error('synthStep requires a primaryOutput which contains cdk.out');
    }

    const cdkOut = step.outputs[0];

    const installSteps = step.installCommands.length > 0 ? [{
      name: 'Install',
      run: step.installCommands.join('\n'),
    }] : [];

    return {
      id: node.uniqueId,
      definition: {
        name: 'Synthesize',
        permissions: {
          contents: github.JobPermission.READ,
        },
        runsOn: RUNS_ON,
        needs: this.renderDependencies(node),
        env: step.env,
        container: this.buildContainer,
        steps: [
          ...this.stepsToCheckout(),
          ...this.preBuildSteps,
          ...installSteps,
          {
            name: 'Build',
            run: step.commands.join('\n'),
          },
          ...this.postBuildSteps,
          ...this.stepsToUploadAssembly(cdkOut.directory),
        ],
      },
    };
  }

  /**
   * Searches for the stack that produced the output via the current
   * job's dependencies.
   *
   * This function should always find a stack, since it is guaranteed
   * that a CfnOutput comes from a referenced stack.
   */
  private findStackOfOutput(ref: StackOutputReference, node: AGraphNode) {
    for (const dep of node.allDeps) {
      if (dep.data?.type === 'execute' && ref.isProducedBy(dep.data.stack)) {
        return dep.uniqueId;
      }
    }
    // Should never happen
    throw new Error(`The output ${ref.outputName} is not referenced by any of the dependent stacks!`);
  }

  private addJobOutput(jobId: string, output: github.JobStepOutput) {
    if (this.jobOutputs[jobId] === undefined) {
      this.jobOutputs[jobId] = [output];
    } else {
      this.jobOutputs[jobId].push(output);
    }
  }

  private jobForScriptStep(node: AGraphNode, step: ShellStep): Job {
    const envVariables: Record<string, string> = {};
    for (const [envName, ref] of Object.entries(step.envFromCfnOutputs)) {
      const jobId = this.findStackOfOutput(ref, node);
      this.addJobOutput(jobId, {
        outputName: ref.outputName,
        stepId: 'Deploy',
      });
      envVariables[envName] = `\${{ needs.${jobId}.outputs.${ref.outputName} }}`;
    }

    const downloadInputs = new Array<github.JobStep>();
    const uploadOutputs = new Array<github.JobStep>();

    for (const input of step.inputs) {
      downloadInputs.push({
        uses: 'actions/download-artifact@v2',
        with: {
          name: input.fileSet.id,
          path: input.directory,
        },
      });
    }

    for (const output of step.outputs) {
      uploadOutputs.push({
        uses: 'actions/upload-artifact@v2.1.1',
        with: {
          name: output.fileSet.id,
          path: output.directory,
        },
      });
    }

    const installSteps = step.installCommands.length > 0 ? [{
      name: 'Install',
      run: step.installCommands.join('\n'),
    }] : [];

    return {
      id: node.uniqueId,
      definition: {
        name: step.id,
        permissions: {
          contents: github.JobPermission.READ,
        },
        runsOn: RUNS_ON,
        needs: this.renderDependencies(node),
        env: {
          ...step.env,
          ...envVariables,
        },
        steps: [
          ...downloadInputs,
          ...installSteps,
          { run: step.commands.join('\n') },
          ...uploadOutputs,
        ],
      },
    };
  }

  private stepsToConfigureAws({ region, assumeRoleArn }: { region: string; assumeRoleArn?: string }): github.JobStep[] {
    const params: Record<string, any> = {
      'aws-access-key-id': `\${{ secrets.${this.awsCredentials.accessKeyId} }}`,
      'aws-secret-access-key': `\${{ secrets.${this.awsCredentials.secretAccessKey} }}`,
      'aws-region': region,
      'role-skip-session-tagging': true,
      'role-duration-seconds': 30 * 60,
    };

    if (this.awsCredentials.sessionToken) {
      params['aws-session-token'] = `\${{ secrets.${this.awsCredentials.sessionToken} }}`;
    }

    if (assumeRoleArn) {
      params['role-to-assume'] = assumeRoleArn;
      params['role-external-id'] = 'Pipeline';
    }

    return [
      {
        uses: 'aws-actions/configure-aws-credentials@v1',
        with: params,
      },
    ];
  }

  private stepsToConfigureDocker() {
    const params: Record<string, any> = {
      'username': `\${{ secrets.${this.dockerHubCredentials.username} }}`,
      'password': `\${{ secrets.${this.dockerHubCredentials.personalAccessToken} }}`,
    };

    return [
      {
        uses: 'docker/login-action@v1',
        with: params,
      },
    ];
  }

  private stepsToConfigureEcr() {
    const params: Record<string, any> = {
      'username': `\${{ secrets.${this.awsCredentials.accessKeyId} }}`,
      'password': `\${{ secrets.${this.awsCredentials.secretAccessKey} }}`,
    };

    return [
      {
        uses: 'docker/login-action@v1',
        with: params,
      },
    ];
  }

  private stepsToDownloadAssembly(targetDir: string): github.JobStep[] {
    if (this.preSynthed) {
      return this.stepsToCheckout();
    }

    return [{
      name: `Download ${CDKOUT_ARTIFACT}`,
      uses: 'actions/download-artifact@v2',
      with: {
        name: CDKOUT_ARTIFACT,
        path: targetDir,
      },
    }];
  }

  private stepsToCheckout(): github.JobStep[] {
    return [{
      name: 'Checkout',
      uses: 'actions/checkout@v2',
    }];
  }

  private stepsToUploadAssembly(dir: string): github.JobStep[] {
    if (this.preSynthed) {
      return [];
    }

    return [{
      name: `Upload ${CDKOUT_ARTIFACT}`,
      uses: 'actions/upload-artifact@v2.1.1',
      with: {
        name: CDKOUT_ARTIFACT,
        path: dir,
      },
    }];
  }

  private renderDependencies(node: AGraphNode) {
    const deps = new Array<AGraphNode>();

    for (const d of node.allDeps) {
      if (d instanceof Graph) {
        deps.push(...d.allLeaves().nodes);
      } else {
        deps.push(d);
      }
    }

    return deps.map(x => x.uniqueId);
  }
}

interface Context {
  /**
   * The pipeline graph.
   */
  readonly structure: PipelineGraph;

  /**
   * Name of cloud assembly directory.
   */
  readonly assemblyDir: string;
}

interface Job {
  readonly id: string;
  readonly definition: github.Job;
}

function snakeCaseKeys<T = unknown>(obj: T, sep = '-'): T {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(o => snakeCaseKeys(o, sep)) as any;
  }

  const result: Record<string, unknown> = {};
  for (let [k, v] of Object.entries(obj)) {
    // we don't want to snake case environment variables
    if (k !== 'env' && typeof v === 'object' && v != null) {
      v = snakeCaseKeys(v);
    }
    result[decamelize(k, { separator: sep })] = v;
  }
  return result as any;
}

/**
 * Names of secrets for AWS credentials.
 */
export interface AwsCredentialsSecrets {
  /**
   * @default "AWS_ACCESS_KEY_ID"
   */
  readonly accessKeyId?: string;

  /**
   * @default "AWS_SECRET_ACCESS_KEY"
   */
  readonly secretAccessKey?: string;

  /**
   * @default - no session token is used
   */
  readonly sessionToken?: string;
}

export interface DockerHubCredentialsSecrets {
  /**
   * @default "DOCKERHUB_USERNAME"
   */
  readonly username?: string;

  /**
   * @default "DOCKERHUB_TOKEN"
   */
  readonly personalAccessToken?: string;
}

export function* flatten<A>(xs: Iterable<A[]>): IterableIterator<A> {
  for (const x of xs) {
    for (const y of x) {
      yield y;
    }
  }
}
