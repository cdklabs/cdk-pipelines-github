// This is a CDK app that uses CDK Pipelines with a GitHub workflows backend. It
// is intended to be executed from the root directory of a GitHub repository and
// it will synthesize a `cdk.out` and `.github/workflows` directory, both of which
// are exepected to be committed into the repository.
//
// To run:
//
//    cdk synth -a "ts-node manual-test.ts"
//

import { GitHubExampleApp } from './example-app';

const account = process.env.CDK_DEFAULT_ACCOUNT;
if (!account) {
  throw new Error('CDK_DEFAULT_ACCOUNT is required');
}

const app = new GitHubExampleApp({
  repoDir: '.',
  envA: `aws://${account}/us-east-1`,
  envB: `aws://${account}/eu-west-2`,
});

app.synth();
