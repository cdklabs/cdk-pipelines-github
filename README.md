# CDK Pipelines for GitHub Workflows

![Experimental](https://img.shields.io/badge/experimental-important.svg?style=for-the-badge)

Deploy CDK applications through GitHub workflows.

## Usage

Assuming you have a [CDK
stage](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stage.html)
called `MyStage` that includes CDK stacks for your app and you want to deploy it
to two AWS environments (`BETA_ENV` and `PROD_ENV`):

```ts
import { WorkflowPipeline } from 'cdk-pipelines-github';

const app = new App();

const pipeline = new WorkflowPipeline(app, 'Pipeline', {
  synth: new ShellStep('Build', {
    commands: [
      'yarn install',
      'yarn build',
    ],
  }),
  workflowPath: '.github/workflows/deploy.yml',
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

The `WorkflowPipeline` is derived from the base CDK Pipelines class, so most
features should be supported out of the box. See the [CDK
Pipelines](https://docs.aws.amazon.com/cdk/api/latest/docs/pipelines-readme.html)
documentation for more details.

**NOTES:**

* Environments must be bootstrapped separately using `cdk bootstrap`. See [CDK
  Environment
  Bootstrapping](https://docs.aws.amazon.com/cdk/api/latest/docs/pipelines-readme.html#cdk-environment-bootstrapping)
  for details.
* The workflow expects the GitHub repository to include secrets with AWS
  credentials (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`).

## Not supported yet

This is work in progress. The following features are still not supported:

* [ ] Credentials and roles (document permissions required, etc)
* [ ] Support Docker image assets
* [ ] Support Pre/post steps
* [ ] Support CFN output bindings
* [ ] Anti-tamper check for CI runs (`synth` should fail if `CI=1` and the workflow has changed)
* [ ] Revise Documentation

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for more information.

## License

This project is licensed under the Apache-2.0 License.
