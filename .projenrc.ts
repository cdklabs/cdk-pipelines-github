import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { DependencyType, javascript, JsonPatch } from 'projen';

const project = new CdklabsConstructLibrary({
  projenrcTs: true,
  private: false,
  name: 'cdk-pipelines-github',
  description: 'GitHub Workflows support for CDK Pipelines',
  author: 'Amazon Web Services',
  authorAddress: 'aws-cdk-dev@amazon.com',
  cdkVersion: '2.80.0',
  constructsVersion: '10.0.46',
  defaultReleaseBranch: 'main',
  repositoryUrl: 'https://github.com/cdklabs/cdk-pipelines-github.git',
  packageManager: javascript.NodePackageManager.NPM,
  enablePRAutoMerge: true,
  bundledDeps: ['decamelize', 'yaml', 'fast-json-patch'],
  depsUpgradeOptions: {
    cooldown: 3,
  },
  jestOptions: {
    jestConfig: {
      testMatch: [
        '<rootDir>/test/**/*(*.)@(spec|test).ts?(x)',
        '<rootDir>/src/**/*(*.)@(spec|test).ts?(x)',
      ],
    },
    updateSnapshot: javascript.UpdateSnapshot.NEVER,
  },

  publishToPypi: {
    distName: 'cdk-pipelines-github',
    module: 'cdk_pipelines_github',
  },

  publishToMaven: {
    javaPackage: 'io.github.cdklabs.cdkpipelines.github',
    mavenGroupId: 'io.github.cdklabs',
    mavenArtifactId: 'cdk-pipelines-github',
    mavenServerId: 'central-ossrh',
  },

  publishToNuget: {
    dotNetNamespace: 'Cdklabs.CdkPipelinesGitHub',
    packageId: 'Cdklabs.CdkPipelinesGitHub',
  },
});

// integ-tests-alpha must be the same version 
project.deps.removeDependency(`@aws-cdk/integ-tests-alpha`);
project.deps.addDependency(`@aws-cdk/integ-tests-alpha@${project.cdkVersion.substring(1)}-alpha.0`, DependencyType.TEST);

// JSII sets this to `false` so we need to be compatible
const tsConfigDev = project.tryFindObjectFile('tsconfig.dev.json');
tsConfigDev?.patch(JsonPatch.replace('/compilerOptions/esModuleInterop', false));

project.synth();
