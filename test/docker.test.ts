import * as fs from 'fs';
import * as os from 'os';
import { join } from 'path';
import { App, Stack, Stage, StageProps } from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { DockerCredential, GitHubWorkflow } from '../src';
import { TestApp } from './testutil';

const dockers = join(__dirname, 'demo-image');

describe('correct format for docker credentials:', () => {
  test('ECR', () => {
    const github = createDockerGithubWorkflow([DockerCredential.ecr('000000000000.dkr.ecr.us-east-1.amazonaws.com')]);
    expect(fs.readFileSync(github.workflowPath, 'utf-8')).toMatchSnapshot();
  });

  test('DockerHub', () => {
    const github = createDockerGithubWorkflow([DockerCredential.dockerHub()]);
    expect(fs.readFileSync(github.workflowPath, 'utf-8')).toMatchSnapshot();
  });

  test('custom registry', () => {
    const github = createDockerGithubWorkflow([
      DockerCredential.customRegistry('registry', {
        usernameKey: 'CUSTOM_USERNAME',
        passwordKey: 'CUSTOM_PASSWORD',
      }),
    ]);
    expect(fs.readFileSync(github.workflowPath, 'utf-8')).toMatchSnapshot();
  });

  test('multiple credentials', () => {
    const github = createDockerGithubWorkflow([
      DockerCredential.dockerHub(),
      DockerCredential.ecr('000000000000.dkr.ecr.us-east-1.amazonaws.com'),
    ]);

    expect(fs.readFileSync(github.workflowPath, 'utf-8')).toMatchSnapshot();
  });
});

function createDockerGithubWorkflow(dockerCredentials: DockerCredential[]) {
  const tempOutDir = 'temp.out';
  const app = new TestApp({
    outdir: tempOutDir,
  });

  const github = new GitHubWorkflow(app, 'Pipeline', {
    workflowPath: `${mkoutdir()}/.github/workflows/deploy.yml`,
    synth: new ShellStep('Build', {
      installCommands: ['yarn'],
      commands: ['yarn build'],
    }),
    dockerCredentials,
  });

  github.addStage(new MyDockerStage(app, 'MyStage', {
    env: {
      account: '000000000000',
      region: 'us-east-1',
    },
  }));

  app.synth();

  return github;
}

class MyDockerStage extends Stage {
  constructor(scope: App, id: string, props: StageProps) {
    super(scope, id, props);

    const buildStack = new Stack(this, 'BuildStack');

    new codebuild.Project(buildStack, 'MyProject', {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: ['ls'],
          },
        },
      }),
      grantReportGroupPermissions: false,
      environment: {
        buildImage: codebuild.LinuxBuildImage.fromAsset(buildStack, 'MyImage', {
          directory: dockers,
        }),
      },
    });
  }
}

function mkoutdir() {
  return fs.mkdtempSync(join(os.tmpdir(), 'cdk-pipelines-github-'));
}