import { readFileSync } from 'fs';
import { Stack, Stage } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow, StackCapabilities, GitHubActionStep } from '../src';
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

describe('job settings', () => {
  test('can specify job settings at stage level', () => {
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
        jobSettings: {
          if: 'github.repository == \'github/repo\'',
        },
      });

      app.synth();

      expect(readFileSync(pipeline.workflowPath, 'utf-8')).toMatchSnapshot();
    });
  });

  test('stage-level job settings override app-level settings', () => {
    withTemporaryDirectory((dir) => {
      const pipeline = new GitHubWorkflow(app, 'Pipeline', {
        workflowPath: `${dir}/.github/workflows/deploy.yml`,
        synth: new ShellStep('Build', {
          installCommands: ['yarn'],
          commands: ['yarn build'],
        }),
        jobSettings: {
          if: 'github.repository == \'another/repoA\'',
        },
      });

      const stage = new Stage(app, 'MyStack', {
        env: { account: '111111111111', region: 'us-east-1' },
      });

      new Stack(stage, 'MyStack');

      pipeline.addStageWithGitHubOptions(stage, {
        jobSettings: {
          if: 'github.repository == \'github/repoB\'',
        },
      });

      app.synth();

      expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain('if: github.repository == \'another/repoA\'\n');
      expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain('if: github.repository == \'github/repoB\'\n');
    });
  });
});

test('can set pre/post github action job step', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Synth', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      jobSettings: { if: 'contains(fromJson(\'["push", "pull_request"]\'), github.event_name)' },
    });

    const stage = new Stage(app, 'MyStack', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    new Stack(stage, 'MyStack');

    pipeline.addStageWithGitHubOptions(stage, {
      jobSettings: { if: "success() && contains(github.event.issue.labels.*.name, 'deploy')" },

      pre: [new GitHubActionStep('PreDeployAction', {
        jobSteps: [
          {
            name: 'pre deploy action',
            uses: 'my-pre-deploy-action@1.0.0',
            with: {
              'app-id': 1234,
              'secrets': 'my-secrets',
            },
          },
        ],
      })],

      post: [new GitHubActionStep('PostDeployAction', {
        jobSteps: [
          {
            name: 'Checkout',
            uses: 'actions/checkout@v2',
          },
          {
            name: 'post deploy action',
            uses: 'my-post-deploy-action@1.0.0',
            with: {
              'app-id': 4321,
              'secrets': 'secrets',
            },
          },
        ],
        if: "failure() && contains(github.event.issue.labels.*.name, 'cleanupFailure')",
      })],
    });

    app.synth();

    expect(readFileSync(pipeline.workflowPath, 'utf-8')).toMatchSnapshot();
    expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain('my-pre-deploy-action\@1\.0\.0');
    expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain('my-post-deploy-action\@1\.0\.0');
    expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain('actions/checkout@v2');
    expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain('contains(fromJson(\'["push", "pull_request"]\'), github.event_name)');
    expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain("success() && contains(github.event.issue.labels.*.name, 'deploy')");
    expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain("failure() && contains(github.event.issue.labels.*.name, 'cleanupFailure')");
  });
});
