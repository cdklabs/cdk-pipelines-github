import { readFileSync } from 'fs';
import { join } from 'path';
import { Stack, Stage } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubExampleApp } from './example-app';
import { withTemporaryDirectory, TestApp } from './testutil';
import { GitHubWorkflow, JsonPatch, Runner, AwsCredentials } from '../src';

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

test('pipeline with aws credentials', () => {
  withTemporaryDirectory((dir) => {
    const github = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      awsCredentials: {
        accessKeyId: 'MY_ACCESS_KEY_ID',
        secretAccessKey: 'MY_SECRET_ACCESS_KEY',
        sessionToken: 'MY_SESSION_TOKEN',
      },
    });

    const stage = new Stage(app, 'MyStack', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    new Stack(stage, 'MyStack');

    github.addStage(stage);

    app.synth();

    const file = readFileSync(github.workflowPath, 'utf-8');
    expect(file).toContain('aws-access-key-id: \${{ secrets.MY_ACCESS_KEY_ID }}\n');
    expect(file).toContain('aws-secret-access-key: \${{ secrets.MY_SECRET_ACCESS_KEY }}\n');
    expect(file).toContain('aws-session-token: \${{ secrets.MY_SESSION_TOKEN }}\n');
  });
});

test('pipeline with aws credentials using awsCreds', () => {
  withTemporaryDirectory((dir) => {
    const github = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      awsCreds: AwsCredentials.fromGitHubSecrets(),
    });

    const stage = new Stage(app, 'MyStack', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    new Stack(stage, 'MyStack');

    github.addStage(stage);

    app.synth();

    const file = readFileSync(github.workflowPath, 'utf-8');
    expect(file).toContain('aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}\n');
    expect(file).toContain('aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}\n');
  });
});

test('pipeline with aws credentials using OIDC and role-session-name', () => {
  withTemporaryDirectory((dir) => {
    const github = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      awsCreds: AwsCredentials.fromOpenIdConnect({
        roleSessionName: 'my-github-actions-session',
        gitHubActionRoleArn:
          'arn:aws:iam::111111111111:role/my-github-actions-role',
      }),
    });

    const stage = new Stage(app, 'MyStack', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    new Stack(stage, 'MyStack');

    github.addStage(stage);

    app.synth();

    const file = readFileSync(github.workflowPath, 'utf-8');
    expect(file).toContain('role-session-name: my-github-actions-session\n');
    expect(file).toContain('role-to-assume: arn:aws:iam::111111111111:role/my-github-actions-role\n');
  });
});

test('pipeline with aws credentials in custom secrets', () => {
  withTemporaryDirectory((dir) => {
    const github = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      awsCreds: AwsCredentials.fromGitHubSecrets({
        accessKeyId: 'MY_ACCESS_KEY_ID',
        secretAccessKey: 'MY_SECRET_ACCESS_KEY',
        sessionToken: 'MY_SESSION_TOKEN',
      }),
    });

    const stage = new Stage(app, 'MyStack', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    new Stack(stage, 'MyStack');

    github.addStage(stage);

    app.synth();

    const file = readFileSync(github.workflowPath, 'utf-8');
    expect(file).toContain('aws-access-key-id: \${{ secrets.MY_ACCESS_KEY_ID }}\n');
    expect(file).toContain('aws-secret-access-key: \${{ secrets.MY_SECRET_ACCESS_KEY }}\n');
    expect(file).toContain('aws-session-token: \${{ secrets.MY_SESSION_TOKEN }}\n');
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
      publishAssetsAuthRegion: 'ap-southeast-2',
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

test('pipeline publish asset scripts are in stage assembly directory', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        commands: [],
      }),
      publishAssetsAuthRegion: 'ap-southeast-2',
    });

    const stage = new Stage(app, 'MyStage', {
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

    const file = readFileSync(pipeline.workflowPath, 'utf-8');
    expect(file).toContain('./cdk.out/assembly-MyStage/publish-Assets');
    expect(file).toMatchSnapshot();
  });
});

test('pipeline with job settings', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        commands: [],
      }),
      jobSettings: {
        if: 'github.repository == \'account/repo\'',
      },
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

  test('synth succeeds with no diff and escape hatches', () => {
    withTemporaryDirectory((dir) => {
      const repoDir = dir;
      const githubApp = new GitHubExampleApp({
        repoDir: repoDir,
        envA: 'aws://111111111111/us-east-1',
        envB: 'aws://222222222222/eu-west-2',
      });

      githubApp.workflowFile.patch(JsonPatch.replace('/jobs/Build-Build/runs-on', 'macos-latest'));

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

  test('turn off diff protection using string', () => {
    // set GITHUB_WORKFLOW env variable to simulate GitHub environment
    wrapEnv('GITHUB_WORKFLOW', 'deploy', () => withTemporaryDirectory((dir) => {
      app.node.setContext('cdk-pipelines-github:diffProtection', 'false');
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

test('can escape hatch into workflow file', () => {
  withTemporaryDirectory((dir) => {
    const github = new GitHubWorkflow(app, 'Pipeline', {
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

    github.addStage(stage);

    // escape hatch
    github.workflowFile.patch(
      JsonPatch.add('/on/workflow_call', {}),
      JsonPatch.remove('/on/workflow_dispatch'),
      JsonPatch.replace('/jobs/Build-Build/runs-on', 'macos-latest'),
    );

    app.synth();

    const file = readFileSync(github.workflowPath, 'utf-8');
    expect(file).toContain('workflow_call: {}\n');
    expect(file).not.toContain('workflow_dispatch: {}\n');
    expect(file).toContain('runs-on: macos-latest\n');
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
