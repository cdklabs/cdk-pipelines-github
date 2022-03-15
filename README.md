# CDK Pipelines for GitHub Workflows

![Experimental](https://img.shields.io/badge/experimental-important.svg?style=for-the-badge)

A construct library for painless Continuous Delivery of CDK applications,
deployed via
[GitHub Workflows](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions).

The CDK already has a CI/CD solution,
[CDK Pipelines](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html),
which creates an AWS CodePipeline that deploys CDK applications. This module 
serves the same surface area, except that it is implemented with GitHub 
Workflows.

## Table of Contents

- [Usage](#usage)
- [Initial Setup](#initial-setup)
- [AWS Credentials](#aws-credentials)
  + [GitHub Action Role](#github-action-role)
    - [`GitHubActionRole` Construct](#githubactionrole-construct)
  + [GitHub Secrets](#github-secrets)
- [Using Docker In The Pipeline](#using-docker-in-the-pipeline)
  + [Authenticating To Docker Registries](#authenticating-to-docker-registries)
- [Tutorial](#tutorial)
- [Not Supported Yet](#not-supported-yet)
- [Contributing](#contributing)
- [License](#license)

## Usage

Assuming you have a
[`Stage`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Stage.html)
called `MyStage` that includes CDK stacks for your app and you want to deploy it
to two AWS environments (`BETA_ENV` and `PROD_ENV`):

```ts
import { App } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow } from 'cdk-pipelines-github';

const app = new App();

const pipeline = new GitHubWorkflow(app, 'Pipeline', {
  synth: new ShellStep('Build', {
    commands: [
      'yarn install',
      'yarn build',
    ],
  }),
  gitHubActionRoleArn: 'arn:aws:iam::<account-id>:role/GitHubActionRole',
});

pipeline.addStage(new MyStage(this, 'Beta', { env: BETA_ENV }));
pipeline.addStage(new MyStage(this, 'Prod', { env: PROD_ENV }));

app.synth();
```

When you run `cdk synth`, a `deploy.yml` workflow will be created under
`.github/workflows` in your repo. This workflow will deploy your application
based on the definition of the pipeline. In the example above, it will deploy
the two stages in sequence, and within each stage, it will deploy all the
stacks according to their dependency order and maximum parallelism. If your app
uses assets, assets will be published to the relevant destination environment.

The `Pipeline` class from `cdk-pipelines-github` is derived from the base CDK
Pipelines class, so most features should be supported out of the box. See the
[CDK Pipelines](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html)
documentation for more details.

**NOTES:**

* Environments must be bootstrapped separately using `cdk bootstrap`. See [CDK
  Environment
  Bootstrapping](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.pipelines-readme.html#cdk-environment-bootstrapping)
  for details.

## Initial Setup

Assuming you have your CDK app checked out on your local machine, here are the suggested steps
to develop your GitHub Workflow.

* Set up AWS Credentials your local environment. It is highly recommended to authenticate via an OpenId
  Connect IAM Role. You can set one up using the [`GithubActionRole`](#github-action-role) class provided 
  in this module. For more information (and alternatives), see [AWS Credentials](#aws-credentials).

* When you've updated your pipeline and are ready to deploy, run `cdk synth`. This creates a workflow file
  in `.github/workflows/deploy.yml`.

* When you are ready to test your pipeline, commit your code changes as well as the `deploy.yml` file to
  GitHub. GitHub will automatically try to run the workflow found under `.github/workflows/deploy.yml`.

* You will be able to see the result of the run on the `Actions` tab in your repository:

  ![Screen Shot 2021-08-22 at 12 06 05](https://user-images.githubusercontent.com/598796/130349345-a10a2f75-0848-4de8-bc4c-f5a1418ee228.png)

For an in-depth run-through on creating your own GitHub Workflow, see the
[Tutorial](#tutorial) section.

## AWS Credentials

There are two ways to supply AWS credentials to the workflow:

* GitHub Action IAM Role (recommended).
* Long-lived AWS Credentials stored in GitHub Secrets.

The GitHub Action IAM Role authenticates via the GitHub OpenID Connect provider
and is recommended, but it requires preparing your AWS account beforehand. This
approach allows your Workflow to exchange short-lived tokens directly from AWS.
With OIDC, benefits include:

* No cloud secrets.
* Authentication and authorization management.
* Rotating credentials.
 
You can read more
[here](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect).

### GitHub Action Role

Authenticating via OpenId Connect means you do not need to store long-lived 
credentials as GitHub Secrets. With OIDC, you provide a pre-provisioned IAM
role to your GitHub Workflow via the `gitHubActionRoleArn` property.

```ts
import { App } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow } from 'cdk-pipelines-github';

const app = new App();

const pipeline = new GitHubWorkflow(app, 'Pipeline', {
  synth: new ShellStep('Build', {
    commands: [
      'yarn install',
      'yarn build',
    ],
  }),
  gitHubActionRoleArn: 'arn:aws:iam::<account-id>:role/GitHubActionRole',
});
```

There are two ways to create this IAM role:

* Use the `GitHubActionRole` construct (recommended and described below).
* Manually set up the role ([Guide](https://github.com/cdklabs/cdk-pipelines-github/blob/main/GITHUB_ACTION_ROLE_SETUP.md)).

#### `GitHubActionRole` Construct

Because this construct involves creating an IAM role in your account, it must
be created separate to your GitHub Workflow and deployed via a normal
`cdk deploy` with your local AWS credentials. Upon successful deployment, the
arn of your newly created IAM role will be exposed as a `CfnOutput`.

To utilize this construct, create a separate CDK stack with the following code
and `cdk deploy`:

```ts
import { GitHubActionRole } from 'cdk-pipelines-github';
import { App, Construct, Stack, StackProps } from 'aws-cdk-lib';

class MyGitHubActionRole extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const provider = new GitHubActionRole(this, 'github-action-role', {
      repoString: 'myUser/myRepo',
    };
  }
}

const app = new App();
new MyGitHubActionRole(app, 'MyGitHubActionRole');
app.synth();
```

Note: If you have previously created the GitHub identity provider with url
`https://token.actions.githubusercontent.com`, the above example will fail
because you can only have one such provider defined per account. In this
case, you must provide the already created provider into your `GithubActionRole`
construct via the `provider` property.

> Make sure the audience for the provider is `sts.amazonaws.com` in this case.

```ts
class MyGitHubActionRole extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const provider = new GitHubActionRole(this, 'github-action-role', {
      repos: ['myUser/myRepo'],
      provider: GitHubActionRole.existingGitHubActionsProvider(this),
    });
  }
}
```

### GitHub Secrets

Authenticating via this approach means that you will be manually creating AWS
credentials and duplicating them in GitHub secrets. The workflow expects the
GitHub repository to include secrets with AWS credentials under 
`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. You can override these defaults 
by supplying the `awsCredentials` property to the workflow:

```ts
import { App } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow } from 'cdk-pipelines-github';

const app = new App();

const pipeline = new GitHubWorkflow(app, 'Pipeline', {
  synth: new ShellStep('Build', {
    commands: [
      'yarn install',
      'yarn build',
    ],
  }),
  awsCredentials: {
    accessKeyId: 'MY_ID', // GitHub will look for the access key id under the secret `MY_ID`
    secretAccessKey: 'MY_KEY', // GitHub will look for the secret access key under the secret `MY_KEY`
  },
});
```

### Using Docker in the Pipeline

You can use Docker in GitHub Workflows in a similar fashion to CDK Pipelines.
For a full discussion on how to use Docker in CDK Pipelines, see
[Using Docker in the Pipeline](https://github.com/aws/aws-cdk/blob/master/packages/@aws-cdk/pipelines/README.md#using-docker-in-the-pipeline).

Just like CDK Pipelines, you may need to authenticate to Docker registries to
avoid being throttled. 

#### Authenticating to Docker registries

You can specify credentials to use for authenticating to Docker registries as
part of the Workflow definition. This can be useful if any Docker image assets — 
in the pipeline or any of the application stages — require authentication, either 
due to being in a different environment (e.g., ECR repo) or to avoid throttling 
(e.g., DockerHub).

```ts
import { App } from 'aws-cdk-lib';
import { ShellStep } from 'aws-cdk-lib/pipelines';
import { GitHubWorkflow } from 'cdk-pipelines-github';

const app = new App();

const pipeline = new GitHubWorkflow(app, 'Pipeline', {
  synth: new ShellStep('Build', {
    commands: [
      'yarn install',
      'yarn build',
    ],
  }),
  dockerCredentials: [
    // Authenticate to ECR
    DockerCredential.ecr('<account-id>.dkr.ecr.<aws-region>.amazonaws.com'),

    // Authenticate to DockerHub
    DockerCredential.dockerHub({
      // These properties are defaults; feel free to omit
      usernameKey: 'DOCKERHUB_USERNAME',
      personalAccessTokenKey: 'DOCKERHUB_TOKEN',
    }),

    // Authenticate to Custom Registries
    DockerCredential.customRegistry('custom-registry', {
      usernameKey: 'CUSTOM_USERNAME',
      passwordKey: 'CUSTOM_PASSWORD',
    }),
  ],
});
```

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

You'll need to set up AWS credentials in your environment. Note that this tutorial uses
long-lived GitHub secrets as credentials for simplicity, but it is recommended to set up
a GitHub OIDC role instead.

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

> In this tutorial, you are supposed to commit `cdk.out` (i.e. the code is pre-synthed).
> Do not do this in your app; you should always synth during the synth step of the GitHub
> workflow. In the example app this is achieved through the `preSynthed: true` option.
> It is for example purposes only and is not something you should do in your app.
> ```ts
> const pipeline = new GitHubWorkflow(new App(), 'Pipeline', {
>   synth: new ShellStep('Build', {
>     commands: ['echo "nothing to do (cdk.out is committed)"'],
>   }),
>   // only the example app should do this. your app should synth in the synth step.
>   preSynthed: true,
> });
> ```

## Not supported yet

Most features that exist in CDK Pipelines are supported. However, as the CDK Pipelines
feature are expands, the feature set for GitHub Workflows may lag behind. If you see a
feature that you feel should be supported by GitHub Workflows, please open a GitHub issue
to track it. 

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for more information.

## License

This project is licensed under the Apache-2.0 License.
