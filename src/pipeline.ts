import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import * as path from 'path';
import { Stage } from 'aws-cdk-lib';
import { EnvironmentPlaceholders } from 'aws-cdk-lib/cx-api';
import { PipelineBase, PipelineBaseProps, ShellStep, StackAsset, StackDeployment, StackOutputReference, Step } from 'aws-cdk-lib/pipelines';
import { AGraphNode, PipelineGraph, Graph, isGraph } from 'aws-cdk-lib/pipelines/lib/helpers-internal';
import { Construct } from 'constructs';
import * as decamelize from 'decamelize';
import * as YAML from 'yaml';
import { DockerCredential } from './docker-credentials';
import { awsCredentialStep } from './private/aws-credentials';
import * as github from './workflows-model';

const CDKOUT_ARTIFACT = 'cdk.out';
const ASSET_HASH_NAME = 'asset-hash';

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
  readonly workflowTriggers?: github.WorkflowTriggers;

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
   * A role that utilizes the GitHub OIDC Identity Provider in your AWS account.
   * If supplied, this will be used instead of `awsCredentials`.
   *
   * You can create your own role in the console with the necessary trust policy
   * to allow gitHub actions from your gitHub repository to assume the role, or
   * you can utilize the `GitHubActionRole` construct to create a role for you.
   *
   * @default - GitHub repository secrets are used instead of OpenId Connect role.
   */
  readonly gitHubActionRoleArn?: string;

  /**
   * Build container options.
   *
   * @default - GitHub defaults
   */
  readonly buildContainer?: github.ContainerOptions;

  /**
   * GitHub workflow steps to execute before build.
   *
   * @default []
   */
  readonly preBuildSteps?: github.JobStep[];

  /**
   * GitHub workflow steps to execute after build.
   *
   * @default []
   */
  readonly postBuildSteps?: github.JobStep[];

  /**
   * The Docker Credentials to use to login. If you set this variable,
   * you will be logged in to docker when you upload Docker Assets.
   */
  readonly dockerCredentials?: DockerCredential[];

  /**
   * The type of runner to run the job on. The runner can be either a
   * GitHub-hosted runner or a self-hosted runner.
   * @default Runner.UBUNTU_LATEST
   */
  readonly runner?: github.Runner;

  /**
   * Optional override for the region used in Publish Assets job
   * @default "us-west-2"
   */
  readonly publishAssetsRegion?: string;
}

/**
 * CDK Pipelines for GitHub workflows.
 */
export class GitHubWorkflow extends PipelineBase {
  public readonly workflowPath: string;
  public readonly workflowName: string;

  private readonly workflowTriggers: github.WorkflowTriggers;
  private readonly preSynthed: boolean;
  private readonly awsCredentials: AwsCredentialsSecrets;
  private readonly gitHubActionRoleArn?: string;
  private readonly useGitHubActionRole: boolean;
  private readonly dockerCredentials: DockerCredential[];
  private readonly cdkCliVersion?: string;
  private readonly buildContainer?: github.ContainerOptions;
  private readonly preBuildSteps: github.JobStep[];
  private readonly postBuildSteps: github.JobStep[];
  private readonly jobOutputs: Record<string, github.JobStepOutput[]> = {};
  private readonly assetHashMap: Record<string, string> = {};
  private readonly runner: github.Runner;
  private readonly publishAssetsRegion: string;

  constructor(scope: Construct, id: string, props: GitHubWorkflowProps) {
    super(scope, id, props);

    this.cdkCliVersion = props.cdkCliVersion;
    this.preSynthed = props.preSynthed ?? false;
    this.buildContainer = props.buildContainer;
    this.preBuildSteps = props.preBuildSteps ?? [];
    this.postBuildSteps = props.postBuildSteps ?? [];
    this.gitHubActionRoleArn = props.gitHubActionRoleArn;
    this.useGitHubActionRole = this.gitHubActionRoleArn ? true : false;

    this.awsCredentials = props.awsCredentials ?? {
      accessKeyId: 'AWS_ACCESS_KEY_ID',
      secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
    };

    this.dockerCredentials = props.dockerCredentials ?? [];

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

    this.runner = props.runner ?? github.Runner.UBUNTU_LATEST;
    this.publishAssetsRegion = props.publishAssetsRegion ?? 'us-west-2';
  }

  protected doBuildPipeline() {
    const app = Stage.of(this);
    if (!app) {
      throw new Error('The GitHub Workflow must be defined in the scope of an App');
    }
    const cdkoutDir = app.outdir;

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

    // create directory if it does not exist
    mkdirSync(path.dirname(this.workflowPath), { recursive: true });

    // GITHUB_WORKFLOW is set when GitHub Actions is running the workflow.
    // see: https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
    const diffProtection = this.node.tryGetContext('cdk-pipelines-github:diffProtection') ?? true;
    if (diffProtection && process.env.GITHUB_WORKFLOW === this.workflowName) {
      // check if workflow file has changed
      if (!existsSync(this.workflowPath) || yaml !== readFileSync(this.workflowPath, 'utf8')) {
        throw new Error(`Please commit the updated workflow file ${path.relative(__dirname, this.workflowPath)} when you change your pipeline definition.`);
      }
    }

    // eslint-disable-next-line no-console
    console.log(`writing ${this.workflowPath}`);
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
        throw new Error('GitHub Workflows does not support self mutation');

      case 'publish-assets':
        return this.jobForAssetPublish(node, node.data.assets, options);

      case 'prepare':
        throw new Error('"prepare" is not supported by GitHub Worflows');

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
    if (assets.length === 0) {
      throw new Error('Asset Publish step must have at least 1 asset');
    }

    const installSuffix = this.cdkCliVersion ? `@${this.cdkCliVersion}` : '';
    const cdkoutDir = options.assemblyDir;
    const jobId = node.uniqueId;
    const assetId = assets[0].assetId;

    // check if asset is docker asset and if we have docker credentials
    const dockerLoginSteps: github.JobStep[] = [];
    if (node.uniqueId.includes('DockerAsset') && this.dockerCredentials.length > 0) {
      for (const creds of this.dockerCredentials) {
        dockerLoginSteps.push(...this.stepsToConfigureDocker(creds));
      }
    }

    // create one file and make one step
    const relativeToAssembly = (p: string) => path.posix.join(cdkoutDir, path.relative(path.resolve(cdkoutDir), p));
    const fileContents: string[] = ['set -x'].concat(assets.map((asset) => {
      return `npx cdk-assets --path "${relativeToAssembly(asset.assetManifestPath)}" --verbose publish "${asset.assetSelector}"`;
    }));

    // we need the jobId to reference the outputs later
    this.assetHashMap[assetId] = jobId;
    fileContents.push(`echo '::set-output name=${ASSET_HASH_NAME}::${assetId}'`);

    const publishStepFile = path.join(cdkoutDir, `publish-${jobId}-step.sh`);
    mkdirSync(path.dirname(publishStepFile), { recursive: true });
    writeFileSync(publishStepFile, fileContents.join('\n'), { encoding: 'utf-8' });

    const publishStep: github.JobStep = {
      id: 'Publish',
      name: `Publish ${jobId}`,
      run: `/bin/bash ./cdk.out/${path.relative(cdkoutDir, publishStepFile)}`,
    };

    return {
      id: jobId,
      definition: {
        name: `Publish Assets ${jobId}`,
        needs: this.renderDependencies(node),
        permissions: {
          contents: github.JobPermission.READ,
          idToken: this.useGitHubActionRole ? github.JobPermission.WRITE : github.JobPermission.NONE,
        },
        runsOn: this.runner.runsOn,
        outputs: {
          [ASSET_HASH_NAME]: `\${{ steps.Publish.outputs.${ASSET_HASH_NAME} }}`,
        },
        steps: [
          ...this.stepsToDownloadAssembly(cdkoutDir),
          {
            name: 'Install',
            run: `npm install --no-save cdk-assets${installSuffix}`,
          },
          ...this.stepsToConfigureAws(this.useGitHubActionRole, { region: this.publishAssetsRegion }),
          ...dockerLoginSteps,
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

    const replaceAssetHash = (template: string) => {
      const hash = path.parse(template.split('/').pop() ?? '').name;
      if (this.assetHashMap[hash] === undefined) {
        throw new Error(`Template asset hash ${hash} not found.`);
      }
      return template.replace(hash, `\${{ needs.${this.assetHashMap[hash]}.outputs.${ASSET_HASH_NAME} }}`);
    };

    const params: Record<string, any> = {
      'name': stack.stackName,
      'template': replaceAssetHash(resolve(stack.templateUrl)),
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
        permissions: {
          contents: github.JobPermission.READ,
          idToken: this.useGitHubActionRole ? github.JobPermission.WRITE : github.JobPermission.NONE,
        },
        needs: this.renderDependencies(node),
        runsOn: this.runner.runsOn,
        steps: [
          ...this.stepsToConfigureAws(this.useGitHubActionRole, { region, assumeRoleArn }),
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
        runsOn: this.runner.runsOn,
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
        runsOn: this.runner.runsOn,
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

  private stepsToConfigureAws(openId: boolean, { region, assumeRoleArn }: { region: string; assumeRoleArn?: string }): github.JobStep[] {
    function getDeployRole(arn: string) {
      return arn.replace('cfn-exec', 'deploy');
    }

    let steps: github.JobStep[] = [];

    if (openId) {
      steps.push(awsCredentialStep('Authenticate Via OIDC Role', {
        region,
        gitHubActionRoleArn: this.gitHubActionRoleArn,
      }));

      if (assumeRoleArn) {
        // Result of initial credentials with GitHub Action role are these environment variables
        steps.push(awsCredentialStep('Assume CDK Deploy Role', {
          region,
          accessKeyId: '${{ env.AWS_ACCESS_KEY_ID }}',
          secretAccessKey: '${{ env.AWS_SECRET_ACCESS_KEY }}',
          sessionToken: '${{ env.AWS_SESSION_TOKEN }}',
          roleToAssume: getDeployRole(assumeRoleArn),
        }));
      }
    } else {
      steps.push(awsCredentialStep('Authenticate Via GitHub Secrets', {
        region,
        accessKeyId: `\${{ secrets.${this.awsCredentials.accessKeyId} }}`,
        secretAccessKey: `\${{ secrets.${this.awsCredentials.secretAccessKey} }}`,
        sessionToken: `\${{ secrets.${this.awsCredentials.sessionToken} }}`,
        roleToAssume: assumeRoleArn,
      }));
    }

    return steps;
  }

  private stepsToConfigureDocker(dockerCredential: DockerCredential): github.JobStep[] {
    let params: Record<string, any>;

    if (dockerCredential.name === 'docker') {
      params = {
        username: `\${{ secrets.${dockerCredential.usernameKey} }}`,
        password: `\${{ secrets.${dockerCredential.passwordKey} }}`,
      };
    } else if (dockerCredential.name === 'ecr') {
      params = {
        registry: dockerCredential.registry,
      };
    } else {
      params = {
        registry: dockerCredential.registry,
        username: `\${{ secrets.${dockerCredential.usernameKey} }}`,
        password: `\${{ secrets.${dockerCredential.passwordKey} }}`,
      };
    }

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

export function* flatten<A>(xs: Iterable<A[]>): IterableIterator<A> {
  for (const x of xs) {
    for (const y of x) {
      yield y;
    }
  }
}
