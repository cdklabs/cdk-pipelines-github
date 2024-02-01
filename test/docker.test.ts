import * as fs from 'fs';
import * as os from 'os';
import { join } from 'path';
import { App, Stack, Stage, StageProps } from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import * as YAML from 'yaml';
import { TestApp } from './testutil';
import { DockerAssetJobSettings, DockerCredential, GitHubWorkflow, JobPermission } from '../src';

const dockers = join(__dirname, 'demo-image');

describe('correct format for docker credentials:', () => {
  let app: TestApp;
  beforeEach(() => {
    const tempOutDir = 'docker.out';
    app = new TestApp({
      outdir: tempOutDir,
    });
  });

  afterEach(() => {
    app.cleanup();
  });

  test('ECR', () => {
    const github = createDockerGithubWorkflow(app, [DockerCredential.ecr('000000000000.dkr.ecr.us-east-1.amazonaws.com')]);
    const file = fs.readFileSync(github.workflowPath, 'utf-8');
    const workflow = YAML.parse(file);

    const steps = findStepByJobAndUses(workflow, 'Assets-DockerAsset1', 'docker/login-action@v2');

    expect(steps.length).toEqual(1);
    expect(steps[0]).toEqual({
      uses: 'docker/login-action@v2',
      with: {
        registry: '000000000000.dkr.ecr.us-east-1.amazonaws.com',
      },
    });
  });

  test('DockerHub', () => {
    const github = createDockerGithubWorkflow(app, [DockerCredential.dockerHub()]);
    const file = fs.readFileSync(github.workflowPath, 'utf-8');
    const workflow = YAML.parse(file);

    const steps = findStepByJobAndUses(workflow, 'Assets-DockerAsset1', 'docker/login-action@v2');

    expect(steps.length).toEqual(1);
    expect(steps[0]).toEqual({
      uses: 'docker/login-action@v2',
      with: {
        username: '${{ secrets.DOCKERHUB_USERNAME }}',
        password: '${{ secrets.DOCKERHUB_TOKEN }}',
      },
    });
  });

  test('custom registry', () => {
    const registryName = 'registry';
    const github = createDockerGithubWorkflow(app, [
      DockerCredential.customRegistry(registryName, {
        usernameKey: 'CUSTOM_USERNAME',
        passwordKey: 'CUSTOM_PASSWORD',
      }),
    ]);
    const file = fs.readFileSync(github.workflowPath, 'utf-8');
    const workflow = YAML.parse(file);

    const steps = findStepByJobAndUses(workflow, 'Assets-DockerAsset1', 'docker/login-action@v2');

    expect(steps.length).toEqual(1);
    expect(steps[0]).toEqual({
      uses: 'docker/login-action@v2',
      with: {
        username: '${{ secrets.CUSTOM_USERNAME }}',
        password: '${{ secrets.CUSTOM_PASSWORD }}',
        registry: registryName,
      },
    });
  });

  test('multiple credentials', () => {
    const github = createDockerGithubWorkflow(app, [
      DockerCredential.dockerHub(),
      DockerCredential.ecr('000000000000.dkr.ecr.us-east-1.amazonaws.com'),
    ]);

    const file = fs.readFileSync(github.workflowPath, 'utf-8');
    const workflow = YAML.parse(file);

    const steps = findStepByJobAndUses(workflow, 'Assets-DockerAsset1', 'docker/login-action@v2');

    expect(steps.length).toEqual(2);
    expect(steps[0]).toEqual({
      uses: 'docker/login-action@v2',
      with: {
        username: '${{ secrets.DOCKERHUB_USERNAME }}',
        password: '${{ secrets.DOCKERHUB_TOKEN }}',
      },
    });
    expect(steps[1]).toEqual({
      uses: 'docker/login-action@v2',
      with: {
        registry: '000000000000.dkr.ecr.us-east-1.amazonaws.com',
      },
    });
  });

  test('with setup job steps', () => {
    const github = createDockerGithubWorkflow(app, [DockerCredential.dockerHub()], {
      setupSteps: [
        {
          name: 'Setup Docker buildx',
          uses: 'docker/setup-buildx-action@v3',
        },
      ],
    });
    const file = fs.readFileSync(github.workflowPath, 'utf-8');
    const workflow = YAML.parse(file);
    const steps = findStepByJobAndUses(workflow, 'Assets-DockerAsset1', 'docker/setup-buildx-action@v3');
    expect(steps.length).toEqual(1);
    expect(steps[0]).toEqual({
      name: 'Setup Docker buildx',
      uses: 'docker/setup-buildx-action@v3',
    });
  });

  test('with permissions', () => {
    const github = createDockerGithubWorkflow(app, [DockerCredential.dockerHub()], {
      permissions: {
        packages: JobPermission.READ,
      },
    });
    const file = fs.readFileSync(github.workflowPath, 'utf-8');
    const workflow = YAML.parse(file);

    const permissions = workflow.jobs['Assets-DockerAsset1'].permissions;
    expect(permissions).toEqual({
      'contents': 'read',
      'id-token': 'none',
      'packages': 'read',
    });
  });
});

function createDockerGithubWorkflow(app: App, dockerCredentials: DockerCredential[], dockerAssetJobSettings?: DockerAssetJobSettings) {
  const github = new GitHubWorkflow(app, 'Pipeline', {
    workflowPath: `${mkoutdir()}/.github/workflows/deploy.yml`,
    synth: new ShellStep('Build', {
      installCommands: ['yarn'],
      commands: ['yarn build'],
    }),
    dockerCredentials,
    dockerAssetJobSettings,
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

function findStepByJobAndUses(workflow: any, job: string, uses: string): any {
  const steps: any[] = workflow.jobs[job].steps;
  return steps.filter((s) => s.uses === uses);
}
