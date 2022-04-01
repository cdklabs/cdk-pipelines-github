import { readFileSync } from 'fs';
import { join } from 'path';
import { Stack, Stage } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow, Runner } from '../src';
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

test('pipeline with GitHub hosted runner override', () => {
  withTemporaryDirectory((dir) => {
    const github = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      runner: Runner.WINDOWS_LATEST,
    });

    app.synth();

    expect(readFileSync(github.workflowPath, 'utf-8')).toMatchSnapshot();
  });
});

test('pipeline with self-hosted runner override', () => {
  withTemporaryDirectory((dir) => {
    const github = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      runner: Runner.selfHosted(['label1', 'label2']),
    });

    app.synth();

    expect(readFileSync(github.workflowPath, 'utf-8')).toMatchSnapshot();
  });
});

test('pipeline with publish asset region override', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        commands: [],
      }),
      publishAssetsRegion: 'ap-southeast-2',
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
      gitHubActionRoleArn: 'arn:aws:iam::000000000000:role/GitHubActionRole',
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

describe('diff protection when GITHUB_WORKFLOW set', () => {
  test('synth fails with diff', () => {
    // set GITHUB_WORKFLOW env variable to simulate GitHub environment
    wrapEnv('GITHUB_WORKFLOW', 'deploy', () => withTemporaryDirectory((dir) => {
      const repoDir = dir;
      const githubApp = new GitHubExampleApp({
        repoDir: repoDir,
        envA: 'aws://111111111111/us-east-1',
        envB: 'aws://222222222222/eu-west-2',
      });
      expect(() => githubApp.synth()).toThrowError(/Please commit the updated workflow file/);
    }));
  });

  test('synth succeeds with no diff', () => {
    withTemporaryDirectory((dir) => {
      const repoDir = dir;
      const githubApp = new GitHubExampleApp({
        repoDir: repoDir,
        envA: 'aws://111111111111/us-east-1',
        envB: 'aws://222222222222/eu-west-2',
      });

      // synth to write the deploy.yml the first time
      githubApp.synth();

      // simulate GitHub environment with the same deploy.yml
      wrapEnv('GITHUB_WORKFLOW', 'deploy', () => githubApp.synth());
    });
  });

  test('turn off diff protection', () => {
    // set GITHUB_WORKFLOW env variable to simulate GitHub environment
    wrapEnv('GITHUB_WORKFLOW', 'deploy', () => withTemporaryDirectory((dir) => {
      app.node.setContext('cdk-pipelines-github:diffProtection', false);
      new GitHubWorkflow(app, 'Pipeline', {
        workflowPath: `${dir}/.github/workflows/deploy.yml`,
        synth: new ShellStep('Build', {
          installCommands: ['yarn'],
          commands: ['yarn build'],
        }),
      });
      expect(() => app.synth()).not.toThrowError();
    }));
  });
});

function wrapEnv(variable: string, value: string, cb: () => void) {
  const original = process.env[variable];
  try {
    process.env[variable] = value;
    cb();
  } finally {
    process.env[variable] = original;
  }
}