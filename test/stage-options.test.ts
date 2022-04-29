import { readFileSync } from 'fs';
import { Stack, Stage } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow, StackCapabilities } from '../src';
import { withTemporaryDirectory, TestApp } from './testutil';

let app: TestApp;
beforeEach(() => {
  const tempOutDir = 'stage.out';
  app = new TestApp({
    outdir: tempOutDir,
  });
});

afterEach(() => {
  app.cleanup();
});

describe('github environment', () => {
  test('can specify one github environment at the stage level', () => {
    withTemporaryDirectory((dir) => {
      const pipeline = new GitHubWorkflow(app, 'Pipeline', {
        workflowPath: `${dir}/.github/workflows/deploy.yml`,
        synth: new ShellStep('Build', {
          installCommands: ['yarn'],
          commands: ['yarn build'],
        }),
      });

      const stage = new Stage(app, 'MyStack', {
        env: { account: '111111111111', region: 'us-east-1' },
      });

      new Stack(stage, 'MyStack');

      pipeline.addStageWithGitHubOptions(stage, {
        gitHubEnvironment: 'test',
      });

      app.synth();

      expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain('environment: test\n');
    });
  });

  test('can specify multiple github environments', () => {
    withTemporaryDirectory((dir) => {
      const pipeline = new GitHubWorkflow(app, 'Pipeline', {
        workflowPath: `${dir}/.github/workflows/deploy.yml`,
        synth: new ShellStep('Build', {
          installCommands: ['yarn'],
          commands: ['yarn build'],
        }),
      });

      // Two stages
      const testStage = new Stage(app, 'MyStage1', {
        env: { account: '111111111111', region: 'us-east-1' },
      });
      const prodStage = new Stage(app, 'MyStage2', {
        env: { account: '222222222222', region: 'us-west-2' },
      });

      // Two stacks
      new Stack(testStage, 'MyStack');
      new Stack(prodStage, 'MyStack');

      pipeline.addStageWithGitHubOptions(testStage, {
        gitHubEnvironment: 'test',
      });
      pipeline.addStageWithGitHubOptions(prodStage, {
        gitHubEnvironment: 'prod',
      });

      app.synth();

      expect(readFileSync(pipeline.workflowPath, 'utf-8')).toMatchSnapshot();
    });
  });
});

describe('cloudformation stack capabilities', () => {
  test('can specify stack capabilities', () => {
    withTemporaryDirectory((dir) => {
      const pipeline = new GitHubWorkflow(app, 'Pipeline', {
        workflowPath: `${dir}/.github/workflows/deploy.yml`,
        synth: new ShellStep('Build', {
          installCommands: ['yarn'],
          commands: ['yarn build'],
        }),
      });

      const stage = new Stage(app, 'MyStack', {
        env: { account: '111111111111', region: 'us-east-1' },
      });

      new Stack(stage, 'MyStack');

      pipeline.addStageWithGitHubOptions(stage, {
        stackCapabilities: [StackCapabilities.NAMED_IAM],
      });

      app.synth();

      expect(readFileSync(pipeline.workflowPath, 'utf-8')).toMatchSnapshot();
    });
  });

  test('can specify multiple capabilities', () => {
    withTemporaryDirectory((dir) => {
      const pipeline = new GitHubWorkflow(app, 'Pipeline', {
        workflowPath: `${dir}/.github/workflows/deploy.yml`,
        synth: new ShellStep('Build', {
          installCommands: ['yarn'],
          commands: ['yarn build'],
        }),
      });

      const stage = new Stage(app, 'MyStack', {
        env: { account: '111111111111', region: 'us-east-1' },
      });

      new Stack(stage, 'MyStack');

      pipeline.addStageWithGitHubOptions(stage, {
        stackCapabilities: [
          StackCapabilities.NAMED_IAM,
          StackCapabilities.IAM,
          StackCapabilities.AUTO_EXPAND,
        ],
      });

      app.synth();

      expect(readFileSync(pipeline.workflowPath, 'utf-8')).toMatchSnapshot();
    });
  });
});