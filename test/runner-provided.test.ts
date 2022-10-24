import { readFileSync } from 'fs';
import { Stack, Stage } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow, AwsCredentials } from '../src';
import { withTemporaryDirectory, TestApp } from './testutil';

let app: TestApp;
beforeEach(() => {
  const tempOutDir = 'runner-provided.out';
  app = new TestApp({
    outdir: tempOutDir,
  });
});

afterEach(() => {
  app.cleanup();
});

test('pipeline without aws credentials', () => {
  withTemporaryDirectory((dir) => {
    const github = new GitHubWorkflow(app, 'Pipeline', {
      workflowPath: `${dir}/.github/workflows/deploy.yml`,
      synth: new ShellStep('Build', {
        installCommands: ['yarn'],
        commands: ['yarn build'],
      }),
      awsCreds: AwsCredentials.runnerHasPreconfiguredCreds(),
    });

    const stage = new Stage(app, 'MyStack', {
      env: { account: '111111111111', region: 'us-east-1' },
    });

    new Stack(stage, 'MyStack');

    github.addStage(stage);

    app.synth();

    expect(readFileSync(github.workflowPath, 'utf-8')).toMatchSnapshot();
  });
});
