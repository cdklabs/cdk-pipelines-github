import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { JsonPatch } from 'projen';
import { UpdateSnapshot } from 'projen/lib/javascript';

const project = new CdklabsConstructLibrary({
  projenrcTs: true,
  private: false,
  name: 'cdk-pipelines-github',
  description: 'GitHub Workflows support for CDK Pipelines',
  author: 'Amazon Web Services',
  authorAddress: 'aws-cdk-dev@amazon.com',
  cdkVersion: '2.9.0',
  constructsVersion: '10.0.46',
  defaultReleaseBranch: 'main',
  repositoryUrl: 'https://github.com/cdklabs/cdk-pipelines-github.git',
  bundledDeps: ['decamelize', 'yaml', 'fast-json-patch'],
  devDeps: [
    'cdklabs-projen-project-types',
    'aws-cdk-lib',
    '@aws-cdk/integ-runner@^2.60.0',
    '@aws-cdk/integ-tests-alpha',
  ],
  peerDeps: ['aws-cdk-lib'],
  jestOptions: {
    updateSnapshot: UpdateSnapshot.NEVER,
  },

  publishToPypi: {
    distName: 'cdk-pipelines-github',
    module: 'cdk_pipelines_github',
  },

  publishToMaven: {
    javaPackage: 'io.github.cdklabs.cdkpipelines.github',
    mavenGroupId: 'io.github.cdklabs',
    mavenArtifactId: 'cdk-pipelines-github',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },

  publishToNuget: {
    dotNetNamespace: 'Cdklabs.CdkPipelinesGitHub',
    packageId: 'Cdklabs.CdkPipelinesGitHub',
  },

  workflowNodeVersion: '18.x',
});

// JSII sets this to `false` so we need to be compatible
const tsConfigDev = project.tryFindObjectFile('tsconfig.dev.json');
tsConfigDev?.patch(JsonPatch.replace('/compilerOptions/esModuleInterop', false));

project.synth();
