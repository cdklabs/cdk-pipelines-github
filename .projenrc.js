const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  name: 'cdk-pipelines-github',
  description: 'GitHub Workflows support for CDK Pipelines',
  author: 'Amazon Web Services',
  authorAddress: 'https://aws.amazon.com',
  cdkVersion: '1.119.0',
  defaultReleaseBranch: 'main',
  repositoryUrl: 'https://github.com/cdklabs/cdk-pipelines-github.git',
  testdir: 'src/__tests__',
  bundledDeps: ['decamelize', 'yaml'],
});

project.addPeerDeps('@aws-cdk/core');
project.addPeerDeps('@aws-cdk/cx-api');
project.addPeerDeps('@aws-cdk/pipelines');
project.addDevDeps('@aws-cdk/aws-lambda');
project.addDevDeps('@aws-cdk/aws-s3');

project.synth();