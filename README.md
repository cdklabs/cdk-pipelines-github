# CDK Pipelines for GitHub Workflows

![Experimental](https://img.shields.io/badge/experimental-important.svg?style=for-the-badge)

Deploy CDK applications through GitHub workflows.


## Table of Contents

- [Usage](#usage)
- [AWS Credentials](#aws-credentials)
  + [GitHub Secrets](#github-secrets)
  + [OpenId Connect](#openid-connect)
- [Assets](#assets)
   + [Docker](#docker)
- [Tutorial](#tutorial)

## Usage

Assuming you have a
[`Stage`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Stage.html)
called `MyStage` that includes CDK stacks for your app and you want to deploy it
to two AWS environments (`BETA_ENV` and `PROD_ENV`):

```ts
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GithubWorkflow } from 'cdk-pipelines-github';

const app = new App();

const pipeline = new GithubWorkflow(app, 'Pipeline', {
  synth: new ShellStep('Build', {
    commands: [
      'yarn install',
      'yarn build',
    ],
  }),
});

pipeline.addStage(new MyStage(this, 'Beta', { env: BETA_ENV }));
pipeline.addStage(new MyStage(this, 'Prod', { env: PROD_ENV }));

app.synth();
```

When you run `cdk synth`, a `deploy.yml` workflow will be created under
`.github/workflows` in your repo. This workflow will deploy your application
based on the definition of the pipeline. In this case, it will the two stages in
sequence, and within each stage, it will deploy all the stacks according to
their dependency order and maximum parallelism. If you app uses assets, assets
will be published to the relevant destination environment.

The `Pipeline` class from `cdk-pipelines-github` is derived from the base CDK
Pipelines class, so most features should be supported out of the box. See the
[CDK Pipelines](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html)
documentation for more details.

**NOTES:**

* Environments must be bootstrapped separately using `cdk bootstrap`. See [CDK
  Environment
  Bootstrapping](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html#cdk-environment-bootstrapping)
  for details.
* The workflow expects the GitHub repository to include secrets with AWS
  credentials (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`).
  
## AWS Credentials

There are two ways to supply AWS credentials to the workflow. The default is to
store long-lived AWS user credentials in GitHub secrets. Alternatively, you can
use an IAM role that trusts the GitHub OpenId Connect provider to authenticate.
Using OIDC to authenticate is not the default because it is a newer option, but
there are compelling benefits to this approach. You can read more
[here](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect).

### GitHub Secrets

Authenticating via this approach means that you will be manually creating AWS
credentials and duplicating them in GitHub secrets. The workflow expects the
GitHub repository to include secrets with AWS credentials under `AWS_ACCESS_KEY_ID`
and `AWS_SECRET_ACCESS_KEY`. You can override these defaults by supplying the
`awsCredentials` property to the workflow:

```ts
const app = new App();

const pipeline = new GithubWorkflow(app, 'Pipeline', {
  synth: new ShellStep('Build', {
    commands: [
      'yarn install',
      'yarn build',
    ],
  }),
  awsCredentials: {
    accessKeyId: 'MY_ID',
    secretAccessKey: 'MY_KEY',
    sessionToken: 'MY_TOKEN', // default is no token
});
```

### OpenId Connect

## Assets

### Docker

## Tutorial

You can find an example usage in [test/example-app.ts](./test/example-app.ts)
which includes a simple CDK app and a pipeline.

You can find a repository that uses this example here: [eladb/test-app-cdkpipeline](https://github.com/eladb/test-app-cdkpipeline).

To run the example, clone this repository and install dependencies:

```shell
cd ~/projects # or some other playground space
git clone https://github.com/cdklabs/cdk-pipelines-github
cd cdk-pipelines-github
yarn
```

Now, create a new GitHub repository and clone it as well:

```shell
cd ~/projects
git clone https://github.com/myaccount/my-test-repository
```

You'll need to set up AWS credentials in your environment:

```shell
export AWS_ACCESS_KEY_ID=xxxx
export AWS_SECRET_ACCESS_KEY=xxxxx
```

Bootstrap your environments:

```shell
export CDK_NEW_BOOTSTRAP=1
npx cdk bootstrap aws://ACCOUNTID/us-east-1
npx cdk bootstrap aws://ACCOUNTID/eu-west-2
```

Now, run the `manual-test.sh` script when your working directory is the new repository:

```shell
cd ~/projects/my-test-repository
~/projects/cdk-piplines/github/test/manual-test.sh
```

This will produce a `cdk.out` directory and a `.github/workflows/deploy.yml` file.

Commit and push these files to your repo and you should see the deployment
workflow in action. Make sure your GitHub repository has `AWS_ACCESS_KEY_ID` and
`AWS_SECRET_ACCESS_KEY` secrets that can access the same account that you
synthesized against.

## Not supported yet

This is work in progress. The following features are still not supported:

* [ ] Credentials and roles (document permissions required, etc)
* [ ] Anti-tamper check for CI runs (`synth` should fail if `CI=1` and the workflow has changed)
* [ ] Revise Documentation

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for more information.

## License

This project is licensed under the Apache-2.0 License.
