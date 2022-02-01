import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { App, CfnOutput, RemovalPolicy, Stack, Stage, StageProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { EnvironmentUtils } from 'aws-cdk-lib/cx-api';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow } from '../src';

export interface GitHubExampleAppProps {
  /**
   * The root directory of the repository.
   *
   * A `cdk.out` directory and `.github/workflows/deploy.yml` file will be
   * synthesied into this directory.
   */
  readonly repoDir: string;

  /**
   * AWS Environment for stage A.
   *
   * Environment must be bootstrapped with `CDK_NEW_BOOTSTRAP=1`.
   *
   * @example aws://111111111111/us-east-1
   */
  readonly envA: string;

  /**
   * AWS environment for stage B.
   *
   * Environment must be bootstrapped with `CDK_NEW_BOOTSTRAP=1`.
   *
   * @example aws://111111111111/us-east-2
   */
  readonly envB: string;
}

/**
 * A CDK app that uses GitHub engine backend for CDK Pipelines.
 *
 * Specify the account
 *
 * You will need to bootstrap (with `CDK_NEW_BOOTSTRAP=1`) two environments
 */
export class GitHubExampleApp extends App {
  constructor(props: GitHubExampleAppProps) {
    const repoDir = props.repoDir ?? fs.mkdtempSync(path.join(os.tmpdir(), 'github-engine.'));

    super({
      outdir: path.join(repoDir, 'cdk.out'),
      context: {
        '@aws-cdk/core:newStyleStackSynthesis': '1',
      },
      stackTraces: false,
      autoSynth: false,
      treeMetadata: false,
    });

    const workflowsDir = path.join(repoDir, '.github/workflows');
    fs.mkdirSync(workflowsDir, { recursive: true });

    const pipeline = new GitHubWorkflow(this, 'Pipeline', {
      synth: new ShellStep('Build', {
        commands: ['echo "nothing to do (cdk.out is committed)"'],
      }),
      workflowPath: path.join(workflowsDir, 'deploy.yml'),
      preSynthed: true,
      buildContainer: { image: 'alpine' },
      preBuildSteps: [
        {
          uses: 'actions/setup-node@v2',
          with: { nodeVersion: '14' },
        },
      ],
      postBuildSteps: [
        { run: 'echo post-build' },
      ],
      awsOidcRoleArn: 'arn:aws:iam::489318732371:role/GithubActionRole',
    });

    const myStage = new MyStage(this, 'StageA', { env: EnvironmentUtils.parse(props.envA) });
    pipeline.addStage(myStage, {
      pre: [new ShellStep('Pre', {
        commands: ['echo hello'],
      })],
      post: [new ShellStep('Post', {
        envFromCfnOutputs: {
          FN_NAME: myStage.fnName,
        },
        commands: ['echo FN_NAME equals: $FN_NAME'],
      })],
    });

    pipeline.addStage(new MyStage(this, 'StageB', { env: EnvironmentUtils.parse(props.envB) }));
  }
}

class MyStage extends Stage {
  public readonly fnName: CfnOutput;
  constructor(scope: App, id: string, props: StageProps) {
    super(scope, id, props);

    const fnStack = new Stack(this, 'FunctionStack');
    const bucketStack = new Stack(this, 'BucketStack');

    const bucket = new s3.Bucket(bucketStack, 'Bucket', {
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const fn = new lambda.Function(fnStack, 'Function', {
      code: lambda.Code.fromAsset(path.join(__dirname, 'fixtures')),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: {
        BUCKET_NAME: bucket.bucketName, // <-- cross stack reference
      },
    });

    this.fnName = new CfnOutput(fnStack, 'myout', {
      value: fn.functionName,
    });

    bucket.grantRead(fn);
  }
}
