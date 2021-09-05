const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  name: 'cdk-pipelines-github',
  description: 'GitHub Workflows support for CDK Pipelines',
  author: 'Amazon Web Services',
  authorAddress: 'https://aws.amazon.com',
  cdkVersion: '1.119.0',
  defaultReleaseBranch: 'main',
  repositoryUrl: 'https://github.com/cdklabs/cdk-pipelines-github.git',
  bundledDeps: ['decamelize', 'yaml'],

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

project.addPeerDeps('@aws-cdk/core');
project.addPeerDeps('@aws-cdk/cx-api');
project.addPeerDeps('@aws-cdk/pipelines');
project.addDevDeps('@aws-cdk/core');
project.addDevDeps('@aws-cdk/cx-api');
project.addDevDeps('@aws-cdk/pipelines');

// used in tests
project.addDevDeps('@aws-cdk/aws-lambda');
project.addDevDeps('@aws-cdk/aws-s3');

project.synth();
