// This is a CDK app that uses CDK Pipelines with a GitHub workflows backend. It
// is intended to be executed from the root directory of a GitHub repository and
// it will synthesize a `cdk.out` and `.github/workflows` directory, both of which
// are exepected to be committed into the repository.
//
// To run:
//
//    cdk synth -a "ts-node manual-test.ts"
//

//import { App, Stack } from 'aws-cdk-lib';
//import * as iam from 'aws-cdk-lib/aws-iam';
import { GitHubExampleApp } from './example-app';

const account = process.env.CDK_DEFAULT_ACCOUNT;
if (!account) {
  throw new Error('CDK_DEFAULT_ACCOUNT is required');
}

// const root = new App();
// const stack = new Stack(root, 'stack');
// const role = iam.Role.fromRoleArn(stack, 'myrole', 'arn:aws:iam::489318732371:role/github-oidc-test');

const app = new GitHubExampleApp({
  repoDir: '.',
  envA: `aws://${account}/us-east-1`,
  envB: `aws://${account}/eu-west-1`,
});

app.synth();
