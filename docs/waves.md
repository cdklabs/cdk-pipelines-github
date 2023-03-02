# Example of how to add a Wave to a pipeline

You can add a Wave to a pipeline, where each stage of a wave will build in parallel.

> **Note**: The `pipeline.addWave()` call will return a `Wave` object that is actually a `GitHubWave` object, but 
> due to JSII rules the return type of `addWave()` cannot be changed. If you need to use
> `wave.addStageWithGitHubOptions()` then you should call `pipeline.addGitHubWave()` instead, or you can
> use `GitHubStage`s to carry the GitHub properties.

Example usage in TypeScript:

```ts
// make a new pipeline
import { ShellStep } from 'aws-cdk-lib/pipelines';

const app = new App();

const pipeline = new GitHubWorkflow(app, 'Pipeline', {
  synth: new ShellStep('Build', {
    commands: [
      'yarn install',
      'yarn build',
    ],
  }),
  awsCreds: AwsCredentials.fromOpenIdConnect({
    gitHubActionRoleArn: 'arn:aws:iam::<account-id>:role/GitHubActionRole',
  }),
});

// make a stage
const stageA = new GitHubStage(app, 'MyStageA', {
  env: { account: '111111111111', region: 'us-east-1' },
  {
    jobSettings: {
      if: "success() && contains(github.event.issue.labels.*.name, 'deployToA')",
    },
  }
});
// add a stack
new Stack(stageA, 'MyStackA');

// make a second stage
const stageB = new GitHubStage(app, 'MyStageB', {
  env: { account: '12345678901', region: 'us-east-1' },
  jobSettings: {
    if: "success() && contains(github.event.issue.labels.*.name, 'deployToB')",
  },
});
// add a stack to that second stage
new Stack(stageB, 'MyStackB');

// Make a wave to have the stages run in parallel (and not depend on each other)
// We can also add steps to be run once before and once after ALL of the stages in this wave
const wave = pipeline.addWave('MyWave', {
  pre: [
    // add a pre-wave actions
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

// Now add both stages to the wave - they will build in parallel
wave.addStage(stageA);
wave.addStage(stageB);

// pre- and post-wave actions can both be added after the wave is constructed
// with wave.addPre() and wave.addPost()
wave.addPost([
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
]);
```