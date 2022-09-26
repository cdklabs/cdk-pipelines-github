const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  name: 'cdk-pipelines-github',
  description: 'GitHub Workflows support for CDK Pipelines',
  author: 'Amazon Web Services',
  authorAddress: 'https://aws.amazon.com',
  cdkVersion: '2.9.0',
  constructsVersion: '10.0.46',
  defaultReleaseBranch: 'main',
  repositoryUrl: 'https://github.com/cdklabs/cdk-pipelines-github.git',
  bundledDeps: ['decamelize', 'yaml', 'fast-json-patch'],

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

  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  autoApproveUpgrades: true,
  autoApproveOptions: { allowedUsernames: ['cdklabs-automation'], secret: 'GITHUB_TOKEN' },
});

project.addPeerDeps('aws-cdk-lib');

// used in tests
project.addDevDeps('aws-cdk-lib');

// JSII sets this to `false` so we need to be compatible
project.tsconfigDev.compilerOptions.esModuleInterop = false;

project.synth();
