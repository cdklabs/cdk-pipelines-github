import { readFileSync } from 'fs';
import { join } from 'path';
import { Stack, Stage } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow } from '../src';
import { GitHubExampleApp } from './example-app';
import { withTemporaryDirectory, TestApp } from './testutil';

const fixtures = join(__dirname, 'fixtures');

let app: TestApp;
beforeEach(() => {
  const tempOutDir = 'github.out';
  app = new TestApp({
    outdir: tempOutDir,
  });
});

afterEach(() => {
  app.cleanup();
});

test('pipeline with only a synth step', () => {
  withTemporaryDirectory((dir) => {
    const github = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
    });

    app.synth();

    expect(readFileSync(github.workflowPath, 'utf-8')).toMatchSnapshot();
  });
});

test('single wave/stage/stack', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        commands: [],
      }),
    });

    const stage = new Stage(app, 'MyStack', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    const stack = new Stack(stage, 'MyStack');

    new lambda.Function(stack, 'Function', {
      code: lambda.Code.fromAsset(fixtures),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });

    pipeline.addStage(stage);

    app.synth();

    expect(readFileSync(pipeline.workflowPath, 'utf-8')).toMatchSnapshot();
  });
});

test('pipeline with oidc authentication', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      awsOidcRoleArn: 'arn:aws:iam::000000000000:role/GithubActionRole',
    });

    const stage = new Stage(app, 'MyStack', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    const stack = new Stack(stage, 'MyStack');

    new lambda.Function(stack, 'Function', {
      code: lambda.Code.fromAsset(fixtures),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });

    pipeline.addStage(stage);

    app.synth();

    expect(readFileSync(pipeline.workflowPath, 'utf-8')).toMatchSnapshot();
  });
});

test('example app', () => {
  withTemporaryDirectory((dir) => {
    const repoDir = dir;
    const githubApp = new GitHubExampleApp({
      repoDir: repoDir,
      envA: 'aws://111111111111/us-east-1',
      envB: 'aws://222222222222/eu-west-2',
    });
    githubApp.synth();
    expect(readFileSync(join(repoDir, '.github/workflows/deploy.yml'), 'utf-8')).toMatchSnapshot();
  });
});

describe('workflow path', () => {
  test('invalid workflow path fails', () => {
    expect(() => {
      new GitHubWorkflow(app, 'Pipeline', {
        workflowPath: 'deploy.yml',
        synth: new ShellStep('Build', {
          commands: [],
        }),
      });
    }).toThrowError("workflow files must be stored in the '.github/workflows' directory of your repository");
  });

  test('workflow path must be a yaml file', () => {
    expect(() => {
      new GitHubWorkflow(app, 'Pipeline', {
        workflowPath: '.github/workflows/deploy.json',
        synth: new ShellStep('Build', {
          commands: [],
        }),
      });
    }).toThrowError('workflow file is expected to be a yaml file');
  });
});
