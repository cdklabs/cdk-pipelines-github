import { readFileSync } from 'fs';
import { Stack, Stage } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import * as YAML from 'yaml';
import { withTemporaryDirectory, TestApp } from './testutil';
import {
  GitHubWorkflow,
  StackCapabilities,
  GitHubActionStep,
  AddGitHubStageOptions,
  GitHubStage,
  GitHubStageProps,
} from '../src';

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

      expect(readFileSync(pipeline.workflowPath, 'utf-8')).toContain(
        'environment: test\n',
      );
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
      const prodStage = new GitHubStage(app, 'MyStage2', {
        env: { account: '222222222222', region: 'us-west-2' },
        gitHubEnvironment: 'prod',
      });

      // Two stacks
      new Stack(testStage, 'MyStack');
      new Stack(prodStage, 'MyStack');

      pipeline.addStageWithGitHubOptions(testStage, {
        gitHubEnvironment: 'test',
      });
      pipeline.addStage(prodStage);

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
          if: "github.repository == 'github/repo'",
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
          if: "github.repository == 'another/repoA'",
        },
      });

      const stage = new Stage(app, 'MyStack', {
        env: { account: '111111111111', region: 'us-east-1' },
      });

      new Stack(stage, 'MyStack');

      pipeline.addStageWithGitHubOptions(stage, {
        jobSettings: {
          if: "github.repository == 'github/repoB'",
        },
      });

      app.synth();

      const workflowFileContents = readFileSync(pipeline.workflowPath, 'utf-8');
      expect(workflowFileContents).toContain(
        "if: github.repository == 'another/repoA'\n",
      );
      expect(workflowFileContents).toContain(
        "if: github.repository == 'github/repoB'\n",
      );
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
      jobSettings: {
        if: 'contains(fromJson(\'["push", "pull_request"]\'), github.event_name)',
      },
    });

    const stage = new GitHubStage(app, 'MyPrePostStack', {
      env: { account: '111111111111', region: 'us-east-1' },
      jobSettings: {
        if: "success() && contains(github.event.issue.labels.*.name, 'deploy')",
      },
    });

    new Stack(stage, 'MyStack');

    pipeline.addStage(stage, {
      pre: [
        new GitHubActionStep('PreDeployAction', {
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
        }),
      ],

      post: [
        new GitHubActionStep('PostDeployAction', {
          jobSteps: [
            {
              name: 'Checkout',
              uses: 'actions/checkout@v3',
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
        }),
      ],
    });

    app.synth();

    const workflowFileContents = readFileSync(pipeline.workflowPath, 'utf-8');
    expect(workflowFileContents).toMatchSnapshot();
    expect(workflowFileContents).toContain('my-pre-deploy-action@1.0.0');
    expect(workflowFileContents).toContain('my-post-deploy-action@1.0.0');
    expect(workflowFileContents).toContain('actions/checkout@v3');
    expect(workflowFileContents).toContain(
      'contains(fromJson(\'["push", "pull_request"]\'), github.event_name)',
    );
    expect(workflowFileContents).toContain(
      "success() && contains(github.event.issue.labels.*.name, 'deploy')",
    );
  });
});

test('stages in github waves works', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
    });

    const stageA = new Stage(app, 'MyStageA', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    new Stack(stageA, 'MyStackA');

    const wave = pipeline.addGitHubWave('MyWave');

    const stageAOptions: AddGitHubStageOptions = {
      jobSettings: {
        if: "success() && contains(github.event.issue.labels.*.name, 'deployToA')",
      },
    };
    wave.addStageWithGitHubOptions(stageA, stageAOptions);

    const stageBOptions: GitHubStageProps = {
      env: { account: '12345678901', region: 'us-east-1' },
      jobSettings: {
        if: "success() && contains(github.event.issue.labels.*.name, 'deployToB')",
      },
    };
    const stageB = new GitHubStage(app, 'MyStageB', stageBOptions);

    new Stack(stageB, 'MyStackB');

    wave.addStage(stageB);

    app.synth();

    const workflowFileContents = readFileSync(pipeline.workflowPath, 'utf-8');
    expect(workflowFileContents).toMatchSnapshot();

    const yaml = YAML.parse(workflowFileContents);
    expect(yaml).toMatchObject({
      jobs: {
        'MyWave-MyStageA-MyStackA-Deploy': {
          if: stageAOptions.jobSettings?.if,
        },
        'MyWave-MyStageB-MyStackB-Deploy': {
          if: stageBOptions.jobSettings?.if,
        },
      },
    });
  });
});

test('github stages in waves works', () => {
  withTemporaryDirectory((dir) => {
    const buildIfStatement =
      "contains(github.event.issue.labels.*.name, 'deployToA') || contains(github.event.issue.labels.*.name, 'deployToB')";
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      jobSettings: {
        if: buildIfStatement,
      },
    });

    const stageAOptions: GitHubStageProps = {
      jobSettings: {
        if: "success() && contains(github.event.issue.labels.*.name, 'deployToA')",
      },
    };
    const stageA = new GitHubStage(app, 'MyStageA', {
      env: { account: '111111111111', region: 'us-east-1' },
      ...stageAOptions,
    });

    new Stack(stageA, 'MyStackA');

    const stageBOptions: GitHubStageProps = {
      env: { account: '12345678901', region: 'us-east-1' },
      jobSettings: {
        if: "success() && contains(github.event.issue.labels.*.name, 'deployToB')",
      },
    };
    const stageB = new GitHubStage(app, 'MyStageB', stageBOptions);

    new Stack(stageB, 'MyStackB');

    // Make a wave to have the stages be parallel (not depend on each other)
    const wave = pipeline.addGitHubWave('MyWave', {
      pre: [
        new GitHubActionStep('PreWaveAction', {
          jobSteps: [
            {
              name: 'pre wave action',
              uses: 'my-pre-wave-action@1.0.0',
              with: {
                'app-id': 1234,
                'secrets': 'my-secrets',
              },
            },
          ],
        }),
      ],

      post: [
        new GitHubActionStep('PostWaveAction', {
          jobSteps: [
            {
              name: 'Checkout',
              uses: 'actions/checkout@v3',
            },
            {
              name: 'post wave action',
              uses: 'my-post-wave-action@1.0.0',
              with: {
                'app-id': 4321,
                'secrets': 'secrets',
              },
            },
          ],
        }),
      ],
    });
    wave.addStage(stageA);
    wave.addStage(stageB);

    app.synth();

    const workflowFileContents = readFileSync(pipeline.workflowPath, 'utf-8');
    expect(workflowFileContents).toMatchSnapshot();

    const yaml = YAML.parse(workflowFileContents);
    expect(yaml).toMatchObject({
      jobs: {
        'Build-Build': {
          if: buildIfStatement,
        },
        'MyWave-MyStageA-MyStackA-Deploy': {
          if: stageAOptions.jobSettings?.if,
        },
        'MyWave-MyStageB-MyStackB-Deploy': {
          if: stageBOptions.jobSettings?.if,
        },
      },
    });
  });
});

test('stages in pipeline works with `if`', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
    });

    const stageA = new Stage(app, 'MyStageA', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    new Stack(stageA, 'MyStackA');

    const stageAOptions: AddGitHubStageOptions = {
      jobSettings: {
        if: "success() && contains(github.event.issue.labels.*.name, 'deployToA')",
      },
    };
    pipeline.addStageWithGitHubOptions(stageA, stageAOptions);

    const stageBOptions: GitHubStageProps = {
      env: { account: '12345678901', region: 'us-east-1' },
      jobSettings: {
        if: "success() && contains(github.event.issue.labels.*.name, 'deployToB')",
      },
    };
    const stageB = new GitHubStage(app, 'MyStageB', stageBOptions);

    new Stack(stageB, 'MyStackB');

    pipeline.addStage(stageB);

    app.synth();

    const workflowFileContents = readFileSync(pipeline.workflowPath, 'utf-8');
    expect(workflowFileContents).toMatchSnapshot();
    expect(workflowFileContents).toContain('actions/checkout@v3');

    const yaml = YAML.parse(workflowFileContents);
    expect(yaml).toMatchObject({
      jobs: {
        'MyStageA-MyStackA-Deploy': {
          if: stageAOptions.jobSettings?.if,
        },
        'MyStageB-MyStackB-Deploy': {
          if: stageBOptions.jobSettings?.if,
        },
      },
    });
  });
});

test('stages added to a pipeline after build will fail', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
    });

    const stageA = new Stage(app, 'MyStageA', {
      env: { account: '111111111111', region: 'us-east-1' },
    });
    new Stack(stageA, 'MyStackA');
    pipeline.addStageWithGitHubOptions(stageA, {});

    const stageB = new GitHubStage(app, 'MyStageB', {});
    new Stack(stageB, 'MyStackB');

    app.synth();

    expect(() => pipeline.addStage(stageB)).toThrowErrorMatchingInlineSnapshot('"addStage: can\'t add Stages anymore after buildPipeline() has been called"');
  });
});

// cannot test adding a stage to a GitHubWave post-build, since Waves to not throw an error in that case...

test('waves added to a pipeline after build will fail', () => {
  withTemporaryDirectory((dir) => {
    const pipeline = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
    });

    const wave = pipeline.addGitHubWave('wave');

    const stageA = new Stage(app, 'MyStageA', {
      env: { account: '111111111111', region: 'us-east-1' },
    });
    new Stack(stageA, 'MyStackA');
    wave.addStage(stageA, {});

    const stageB = new GitHubStage(app, 'MyStageB', {});
    new Stack(stageB, 'MyStackB');

    app.synth();

    expect(() => pipeline.addGitHubWave('wave2')).toThrowErrorMatchingInlineSnapshot('"addWave: can\'t add Waves anymore after buildPipeline() has been called"');
  });
});
