# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### GitHubActionRole <a name="GitHubActionRole" id="cdk-pipelines-github.GitHubActionRole"></a>

Creates or references a GitHub OIDC provider and accompanying role that trusts the provider.

This role can be used to authenticate against AWS instead of using long-lived AWS user credentials
stored in GitHub secrets.

You can do this manually in the console, or create a separate stack that uses this construct.
You must `cdk deploy` once (with your normal AWS credentials) to have this role created for you.

You can then make note of the role arn in the stack output and send it into the Github Workflow app via
the `gitHubActionRoleArn` property. The role arn will be `arn:aws:iam::<accountId>:role/GithubActionRole`.

> [https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

#### Initializers <a name="Initializers" id="cdk-pipelines-github.GitHubActionRole.Initializer"></a>

```typescript
import { GitHubActionRole } from 'cdk-pipelines-github'

new GitHubActionRole(scope: Construct, id: string, props: GitHubActionRoleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionRole.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubActionRole.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubActionRole.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-pipelines-github.GitHubActionRoleProps">GitHubActionRoleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-pipelines-github.GitHubActionRole.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-pipelines-github.GitHubActionRole.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-pipelines-github.GitHubActionRole.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-pipelines-github.GitHubActionRoleProps">GitHubActionRoleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionRole.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-pipelines-github.GitHubActionRole.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionRole.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdk-pipelines-github.GitHubActionRole.existingGitHubActionsProvider">existingGitHubActionsProvider</a></code> | Reference an existing GitHub Actions provider. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-pipelines-github.GitHubActionRole.isConstruct"></a>

```typescript
import { GitHubActionRole } from 'cdk-pipelines-github'

GitHubActionRole.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-pipelines-github.GitHubActionRole.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `existingGitHubActionsProvider` <a name="existingGitHubActionsProvider" id="cdk-pipelines-github.GitHubActionRole.existingGitHubActionsProvider"></a>

```typescript
import { GitHubActionRole } from 'cdk-pipelines-github'

GitHubActionRole.existingGitHubActionsProvider(scope: Construct)
```

Reference an existing GitHub Actions provider.

You do not need to pass in an arn because the arn for such
a provider is always the same.

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-pipelines-github.GitHubActionRole.existingGitHubActionsProvider.parameter.scope"></a>

- *Type:* constructs.Construct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionRole.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-pipelines-github.GitHubActionRole.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The role that gets created. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-pipelines-github.GitHubActionRole.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `role`<sup>Required</sup> <a name="role" id="cdk-pipelines-github.GitHubActionRole.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

The role that gets created.

You should use the arn of this role as input to the `gitHubActionRoleArn`
property in your GitHub Workflow app.

---


### GitHubWorkflow <a name="GitHubWorkflow" id="cdk-pipelines-github.GitHubWorkflow"></a>

CDK Pipelines for GitHub workflows.

#### Initializers <a name="Initializers" id="cdk-pipelines-github.GitHubWorkflow.Initializer"></a>

```typescript
import { GitHubWorkflow } from 'cdk-pipelines-github'

new GitHubWorkflow(scope: Construct, id: string, props: GitHubWorkflowProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-pipelines-github.GitHubWorkflowProps">GitHubWorkflowProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-pipelines-github.GitHubWorkflow.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-pipelines-github.GitHubWorkflow.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-pipelines-github.GitHubWorkflow.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-pipelines-github.GitHubWorkflowProps">GitHubWorkflowProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.addStage">addStage</a></code> | Deploy a single Stage by itself. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.addWave">addWave</a></code> | Add a Wave to the pipeline, for deploying multiple Stages in parallel. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.buildPipeline">buildPipeline</a></code> | Send the current pipeline definition to the engine, and construct the pipeline. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.addStageWithGitHubOptions">addStageWithGitHubOptions</a></code> | Deploy a single Stage by itself with options for further GitHub configuration. |

---

##### `toString` <a name="toString" id="cdk-pipelines-github.GitHubWorkflow.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addStage` <a name="addStage" id="cdk-pipelines-github.GitHubWorkflow.addStage"></a>

```typescript
public addStage(stage: Stage, options?: AddStageOpts): StageDeployment
```

Deploy a single Stage by itself.

Add a Stage to the pipeline, to be deployed in sequence with other
Stages added to the pipeline. All Stacks in the stage will be deployed
in an order automatically determined by their relative dependencies.

###### `stage`<sup>Required</sup> <a name="stage" id="cdk-pipelines-github.GitHubWorkflow.addStage.parameter.stage"></a>

- *Type:* aws-cdk-lib.Stage

---

###### `options`<sup>Optional</sup> <a name="options" id="cdk-pipelines-github.GitHubWorkflow.addStage.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.AddStageOpts

---

##### `addWave` <a name="addWave" id="cdk-pipelines-github.GitHubWorkflow.addWave"></a>

```typescript
public addWave(id: string, options?: WaveOptions): Wave
```

Add a Wave to the pipeline, for deploying multiple Stages in parallel.

Use the return object of this method to deploy multiple stages in parallel.

Example:

```ts
declare const pipeline: pipelines.CodePipeline;

const wave = pipeline.addWave('MyWave');
wave.addStage(new MyApplicationStage(this, 'Stage1'));
wave.addStage(new MyApplicationStage(this, 'Stage2'));
```

###### `id`<sup>Required</sup> <a name="id" id="cdk-pipelines-github.GitHubWorkflow.addWave.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Optional</sup> <a name="options" id="cdk-pipelines-github.GitHubWorkflow.addWave.parameter.options"></a>

- *Type:* aws-cdk-lib.pipelines.WaveOptions

---

##### `buildPipeline` <a name="buildPipeline" id="cdk-pipelines-github.GitHubWorkflow.buildPipeline"></a>

```typescript
public buildPipeline(): void
```

Send the current pipeline definition to the engine, and construct the pipeline.

It is not possible to modify the pipeline after calling this method.

##### `addStageWithGitHubOptions` <a name="addStageWithGitHubOptions" id="cdk-pipelines-github.GitHubWorkflow.addStageWithGitHubOptions"></a>

```typescript
public addStageWithGitHubOptions(stage: Stage, options?: AddGitHubStageOptions): StageDeployment
```

Deploy a single Stage by itself with options for further GitHub configuration.

Add a Stage to the pipeline, to be deployed in sequence with other Stages added to the pipeline.
All Stacks in the stage will be deployed in an order automatically determined by their relative dependencies.

###### `stage`<sup>Required</sup> <a name="stage" id="cdk-pipelines-github.GitHubWorkflow.addStageWithGitHubOptions.parameter.stage"></a>

- *Type:* aws-cdk-lib.Stage

---

###### `options`<sup>Optional</sup> <a name="options" id="cdk-pipelines-github.GitHubWorkflow.addStageWithGitHubOptions.parameter.options"></a>

- *Type:* <a href="#cdk-pipelines-github.AddGitHubStageOptions">AddGitHubStageOptions</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-pipelines-github.GitHubWorkflow.isConstruct"></a>

```typescript
import { GitHubWorkflow } from 'cdk-pipelines-github'

GitHubWorkflow.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-pipelines-github.GitHubWorkflow.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.property.cloudAssemblyFileSet">cloudAssemblyFileSet</a></code> | <code>aws-cdk-lib.pipelines.FileSet</code> | The FileSet tha contains the cloud assembly. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.property.synth">synth</a></code> | <code>aws-cdk-lib.pipelines.IFileSetProducer</code> | The build step that produces the CDK Cloud Assembly. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.property.waves">waves</a></code> | <code>aws-cdk-lib.pipelines.Wave[]</code> | The waves in this pipeline. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.property.workflowFile">workflowFile</a></code> | <code><a href="#cdk-pipelines-github.YamlFile">YamlFile</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.property.workflowName">workflowName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubWorkflow.property.workflowPath">workflowPath</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-pipelines-github.GitHubWorkflow.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cloudAssemblyFileSet`<sup>Required</sup> <a name="cloudAssemblyFileSet" id="cdk-pipelines-github.GitHubWorkflow.property.cloudAssemblyFileSet"></a>

```typescript
public readonly cloudAssemblyFileSet: FileSet;
```

- *Type:* aws-cdk-lib.pipelines.FileSet

The FileSet tha contains the cloud assembly.

This is the primary output of the synth step.

---

##### `synth`<sup>Required</sup> <a name="synth" id="cdk-pipelines-github.GitHubWorkflow.property.synth"></a>

```typescript
public readonly synth: IFileSetProducer;
```

- *Type:* aws-cdk-lib.pipelines.IFileSetProducer

The build step that produces the CDK Cloud Assembly.

---

##### `waves`<sup>Required</sup> <a name="waves" id="cdk-pipelines-github.GitHubWorkflow.property.waves"></a>

```typescript
public readonly waves: Wave[];
```

- *Type:* aws-cdk-lib.pipelines.Wave[]

The waves in this pipeline.

---

##### `workflowFile`<sup>Required</sup> <a name="workflowFile" id="cdk-pipelines-github.GitHubWorkflow.property.workflowFile"></a>

```typescript
public readonly workflowFile: YamlFile;
```

- *Type:* <a href="#cdk-pipelines-github.YamlFile">YamlFile</a>

---

##### `workflowName`<sup>Required</sup> <a name="workflowName" id="cdk-pipelines-github.GitHubWorkflow.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string

---

##### `workflowPath`<sup>Required</sup> <a name="workflowPath" id="cdk-pipelines-github.GitHubWorkflow.property.workflowPath"></a>

```typescript
public readonly workflowPath: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### AddGitHubStageOptions <a name="AddGitHubStageOptions" id="cdk-pipelines-github.AddGitHubStageOptions"></a>

Options to pass to `addStageWithGitHubOpts`.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.AddGitHubStageOptions.Initializer"></a>

```typescript
import { AddGitHubStageOptions } from 'cdk-pipelines-github'

const addGitHubStageOptions: AddGitHubStageOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.AddGitHubStageOptions.property.post">post</a></code> | <code>aws-cdk-lib.pipelines.Step[]</code> | Additional steps to run after all of the stacks in the stage. |
| <code><a href="#cdk-pipelines-github.AddGitHubStageOptions.property.pre">pre</a></code> | <code>aws-cdk-lib.pipelines.Step[]</code> | Additional steps to run before any of the stacks in the stage. |
| <code><a href="#cdk-pipelines-github.AddGitHubStageOptions.property.stackSteps">stackSteps</a></code> | <code>aws-cdk-lib.pipelines.StackSteps[]</code> | Instructions for stack level steps. |
| <code><a href="#cdk-pipelines-github.AddGitHubStageOptions.property.gitHubEnvironment">gitHubEnvironment</a></code> | <code>string</code> | Run the stage in a specific GitHub Environment. |
| <code><a href="#cdk-pipelines-github.AddGitHubStageOptions.property.jobSettings">jobSettings</a></code> | <code><a href="#cdk-pipelines-github.JobSettings">JobSettings</a></code> | Job level settings that will be applied to all jobs in the stage. |
| <code><a href="#cdk-pipelines-github.AddGitHubStageOptions.property.stackCapabilities">stackCapabilities</a></code> | <code><a href="#cdk-pipelines-github.StackCapabilities">StackCapabilities</a>[]</code> | In some cases, you must explicitly acknowledge that your CloudFormation stack template contains certain capabilities in order for CloudFormation to create the stack. |

---

##### `post`<sup>Optional</sup> <a name="post" id="cdk-pipelines-github.AddGitHubStageOptions.property.post"></a>

```typescript
public readonly post: Step[];
```

- *Type:* aws-cdk-lib.pipelines.Step[]
- *Default:* No additional steps

Additional steps to run after all of the stacks in the stage.

---

##### `pre`<sup>Optional</sup> <a name="pre" id="cdk-pipelines-github.AddGitHubStageOptions.property.pre"></a>

```typescript
public readonly pre: Step[];
```

- *Type:* aws-cdk-lib.pipelines.Step[]
- *Default:* No additional steps

Additional steps to run before any of the stacks in the stage.

---

##### `stackSteps`<sup>Optional</sup> <a name="stackSteps" id="cdk-pipelines-github.AddGitHubStageOptions.property.stackSteps"></a>

```typescript
public readonly stackSteps: StackSteps[];
```

- *Type:* aws-cdk-lib.pipelines.StackSteps[]
- *Default:* No additional instructions

Instructions for stack level steps.

---

##### `gitHubEnvironment`<sup>Optional</sup> <a name="gitHubEnvironment" id="cdk-pipelines-github.AddGitHubStageOptions.property.gitHubEnvironment"></a>

```typescript
public readonly gitHubEnvironment: string;
```

- *Type:* string
- *Default:* no GitHub environment

Run the stage in a specific GitHub Environment.

If specified,
any protection rules configured for the environment must pass
before the job is set to a runner. For example, if the environment
has a manual approval rule configured, then the workflow will
wait for the approval before sending the job to the runner.

Running a workflow that references an environment that does not
exist will create an environment with the referenced name.

> [https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

---

##### `jobSettings`<sup>Optional</sup> <a name="jobSettings" id="cdk-pipelines-github.AddGitHubStageOptions.property.jobSettings"></a>

```typescript
public readonly jobSettings: JobSettings;
```

- *Type:* <a href="#cdk-pipelines-github.JobSettings">JobSettings</a>

Job level settings that will be applied to all jobs in the stage.

Currently the only valid setting is 'if'.

---

##### `stackCapabilities`<sup>Optional</sup> <a name="stackCapabilities" id="cdk-pipelines-github.AddGitHubStageOptions.property.stackCapabilities"></a>

```typescript
public readonly stackCapabilities: StackCapabilities[];
```

- *Type:* <a href="#cdk-pipelines-github.StackCapabilities">StackCapabilities</a>[]
- *Default:* ['CAPABILITY_IAM']

In some cases, you must explicitly acknowledge that your CloudFormation stack template contains certain capabilities in order for CloudFormation to create the stack.

If insufficiently specified, CloudFormation returns an `InsufficientCapabilities`
error.

---

### AwsCredentialsSecrets <a name="AwsCredentialsSecrets" id="cdk-pipelines-github.AwsCredentialsSecrets"></a>

Names of secrets for AWS credentials.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.AwsCredentialsSecrets.Initializer"></a>

```typescript
import { AwsCredentialsSecrets } from 'cdk-pipelines-github'

const awsCredentialsSecrets: AwsCredentialsSecrets = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.AwsCredentialsSecrets.property.accessKeyId">accessKeyId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.AwsCredentialsSecrets.property.secretAccessKey">secretAccessKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.AwsCredentialsSecrets.property.sessionToken">sessionToken</a></code> | <code>string</code> | *No description.* |

---

##### `accessKeyId`<sup>Optional</sup> <a name="accessKeyId" id="cdk-pipelines-github.AwsCredentialsSecrets.property.accessKeyId"></a>

```typescript
public readonly accessKeyId: string;
```

- *Type:* string
- *Default:* "AWS_ACCESS_KEY_ID"

---

##### `secretAccessKey`<sup>Optional</sup> <a name="secretAccessKey" id="cdk-pipelines-github.AwsCredentialsSecrets.property.secretAccessKey"></a>

```typescript
public readonly secretAccessKey: string;
```

- *Type:* string
- *Default:* "AWS_SECRET_ACCESS_KEY"

---

##### `sessionToken`<sup>Optional</sup> <a name="sessionToken" id="cdk-pipelines-github.AwsCredentialsSecrets.property.sessionToken"></a>

```typescript
public readonly sessionToken: string;
```

- *Type:* string
- *Default:* no session token is used

---

### CheckRunOptions <a name="CheckRunOptions" id="cdk-pipelines-github.CheckRunOptions"></a>

Check run options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.CheckRunOptions.Initializer"></a>

```typescript
import { CheckRunOptions } from 'cdk-pipelines-github'

const checkRunOptions: CheckRunOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.CheckRunOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.CheckRunOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### CheckSuiteOptions <a name="CheckSuiteOptions" id="cdk-pipelines-github.CheckSuiteOptions"></a>

Check suite options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.CheckSuiteOptions.Initializer"></a>

```typescript
import { CheckSuiteOptions } from 'cdk-pipelines-github'

const checkSuiteOptions: CheckSuiteOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.CheckSuiteOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.CheckSuiteOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### ContainerCredentials <a name="ContainerCredentials" id="cdk-pipelines-github.ContainerCredentials"></a>

Credentials to use to authenticate to Docker registries.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.ContainerCredentials.Initializer"></a>

```typescript
import { ContainerCredentials } from 'cdk-pipelines-github'

const containerCredentials: ContainerCredentials = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.ContainerCredentials.property.password">password</a></code> | <code>string</code> | The password. |
| <code><a href="#cdk-pipelines-github.ContainerCredentials.property.username">username</a></code> | <code>string</code> | The username. |

---

##### `password`<sup>Required</sup> <a name="password" id="cdk-pipelines-github.ContainerCredentials.property.password"></a>

```typescript
public readonly password: string;
```

- *Type:* string

The password.

---

##### `username`<sup>Required</sup> <a name="username" id="cdk-pipelines-github.ContainerCredentials.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

The username.

---

### ContainerOptions <a name="ContainerOptions" id="cdk-pipelines-github.ContainerOptions"></a>

Options petaining to container environments.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.ContainerOptions.Initializer"></a>

```typescript
import { ContainerOptions } from 'cdk-pipelines-github'

const containerOptions: ContainerOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.ContainerOptions.property.image">image</a></code> | <code>string</code> | The Docker image to use as the container to run the action. |
| <code><a href="#cdk-pipelines-github.ContainerOptions.property.credentials">credentials</a></code> | <code><a href="#cdk-pipelines-github.ContainerCredentials">ContainerCredentials</a></code> | f the image's container registry requires authentication to pull the image, you can use credentials to set a map of the username and password. |
| <code><a href="#cdk-pipelines-github.ContainerOptions.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Sets a map of environment variables in the container. |
| <code><a href="#cdk-pipelines-github.ContainerOptions.property.options">options</a></code> | <code>string[]</code> | Additional Docker container resource options. |
| <code><a href="#cdk-pipelines-github.ContainerOptions.property.ports">ports</a></code> | <code>number[]</code> | Sets an array of ports to expose on the container. |
| <code><a href="#cdk-pipelines-github.ContainerOptions.property.volumes">volumes</a></code> | <code>string[]</code> | Sets an array of volumes for the container to use. |

---

##### `image`<sup>Required</sup> <a name="image" id="cdk-pipelines-github.ContainerOptions.property.image"></a>

```typescript
public readonly image: string;
```

- *Type:* string

The Docker image to use as the container to run the action.

The value can
be the Docker Hub image name or a registry name.

---

##### `credentials`<sup>Optional</sup> <a name="credentials" id="cdk-pipelines-github.ContainerOptions.property.credentials"></a>

```typescript
public readonly credentials: ContainerCredentials;
```

- *Type:* <a href="#cdk-pipelines-github.ContainerCredentials">ContainerCredentials</a>

f the image's container registry requires authentication to pull the image, you can use credentials to set a map of the username and password.

The credentials are the same values that you would provide to the docker
login command.

---

##### `env`<sup>Optional</sup> <a name="env" id="cdk-pipelines-github.ContainerOptions.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Sets a map of environment variables in the container.

---

##### `options`<sup>Optional</sup> <a name="options" id="cdk-pipelines-github.ContainerOptions.property.options"></a>

```typescript
public readonly options: string[];
```

- *Type:* string[]

Additional Docker container resource options.

> [https://docs.docker.com/engine/reference/commandline/create/#options](https://docs.docker.com/engine/reference/commandline/create/#options)

---

##### `ports`<sup>Optional</sup> <a name="ports" id="cdk-pipelines-github.ContainerOptions.property.ports"></a>

```typescript
public readonly ports: number[];
```

- *Type:* number[]

Sets an array of ports to expose on the container.

---

##### `volumes`<sup>Optional</sup> <a name="volumes" id="cdk-pipelines-github.ContainerOptions.property.volumes"></a>

```typescript
public readonly volumes: string[];
```

- *Type:* string[]

Sets an array of volumes for the container to use.

You can use volumes to
share data between services or other steps in a job. You can specify
named Docker volumes, anonymous Docker volumes, or bind mounts on the
host.

To specify a volume, you specify the source and destination path:
`<source>:<destinationPath>`.

---

### CreateOptions <a name="CreateOptions" id="cdk-pipelines-github.CreateOptions"></a>

The Create event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.CreateOptions.Initializer"></a>

```typescript
import { CreateOptions } from 'cdk-pipelines-github'

const createOptions: CreateOptions = { ... }
```


### CronScheduleOptions <a name="CronScheduleOptions" id="cdk-pipelines-github.CronScheduleOptions"></a>

CRON schedule options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.CronScheduleOptions.Initializer"></a>

```typescript
import { CronScheduleOptions } from 'cdk-pipelines-github'

const cronScheduleOptions: CronScheduleOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.CronScheduleOptions.property.cron">cron</a></code> | <code>string</code> | *No description.* |

---

##### `cron`<sup>Required</sup> <a name="cron" id="cdk-pipelines-github.CronScheduleOptions.property.cron"></a>

```typescript
public readonly cron: string;
```

- *Type:* string

> [https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07)

---

### DeleteOptions <a name="DeleteOptions" id="cdk-pipelines-github.DeleteOptions"></a>

The Delete event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.DeleteOptions.Initializer"></a>

```typescript
import { DeleteOptions } from 'cdk-pipelines-github'

const deleteOptions: DeleteOptions = { ... }
```


### DeploymentOptions <a name="DeploymentOptions" id="cdk-pipelines-github.DeploymentOptions"></a>

The Deployment event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.DeploymentOptions.Initializer"></a>

```typescript
import { DeploymentOptions } from 'cdk-pipelines-github'

const deploymentOptions: DeploymentOptions = { ... }
```


### DeploymentStatusOptions <a name="DeploymentStatusOptions" id="cdk-pipelines-github.DeploymentStatusOptions"></a>

The Deployment status event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.DeploymentStatusOptions.Initializer"></a>

```typescript
import { DeploymentStatusOptions } from 'cdk-pipelines-github'

const deploymentStatusOptions: DeploymentStatusOptions = { ... }
```


### DockerHubCredentialSecrets <a name="DockerHubCredentialSecrets" id="cdk-pipelines-github.DockerHubCredentialSecrets"></a>

Locations of GitHub Secrets used to authenticate to DockerHub.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.DockerHubCredentialSecrets.Initializer"></a>

```typescript
import { DockerHubCredentialSecrets } from 'cdk-pipelines-github'

const dockerHubCredentialSecrets: DockerHubCredentialSecrets = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.DockerHubCredentialSecrets.property.personalAccessTokenKey">personalAccessTokenKey</a></code> | <code>string</code> | The key of the GitHub Secret containing the DockerHub personal access token. |
| <code><a href="#cdk-pipelines-github.DockerHubCredentialSecrets.property.usernameKey">usernameKey</a></code> | <code>string</code> | The key of the GitHub Secret containing the DockerHub username. |

---

##### `personalAccessTokenKey`<sup>Optional</sup> <a name="personalAccessTokenKey" id="cdk-pipelines-github.DockerHubCredentialSecrets.property.personalAccessTokenKey"></a>

```typescript
public readonly personalAccessTokenKey: string;
```

- *Type:* string
- *Default:* 'DOCKERHUB_TOKEN'

The key of the GitHub Secret containing the DockerHub personal access token.

---

##### `usernameKey`<sup>Optional</sup> <a name="usernameKey" id="cdk-pipelines-github.DockerHubCredentialSecrets.property.usernameKey"></a>

```typescript
public readonly usernameKey: string;
```

- *Type:* string
- *Default:* 'DOCKERHUB_USERNAME'

The key of the GitHub Secret containing the DockerHub username.

---

### ExternalDockerCredentialSecrets <a name="ExternalDockerCredentialSecrets" id="cdk-pipelines-github.ExternalDockerCredentialSecrets"></a>

Generic structure to supply the locations of GitHub Secrets used to authenticate to a docker registry.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.ExternalDockerCredentialSecrets.Initializer"></a>

```typescript
import { ExternalDockerCredentialSecrets } from 'cdk-pipelines-github'

const externalDockerCredentialSecrets: ExternalDockerCredentialSecrets = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.ExternalDockerCredentialSecrets.property.passwordKey">passwordKey</a></code> | <code>string</code> | The key of the GitHub Secret containing your registry password. |
| <code><a href="#cdk-pipelines-github.ExternalDockerCredentialSecrets.property.usernameKey">usernameKey</a></code> | <code>string</code> | The key of the GitHub Secret containing your registry username. |

---

##### `passwordKey`<sup>Required</sup> <a name="passwordKey" id="cdk-pipelines-github.ExternalDockerCredentialSecrets.property.passwordKey"></a>

```typescript
public readonly passwordKey: string;
```

- *Type:* string

The key of the GitHub Secret containing your registry password.

---

##### `usernameKey`<sup>Required</sup> <a name="usernameKey" id="cdk-pipelines-github.ExternalDockerCredentialSecrets.property.usernameKey"></a>

```typescript
public readonly usernameKey: string;
```

- *Type:* string

The key of the GitHub Secret containing your registry username.

---

### ForkOptions <a name="ForkOptions" id="cdk-pipelines-github.ForkOptions"></a>

The Fork event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.ForkOptions.Initializer"></a>

```typescript
import { ForkOptions } from 'cdk-pipelines-github'

const forkOptions: ForkOptions = { ... }
```


### GitHubActionRoleProps <a name="GitHubActionRoleProps" id="cdk-pipelines-github.GitHubActionRoleProps"></a>

Properties for the GitHubActionRole construct.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.GitHubActionRoleProps.Initializer"></a>

```typescript
import { GitHubActionRoleProps } from 'cdk-pipelines-github'

const gitHubActionRoleProps: GitHubActionRoleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionRoleProps.property.repos">repos</a></code> | <code>string[]</code> | A list of GitHub repositories you want to be able to access the IAM role. |
| <code><a href="#cdk-pipelines-github.GitHubActionRoleProps.property.provider">provider</a></code> | <code>aws-cdk-lib.aws_iam.IOpenIdConnectProvider</code> | The GitHub OpenId Connect Provider. Must have provider url `https://token.actions.githubusercontent.com`. The audience must be `sts:amazonaws.com`. |
| <code><a href="#cdk-pipelines-github.GitHubActionRoleProps.property.roleName">roleName</a></code> | <code>string</code> | The name of the Oidc role. |

---

##### `repos`<sup>Required</sup> <a name="repos" id="cdk-pipelines-github.GitHubActionRoleProps.property.repos"></a>

```typescript
public readonly repos: string[];
```

- *Type:* string[]

A list of GitHub repositories you want to be able to access the IAM role.

Each entry should be your GitHub username and repository passed in as a
single string.

For example, `['owner/repo1', 'owner/repo2'].

---

##### `provider`<sup>Optional</sup> <a name="provider" id="cdk-pipelines-github.GitHubActionRoleProps.property.provider"></a>

```typescript
public readonly provider: IOpenIdConnectProvider;
```

- *Type:* aws-cdk-lib.aws_iam.IOpenIdConnectProvider
- *Default:* a provider is created for you.

The GitHub OpenId Connect Provider. Must have provider url `https://token.actions.githubusercontent.com`. The audience must be `sts:amazonaws.com`.

Only one such provider can be defined per account, so if you already
have a provider with the same url, a new provider cannot be created for you.

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="cdk-pipelines-github.GitHubActionRoleProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string
- *Default:* 'GitHubActionRole'

The name of the Oidc role.

---

### GitHubActionStepProps <a name="GitHubActionStepProps" id="cdk-pipelines-github.GitHubActionStepProps"></a>

#### Initializer <a name="Initializer" id="cdk-pipelines-github.GitHubActionStepProps.Initializer"></a>

```typescript
import { GitHubActionStepProps } from 'cdk-pipelines-github'

const gitHubActionStepProps: GitHubActionStepProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionStepProps.property.jobSteps">jobSteps</a></code> | <code><a href="#cdk-pipelines-github.JobStep">JobStep</a>[]</code> | The Job steps. |
| <code><a href="#cdk-pipelines-github.GitHubActionStepProps.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Environment variables to set. |

---

##### `jobSteps`<sup>Required</sup> <a name="jobSteps" id="cdk-pipelines-github.GitHubActionStepProps.property.jobSteps"></a>

```typescript
public readonly jobSteps: JobStep[];
```

- *Type:* <a href="#cdk-pipelines-github.JobStep">JobStep</a>[]

The Job steps.

---

##### `env`<sup>Optional</sup> <a name="env" id="cdk-pipelines-github.GitHubActionStepProps.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Environment variables to set.

---

### GitHubSecretsProviderProps <a name="GitHubSecretsProviderProps" id="cdk-pipelines-github.GitHubSecretsProviderProps"></a>

Locations of GitHub Secrets used to authenticate to AWS.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.GitHubSecretsProviderProps.Initializer"></a>

```typescript
import { GitHubSecretsProviderProps } from 'cdk-pipelines-github'

const gitHubSecretsProviderProps: GitHubSecretsProviderProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubSecretsProviderProps.property.accessKeyId">accessKeyId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubSecretsProviderProps.property.secretAccessKey">secretAccessKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubSecretsProviderProps.property.sessionToken">sessionToken</a></code> | <code>string</code> | *No description.* |

---

##### `accessKeyId`<sup>Required</sup> <a name="accessKeyId" id="cdk-pipelines-github.GitHubSecretsProviderProps.property.accessKeyId"></a>

```typescript
public readonly accessKeyId: string;
```

- *Type:* string
- *Default:* "AWS_ACCESS_KEY_ID"

---

##### `secretAccessKey`<sup>Required</sup> <a name="secretAccessKey" id="cdk-pipelines-github.GitHubSecretsProviderProps.property.secretAccessKey"></a>

```typescript
public readonly secretAccessKey: string;
```

- *Type:* string
- *Default:* "AWS_SECRET_ACCESS_KEY"

---

##### `sessionToken`<sup>Optional</sup> <a name="sessionToken" id="cdk-pipelines-github.GitHubSecretsProviderProps.property.sessionToken"></a>

```typescript
public readonly sessionToken: string;
```

- *Type:* string
- *Default:* no session token is used

---

### GitHubWorkflowProps <a name="GitHubWorkflowProps" id="cdk-pipelines-github.GitHubWorkflowProps"></a>

Props for `GitHubWorkflow`.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.GitHubWorkflowProps.Initializer"></a>

```typescript
import { GitHubWorkflowProps } from 'cdk-pipelines-github'

const gitHubWorkflowProps: GitHubWorkflowProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.synth">synth</a></code> | <code>aws-cdk-lib.pipelines.IFileSetProducer</code> | The build step that produces the CDK Cloud Assembly. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.awsCredentials">awsCredentials</a></code> | <code><a href="#cdk-pipelines-github.AwsCredentialsSecrets">AwsCredentialsSecrets</a></code> | Names of GitHub repository secrets that include AWS credentials for deployment. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.awsCreds">awsCreds</a></code> | <code><a href="#cdk-pipelines-github.AwsCredentialsProvider">AwsCredentialsProvider</a></code> | Configure provider for AWS credentials used for deployment. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.buildContainer">buildContainer</a></code> | <code><a href="#cdk-pipelines-github.ContainerOptions">ContainerOptions</a></code> | Build container options. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.cdkCliVersion">cdkCliVersion</a></code> | <code>string</code> | Version of the CDK CLI to use. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.dockerCredentials">dockerCredentials</a></code> | <code><a href="#cdk-pipelines-github.DockerCredential">DockerCredential</a>[]</code> | The Docker Credentials to use to login. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.gitHubActionRoleArn">gitHubActionRoleArn</a></code> | <code>string</code> | A role that utilizes the GitHub OIDC Identity Provider in your AWS account. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.jobSettings">jobSettings</a></code> | <code><a href="#cdk-pipelines-github.JobSettings">JobSettings</a></code> | Job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.postBuildSteps">postBuildSteps</a></code> | <code><a href="#cdk-pipelines-github.JobStep">JobStep</a>[]</code> | GitHub workflow steps to execute after build. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.preBuildSteps">preBuildSteps</a></code> | <code><a href="#cdk-pipelines-github.JobStep">JobStep</a>[]</code> | GitHub workflow steps to execute before build. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.preSynthed">preSynthed</a></code> | <code>boolean</code> | Indicates if the repository already contains a synthesized `cdk.out` directory, in which case we will simply checkout the repo in jobs that require `cdk.out`. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.publishAssetsAuthRegion">publishAssetsAuthRegion</a></code> | <code>string</code> | Will assume the GitHubActionRole in this region when publishing assets. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.runner">runner</a></code> | <code><a href="#cdk-pipelines-github.Runner">Runner</a></code> | The type of runner to run the job on. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.workflowName">workflowName</a></code> | <code>string</code> | Name of the workflow. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.workflowPath">workflowPath</a></code> | <code>string</code> | File path for the GitHub workflow. |
| <code><a href="#cdk-pipelines-github.GitHubWorkflowProps.property.workflowTriggers">workflowTriggers</a></code> | <code><a href="#cdk-pipelines-github.WorkflowTriggers">WorkflowTriggers</a></code> | GitHub workflow triggers. |

---

##### `synth`<sup>Required</sup> <a name="synth" id="cdk-pipelines-github.GitHubWorkflowProps.property.synth"></a>

```typescript
public readonly synth: IFileSetProducer;
```

- *Type:* aws-cdk-lib.pipelines.IFileSetProducer

The build step that produces the CDK Cloud Assembly.

The primary output of this step needs to be the `cdk.out` directory
generated by the `cdk synth` command.

If you use a `ShellStep` here and you don't configure an output directory,
the output directory will automatically be assumed to be `cdk.out`.

---

##### ~~`awsCredentials`~~<sup>Optional</sup> <a name="awsCredentials" id="cdk-pipelines-github.GitHubWorkflowProps.property.awsCredentials"></a>

- *Deprecated:* Use `awsCreds.fromGitHubSecrets()` instead.

```typescript
public readonly awsCredentials: AwsCredentialsSecrets;
```

- *Type:* <a href="#cdk-pipelines-github.AwsCredentialsSecrets">AwsCredentialsSecrets</a>
- *Default:* `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

Names of GitHub repository secrets that include AWS credentials for deployment.

---

##### `awsCreds`<sup>Optional</sup> <a name="awsCreds" id="cdk-pipelines-github.GitHubWorkflowProps.property.awsCreds"></a>

```typescript
public readonly awsCreds: AwsCredentialsProvider;
```

- *Type:* <a href="#cdk-pipelines-github.AwsCredentialsProvider">AwsCredentialsProvider</a>
- *Default:* Get AWS credentials from GitHub secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

Configure provider for AWS credentials used for deployment.

---

##### `buildContainer`<sup>Optional</sup> <a name="buildContainer" id="cdk-pipelines-github.GitHubWorkflowProps.property.buildContainer"></a>

```typescript
public readonly buildContainer: ContainerOptions;
```

- *Type:* <a href="#cdk-pipelines-github.ContainerOptions">ContainerOptions</a>
- *Default:* GitHub defaults

Build container options.

---

##### `cdkCliVersion`<sup>Optional</sup> <a name="cdkCliVersion" id="cdk-pipelines-github.GitHubWorkflowProps.property.cdkCliVersion"></a>

```typescript
public readonly cdkCliVersion: string;
```

- *Type:* string
- *Default:* automatic

Version of the CDK CLI to use.

---

##### `dockerCredentials`<sup>Optional</sup> <a name="dockerCredentials" id="cdk-pipelines-github.GitHubWorkflowProps.property.dockerCredentials"></a>

```typescript
public readonly dockerCredentials: DockerCredential[];
```

- *Type:* <a href="#cdk-pipelines-github.DockerCredential">DockerCredential</a>[]

The Docker Credentials to use to login.

If you set this variable,
you will be logged in to docker when you upload Docker Assets.

---

##### ~~`gitHubActionRoleArn`~~<sup>Optional</sup> <a name="gitHubActionRoleArn" id="cdk-pipelines-github.GitHubWorkflowProps.property.gitHubActionRoleArn"></a>

- *Deprecated:* Use `awsCreds.fromOpenIdConnect()` instead.

```typescript
public readonly gitHubActionRoleArn: string;
```

- *Type:* string
- *Default:* GitHub repository secrets are used instead of OpenId Connect role.

A role that utilizes the GitHub OIDC Identity Provider in your AWS account.

If supplied, this will be used instead of `awsCredentials`.

You can create your own role in the console with the necessary trust policy
to allow gitHub actions from your gitHub repository to assume the role, or
you can utilize the `GitHubActionRole` construct to create a role for you.

---

##### `jobSettings`<sup>Optional</sup> <a name="jobSettings" id="cdk-pipelines-github.GitHubWorkflowProps.property.jobSettings"></a>

```typescript
public readonly jobSettings: JobSettings;
```

- *Type:* <a href="#cdk-pipelines-github.JobSettings">JobSettings</a>

Job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs.

Currently the only valid setting
is 'if'. You can use this to run jobs only in specific repositories.

> [https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-only-run-job-for-specific-repository)

---

##### `postBuildSteps`<sup>Optional</sup> <a name="postBuildSteps" id="cdk-pipelines-github.GitHubWorkflowProps.property.postBuildSteps"></a>

```typescript
public readonly postBuildSteps: JobStep[];
```

- *Type:* <a href="#cdk-pipelines-github.JobStep">JobStep</a>[]
- *Default:* []

GitHub workflow steps to execute after build.

---

##### `preBuildSteps`<sup>Optional</sup> <a name="preBuildSteps" id="cdk-pipelines-github.GitHubWorkflowProps.property.preBuildSteps"></a>

```typescript
public readonly preBuildSteps: JobStep[];
```

- *Type:* <a href="#cdk-pipelines-github.JobStep">JobStep</a>[]
- *Default:* []

GitHub workflow steps to execute before build.

---

##### `preSynthed`<sup>Optional</sup> <a name="preSynthed" id="cdk-pipelines-github.GitHubWorkflowProps.property.preSynthed"></a>

```typescript
public readonly preSynthed: boolean;
```

- *Type:* boolean
- *Default:* false

Indicates if the repository already contains a synthesized `cdk.out` directory, in which case we will simply checkout the repo in jobs that require `cdk.out`.

---

##### `publishAssetsAuthRegion`<sup>Optional</sup> <a name="publishAssetsAuthRegion" id="cdk-pipelines-github.GitHubWorkflowProps.property.publishAssetsAuthRegion"></a>

```typescript
public readonly publishAssetsAuthRegion: string;
```

- *Type:* string
- *Default:* "us-west-2"

Will assume the GitHubActionRole in this region when publishing assets.

This is NOT the region in which the assets are published.

In most cases, you do not have to worry about this property, and can safely
ignore it.

---

##### `runner`<sup>Optional</sup> <a name="runner" id="cdk-pipelines-github.GitHubWorkflowProps.property.runner"></a>

```typescript
public readonly runner: Runner;
```

- *Type:* <a href="#cdk-pipelines-github.Runner">Runner</a>
- *Default:* Runner.UBUNTU_LATEST

The type of runner to run the job on.

The runner can be either a
GitHub-hosted runner or a self-hosted runner.

---

##### `workflowName`<sup>Optional</sup> <a name="workflowName" id="cdk-pipelines-github.GitHubWorkflowProps.property.workflowName"></a>

```typescript
public readonly workflowName: string;
```

- *Type:* string
- *Default:* "deploy"

Name of the workflow.

---

##### `workflowPath`<sup>Optional</sup> <a name="workflowPath" id="cdk-pipelines-github.GitHubWorkflowProps.property.workflowPath"></a>

```typescript
public readonly workflowPath: string;
```

- *Type:* string
- *Default:* ".github/workflows/deploy.yml"

File path for the GitHub workflow.

---

##### `workflowTriggers`<sup>Optional</sup> <a name="workflowTriggers" id="cdk-pipelines-github.GitHubWorkflowProps.property.workflowTriggers"></a>

```typescript
public readonly workflowTriggers: WorkflowTriggers;
```

- *Type:* <a href="#cdk-pipelines-github.WorkflowTriggers">WorkflowTriggers</a>
- *Default:* By default, workflow is triggered on push to the `main` branch and can also be triggered manually (`workflow_dispatch`).

GitHub workflow triggers.

---

### GollumOptions <a name="GollumOptions" id="cdk-pipelines-github.GollumOptions"></a>

The Gollum event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.GollumOptions.Initializer"></a>

```typescript
import { GollumOptions } from 'cdk-pipelines-github'

const gollumOptions: GollumOptions = { ... }
```


### IssueCommentOptions <a name="IssueCommentOptions" id="cdk-pipelines-github.IssueCommentOptions"></a>

Issue comment options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.IssueCommentOptions.Initializer"></a>

```typescript
import { IssueCommentOptions } from 'cdk-pipelines-github'

const issueCommentOptions: IssueCommentOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.IssueCommentOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.IssueCommentOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### IssuesOptions <a name="IssuesOptions" id="cdk-pipelines-github.IssuesOptions"></a>

Issues options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.IssuesOptions.Initializer"></a>

```typescript
import { IssuesOptions } from 'cdk-pipelines-github'

const issuesOptions: IssuesOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.IssuesOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.IssuesOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### Job <a name="Job" id="cdk-pipelines-github.Job"></a>

A GitHub Workflow job definition.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.Job.Initializer"></a>

```typescript
import { Job } from 'cdk-pipelines-github'

const job: Job = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.Job.property.permissions">permissions</a></code> | <code><a href="#cdk-pipelines-github.JobPermissions">JobPermissions</a></code> | You can modify the default permissions granted to the GITHUB_TOKEN, adding or removing access as required, so that you only allow the minimum required access. |
| <code><a href="#cdk-pipelines-github.Job.property.runsOn">runsOn</a></code> | <code>string \| string[]</code> | The type of machine to run the job on. |
| <code><a href="#cdk-pipelines-github.Job.property.steps">steps</a></code> | <code><a href="#cdk-pipelines-github.JobStep">JobStep</a>[]</code> | A job contains a sequence of tasks called steps. |
| <code><a href="#cdk-pipelines-github.Job.property.concurrency">concurrency</a></code> | <code>any</code> | Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time. |
| <code><a href="#cdk-pipelines-github.Job.property.container">container</a></code> | <code><a href="#cdk-pipelines-github.ContainerOptions">ContainerOptions</a></code> | A container to run any steps in a job that don't already specify a container. |
| <code><a href="#cdk-pipelines-github.Job.property.continueOnError">continueOnError</a></code> | <code>boolean</code> | Prevents a workflow run from failing when a job fails. |
| <code><a href="#cdk-pipelines-github.Job.property.defaults">defaults</a></code> | <code><a href="#cdk-pipelines-github.JobDefaults">JobDefaults</a></code> | A map of default settings that will apply to all steps in the job. |
| <code><a href="#cdk-pipelines-github.Job.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | A map of environment variables that are available to all steps in the job. |
| <code><a href="#cdk-pipelines-github.Job.property.environment">environment</a></code> | <code>any</code> | The environment that the job references. |
| <code><a href="#cdk-pipelines-github.Job.property.if">if</a></code> | <code>string</code> | You can use the if conditional to prevent a job from running unless a condition is met. |
| <code><a href="#cdk-pipelines-github.Job.property.name">name</a></code> | <code>string</code> | The name of the job displayed on GitHub. |
| <code><a href="#cdk-pipelines-github.Job.property.needs">needs</a></code> | <code>string[]</code> | Identifies any jobs that must complete successfully before this job will run. |
| <code><a href="#cdk-pipelines-github.Job.property.outputs">outputs</a></code> | <code>{[ key: string ]: string}</code> | A map of outputs for a job. |
| <code><a href="#cdk-pipelines-github.Job.property.services">services</a></code> | <code>{[ key: string ]: <a href="#cdk-pipelines-github.ContainerOptions">ContainerOptions</a>}</code> | Used to host service containers for a job in a workflow. |
| <code><a href="#cdk-pipelines-github.Job.property.strategy">strategy</a></code> | <code><a href="#cdk-pipelines-github.JobStrategy">JobStrategy</a></code> | A strategy creates a build matrix for your jobs. |
| <code><a href="#cdk-pipelines-github.Job.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | The maximum number of minutes to let a job run before GitHub automatically cancels it. |

---

##### `permissions`<sup>Required</sup> <a name="permissions" id="cdk-pipelines-github.Job.property.permissions"></a>

```typescript
public readonly permissions: JobPermissions;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermissions">JobPermissions</a>

You can modify the default permissions granted to the GITHUB_TOKEN, adding or removing access as required, so that you only allow the minimum required access.

Use `{ contents: READ }` if your job only needs to clone code.

This is intentionally a required field since it is required in order to
allow workflows to run in GitHub repositories with restricted default
access.

> [https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token)

---

##### `runsOn`<sup>Required</sup> <a name="runsOn" id="cdk-pipelines-github.Job.property.runsOn"></a>

```typescript
public readonly runsOn: string | string[];
```

- *Type:* string | string[]

The type of machine to run the job on.

The machine can be either a
GitHub-hosted runner or a self-hosted runner.

---

*Example*

```typescript
["ubuntu-latest"]
```


##### `steps`<sup>Required</sup> <a name="steps" id="cdk-pipelines-github.Job.property.steps"></a>

```typescript
public readonly steps: JobStep[];
```

- *Type:* <a href="#cdk-pipelines-github.JobStep">JobStep</a>[]

A job contains a sequence of tasks called steps.

Steps can run commands,
run setup tasks, or run an action in your repository, a public repository,
or an action published in a Docker registry. Not all steps run actions,
but all actions run as a step. Each step runs in its own process in the
runner environment and has access to the workspace and filesystem.
Because steps run in their own process, changes to environment variables
are not preserved between steps. GitHub provides built-in steps to set up
and complete a job.

---

##### `concurrency`<sup>Optional</sup> <a name="concurrency" id="cdk-pipelines-github.Job.property.concurrency"></a>

```typescript
public readonly concurrency: any;
```

- *Type:* any

Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time.

A concurrency group can be any
string or expression. The expression can use any context except for the
secrets context.

---

##### `container`<sup>Optional</sup> <a name="container" id="cdk-pipelines-github.Job.property.container"></a>

```typescript
public readonly container: ContainerOptions;
```

- *Type:* <a href="#cdk-pipelines-github.ContainerOptions">ContainerOptions</a>

A container to run any steps in a job that don't already specify a container.

If you have steps that use both script and container actions,
the container actions will run as sibling containers on the same network
with the same volume mounts.

---

##### `continueOnError`<sup>Optional</sup> <a name="continueOnError" id="cdk-pipelines-github.Job.property.continueOnError"></a>

```typescript
public readonly continueOnError: boolean;
```

- *Type:* boolean

Prevents a workflow run from failing when a job fails.

Set to true to
allow a workflow run to pass when this job fails.

---

##### `defaults`<sup>Optional</sup> <a name="defaults" id="cdk-pipelines-github.Job.property.defaults"></a>

```typescript
public readonly defaults: JobDefaults;
```

- *Type:* <a href="#cdk-pipelines-github.JobDefaults">JobDefaults</a>

A map of default settings that will apply to all steps in the job.

You
can also set default settings for the entire workflow.

---

##### `env`<sup>Optional</sup> <a name="env" id="cdk-pipelines-github.Job.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A map of environment variables that are available to all steps in the job.

You can also set environment variables for the entire workflow or an
individual step.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="cdk-pipelines-github.Job.property.environment"></a>

```typescript
public readonly environment: any;
```

- *Type:* any

The environment that the job references.

All environment protection rules
must pass before a job referencing the environment is sent to a runner.

> [https://docs.github.com/en/actions/reference/environments](https://docs.github.com/en/actions/reference/environments)

---

##### `if`<sup>Optional</sup> <a name="if" id="cdk-pipelines-github.Job.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

You can use the if conditional to prevent a job from running unless a condition is met.

You can use any supported context and expression to
create a conditional.

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-pipelines-github.Job.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

The name of the job displayed on GitHub.

---

##### `needs`<sup>Optional</sup> <a name="needs" id="cdk-pipelines-github.Job.property.needs"></a>

```typescript
public readonly needs: string[];
```

- *Type:* string[]

Identifies any jobs that must complete successfully before this job will run.

It can be a string or array of strings. If a job fails, all jobs
that need it are skipped unless the jobs use a conditional expression
that causes the job to continue.

---

##### `outputs`<sup>Optional</sup> <a name="outputs" id="cdk-pipelines-github.Job.property.outputs"></a>

```typescript
public readonly outputs: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

A map of outputs for a job.

Job outputs are available to all downstream
jobs that depend on this job.

---

##### `services`<sup>Optional</sup> <a name="services" id="cdk-pipelines-github.Job.property.services"></a>

```typescript
public readonly services: {[ key: string ]: ContainerOptions};
```

- *Type:* {[ key: string ]: <a href="#cdk-pipelines-github.ContainerOptions">ContainerOptions</a>}

Used to host service containers for a job in a workflow.

Service
containers are useful for creating databases or cache services like Redis.
The runner automatically creates a Docker network and manages the life
cycle of the service containers.

---

##### `strategy`<sup>Optional</sup> <a name="strategy" id="cdk-pipelines-github.Job.property.strategy"></a>

```typescript
public readonly strategy: JobStrategy;
```

- *Type:* <a href="#cdk-pipelines-github.JobStrategy">JobStrategy</a>

A strategy creates a build matrix for your jobs.

You can define different
variations to run each job in.

---

##### `timeoutMinutes`<sup>Optional</sup> <a name="timeoutMinutes" id="cdk-pipelines-github.Job.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number
- *Default:* 360

The maximum number of minutes to let a job run before GitHub automatically cancels it.

---

### JobDefaults <a name="JobDefaults" id="cdk-pipelines-github.JobDefaults"></a>

Default settings for all steps in the job.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.JobDefaults.Initializer"></a>

```typescript
import { JobDefaults } from 'cdk-pipelines-github'

const jobDefaults: JobDefaults = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.JobDefaults.property.run">run</a></code> | <code><a href="#cdk-pipelines-github.RunSettings">RunSettings</a></code> | Default run settings. |

---

##### `run`<sup>Optional</sup> <a name="run" id="cdk-pipelines-github.JobDefaults.property.run"></a>

```typescript
public readonly run: RunSettings;
```

- *Type:* <a href="#cdk-pipelines-github.RunSettings">RunSettings</a>

Default run settings.

---

### JobMatrix <a name="JobMatrix" id="cdk-pipelines-github.JobMatrix"></a>

A job matrix.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.JobMatrix.Initializer"></a>

```typescript
import { JobMatrix } from 'cdk-pipelines-github'

const jobMatrix: JobMatrix = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.JobMatrix.property.domain">domain</a></code> | <code>{[ key: string ]: string[]}</code> | Each option you define in the matrix has a key and value. |
| <code><a href="#cdk-pipelines-github.JobMatrix.property.exclude">exclude</a></code> | <code>{[ key: string ]: string}[]</code> | You can remove a specific configurations defined in the build matrix using the exclude option. |
| <code><a href="#cdk-pipelines-github.JobMatrix.property.include">include</a></code> | <code>{[ key: string ]: string}[]</code> | You can add additional configuration options to a build matrix job that already exists. |

---

##### `domain`<sup>Optional</sup> <a name="domain" id="cdk-pipelines-github.JobMatrix.property.domain"></a>

```typescript
public readonly domain: {[ key: string ]: string[]};
```

- *Type:* {[ key: string ]: string[]}

Each option you define in the matrix has a key and value.

The keys you
define become properties in the matrix context and you can reference the
property in other areas of your workflow file. For example, if you define
the key os that contains an array of operating systems, you can use the
matrix.os property as the value of the runs-on keyword to create a job
for each operating system.

---

##### `exclude`<sup>Optional</sup> <a name="exclude" id="cdk-pipelines-github.JobMatrix.property.exclude"></a>

```typescript
public readonly exclude: {[ key: string ]: string}[];
```

- *Type:* {[ key: string ]: string}[]

You can remove a specific configurations defined in the build matrix using the exclude option.

Using exclude removes a job defined by the
build matrix.

---

##### `include`<sup>Optional</sup> <a name="include" id="cdk-pipelines-github.JobMatrix.property.include"></a>

```typescript
public readonly include: {[ key: string ]: string}[];
```

- *Type:* {[ key: string ]: string}[]

You can add additional configuration options to a build matrix job that already exists.

For example, if you want to use a specific version of npm
when the job that uses windows-latest and version 8 of node runs, you can
use include to specify that additional option.

---

### JobPermissions <a name="JobPermissions" id="cdk-pipelines-github.JobPermissions"></a>

The available scopes and access values for workflow permissions.

If you
specify the access for any of these scopes, all those that are not
specified are set to `JobPermission.NONE`, instead of the default behavior
when none is specified.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.JobPermissions.Initializer"></a>

```typescript
import { JobPermissions } from 'cdk-pipelines-github'

const jobPermissions: JobPermissions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.actions">actions</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.checks">checks</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.contents">contents</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.deployments">deployments</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.discussions">discussions</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.idToken">idToken</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.issues">issues</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.packages">packages</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.pullRequests">pullRequests</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.repositoryProjects">repositoryProjects</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.securityEvents">securityEvents</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.JobPermissions.property.statuses">statuses</a></code> | <code><a href="#cdk-pipelines-github.JobPermission">JobPermission</a></code> | *No description.* |

---

##### `actions`<sup>Optional</sup> <a name="actions" id="cdk-pipelines-github.JobPermissions.property.actions"></a>

```typescript
public readonly actions: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `checks`<sup>Optional</sup> <a name="checks" id="cdk-pipelines-github.JobPermissions.property.checks"></a>

```typescript
public readonly checks: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `contents`<sup>Optional</sup> <a name="contents" id="cdk-pipelines-github.JobPermissions.property.contents"></a>

```typescript
public readonly contents: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `deployments`<sup>Optional</sup> <a name="deployments" id="cdk-pipelines-github.JobPermissions.property.deployments"></a>

```typescript
public readonly deployments: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `discussions`<sup>Optional</sup> <a name="discussions" id="cdk-pipelines-github.JobPermissions.property.discussions"></a>

```typescript
public readonly discussions: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `idToken`<sup>Optional</sup> <a name="idToken" id="cdk-pipelines-github.JobPermissions.property.idToken"></a>

```typescript
public readonly idToken: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `issues`<sup>Optional</sup> <a name="issues" id="cdk-pipelines-github.JobPermissions.property.issues"></a>

```typescript
public readonly issues: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `packages`<sup>Optional</sup> <a name="packages" id="cdk-pipelines-github.JobPermissions.property.packages"></a>

```typescript
public readonly packages: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `pullRequests`<sup>Optional</sup> <a name="pullRequests" id="cdk-pipelines-github.JobPermissions.property.pullRequests"></a>

```typescript
public readonly pullRequests: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `repositoryProjects`<sup>Optional</sup> <a name="repositoryProjects" id="cdk-pipelines-github.JobPermissions.property.repositoryProjects"></a>

```typescript
public readonly repositoryProjects: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `securityEvents`<sup>Optional</sup> <a name="securityEvents" id="cdk-pipelines-github.JobPermissions.property.securityEvents"></a>

```typescript
public readonly securityEvents: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

##### `statuses`<sup>Optional</sup> <a name="statuses" id="cdk-pipelines-github.JobPermissions.property.statuses"></a>

```typescript
public readonly statuses: JobPermission;
```

- *Type:* <a href="#cdk-pipelines-github.JobPermission">JobPermission</a>

---

### JobSettings <a name="JobSettings" id="cdk-pipelines-github.JobSettings"></a>

Job level settings applied to all jobs in the workflow.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.JobSettings.Initializer"></a>

```typescript
import { JobSettings } from 'cdk-pipelines-github'

const jobSettings: JobSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.JobSettings.property.if">if</a></code> | <code>string</code> | jobs.<job_id>.if. |

---

##### `if`<sup>Optional</sup> <a name="if" id="cdk-pipelines-github.JobSettings.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

jobs.<job_id>.if.

> [https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idif](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idif)

---

### JobStep <a name="JobStep" id="cdk-pipelines-github.JobStep"></a>

A job step.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.JobStep.Initializer"></a>

```typescript
import { JobStep } from 'cdk-pipelines-github'

const jobStep: JobStep = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.JobStep.property.continueOnError">continueOnError</a></code> | <code>boolean</code> | Prevents a job from failing when a step fails. |
| <code><a href="#cdk-pipelines-github.JobStep.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Sets environment variables for steps to use in the runner environment. |
| <code><a href="#cdk-pipelines-github.JobStep.property.id">id</a></code> | <code>string</code> | A unique identifier for the step. |
| <code><a href="#cdk-pipelines-github.JobStep.property.if">if</a></code> | <code>string</code> | You can use the if conditional to prevent a job from running unless a condition is met. |
| <code><a href="#cdk-pipelines-github.JobStep.property.name">name</a></code> | <code>string</code> | A name for your step to display on GitHub. |
| <code><a href="#cdk-pipelines-github.JobStep.property.run">run</a></code> | <code>string</code> | Runs command-line programs using the operating system's shell. |
| <code><a href="#cdk-pipelines-github.JobStep.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | The maximum number of minutes to run the step before killing the process. |
| <code><a href="#cdk-pipelines-github.JobStep.property.uses">uses</a></code> | <code>string</code> | Selects an action to run as part of a step in your job. |
| <code><a href="#cdk-pipelines-github.JobStep.property.with">with</a></code> | <code>{[ key: string ]: any}</code> | A map of the input parameters defined by the action. |

---

##### `continueOnError`<sup>Optional</sup> <a name="continueOnError" id="cdk-pipelines-github.JobStep.property.continueOnError"></a>

```typescript
public readonly continueOnError: boolean;
```

- *Type:* boolean

Prevents a job from failing when a step fails.

Set to true to allow a job
to pass when this step fails.

---

##### `env`<sup>Optional</sup> <a name="env" id="cdk-pipelines-github.JobStep.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Sets environment variables for steps to use in the runner environment.

You can also set environment variables for the entire workflow or a job.

---

##### `id`<sup>Optional</sup> <a name="id" id="cdk-pipelines-github.JobStep.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

A unique identifier for the step.

You can use the id to reference the
step in contexts.

---

##### `if`<sup>Optional</sup> <a name="if" id="cdk-pipelines-github.JobStep.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

You can use the if conditional to prevent a job from running unless a condition is met.

You can use any supported context and expression to
create a conditional.

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-pipelines-github.JobStep.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

A name for your step to display on GitHub.

---

##### `run`<sup>Optional</sup> <a name="run" id="cdk-pipelines-github.JobStep.property.run"></a>

```typescript
public readonly run: string;
```

- *Type:* string

Runs command-line programs using the operating system's shell.

If you do
not provide a name, the step name will default to the text specified in
the run command.

---

##### `timeoutMinutes`<sup>Optional</sup> <a name="timeoutMinutes" id="cdk-pipelines-github.JobStep.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number

The maximum number of minutes to run the step before killing the process.

---

##### `uses`<sup>Optional</sup> <a name="uses" id="cdk-pipelines-github.JobStep.property.uses"></a>

```typescript
public readonly uses: string;
```

- *Type:* string

Selects an action to run as part of a step in your job.

An action is a
reusable unit of code. You can use an action defined in the same
repository as the workflow, a public repository, or in a published Docker
container image.

---

##### `with`<sup>Optional</sup> <a name="with" id="cdk-pipelines-github.JobStep.property.with"></a>

```typescript
public readonly with: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

A map of the input parameters defined by the action.

Each input parameter
is a key/value pair. Input parameters are set as environment variables.
The variable is prefixed with INPUT_ and converted to upper case.

---

### JobStepOutput <a name="JobStepOutput" id="cdk-pipelines-github.JobStepOutput"></a>

An output binding for a job.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.JobStepOutput.Initializer"></a>

```typescript
import { JobStepOutput } from 'cdk-pipelines-github'

const jobStepOutput: JobStepOutput = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.JobStepOutput.property.outputName">outputName</a></code> | <code>string</code> | The name of the job output that is being bound. |
| <code><a href="#cdk-pipelines-github.JobStepOutput.property.stepId">stepId</a></code> | <code>string</code> | The ID of the step that exposes the output. |

---

##### `outputName`<sup>Required</sup> <a name="outputName" id="cdk-pipelines-github.JobStepOutput.property.outputName"></a>

```typescript
public readonly outputName: string;
```

- *Type:* string

The name of the job output that is being bound.

---

##### `stepId`<sup>Required</sup> <a name="stepId" id="cdk-pipelines-github.JobStepOutput.property.stepId"></a>

```typescript
public readonly stepId: string;
```

- *Type:* string

The ID of the step that exposes the output.

---

### JobStrategy <a name="JobStrategy" id="cdk-pipelines-github.JobStrategy"></a>

A strategy creates a build matrix for your jobs.

You can define different
variations to run each job in.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.JobStrategy.Initializer"></a>

```typescript
import { JobStrategy } from 'cdk-pipelines-github'

const jobStrategy: JobStrategy = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.JobStrategy.property.failFast">failFast</a></code> | <code>boolean</code> | When set to true, GitHub cancels all in-progress jobs if any matrix job fails. |
| <code><a href="#cdk-pipelines-github.JobStrategy.property.matrix">matrix</a></code> | <code><a href="#cdk-pipelines-github.JobMatrix">JobMatrix</a></code> | You can define a matrix of different job configurations. |
| <code><a href="#cdk-pipelines-github.JobStrategy.property.maxParallel">maxParallel</a></code> | <code>number</code> | The maximum number of jobs that can run simultaneously when using a matrix job strategy. |

---

##### `failFast`<sup>Optional</sup> <a name="failFast" id="cdk-pipelines-github.JobStrategy.property.failFast"></a>

```typescript
public readonly failFast: boolean;
```

- *Type:* boolean

When set to true, GitHub cancels all in-progress jobs if any matrix job fails.

Default: true

---

##### `matrix`<sup>Optional</sup> <a name="matrix" id="cdk-pipelines-github.JobStrategy.property.matrix"></a>

```typescript
public readonly matrix: JobMatrix;
```

- *Type:* <a href="#cdk-pipelines-github.JobMatrix">JobMatrix</a>

You can define a matrix of different job configurations.

A matrix allows
you to create multiple jobs by performing variable substitution in a
single job definition. For example, you can use a matrix to create jobs
for more than one supported version of a programming language, operating
system, or tool. A matrix reuses the job's configuration and creates a
job for each matrix you configure.

A job matrix can generate a maximum of 256 jobs per workflow run. This
limit also applies to self-hosted runners.

---

##### `maxParallel`<sup>Optional</sup> <a name="maxParallel" id="cdk-pipelines-github.JobStrategy.property.maxParallel"></a>

```typescript
public readonly maxParallel: number;
```

- *Type:* number

The maximum number of jobs that can run simultaneously when using a matrix job strategy.

By default, GitHub will maximize the number of jobs
run in parallel depending on the available runners on GitHub-hosted
virtual machines.

---

### LabelOptions <a name="LabelOptions" id="cdk-pipelines-github.LabelOptions"></a>

label options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.LabelOptions.Initializer"></a>

```typescript
import { LabelOptions } from 'cdk-pipelines-github'

const labelOptions: LabelOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.LabelOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.LabelOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### MilestoneOptions <a name="MilestoneOptions" id="cdk-pipelines-github.MilestoneOptions"></a>

Milestone options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.MilestoneOptions.Initializer"></a>

```typescript
import { MilestoneOptions } from 'cdk-pipelines-github'

const milestoneOptions: MilestoneOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.MilestoneOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.MilestoneOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### OpenIdConnectProviderProps <a name="OpenIdConnectProviderProps" id="cdk-pipelines-github.OpenIdConnectProviderProps"></a>

Role to assume using OpenId Connect.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.OpenIdConnectProviderProps.Initializer"></a>

```typescript
import { OpenIdConnectProviderProps } from 'cdk-pipelines-github'

const openIdConnectProviderProps: OpenIdConnectProviderProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.OpenIdConnectProviderProps.property.gitHubActionRoleArn">gitHubActionRoleArn</a></code> | <code>string</code> | A role that utilizes the GitHub OIDC Identity Provider in your AWS account. |
| <code><a href="#cdk-pipelines-github.OpenIdConnectProviderProps.property.roleSessionName">roleSessionName</a></code> | <code>string</code> | The role session name to use when assuming the role. |

---

##### `gitHubActionRoleArn`<sup>Required</sup> <a name="gitHubActionRoleArn" id="cdk-pipelines-github.OpenIdConnectProviderProps.property.gitHubActionRoleArn"></a>

```typescript
public readonly gitHubActionRoleArn: string;
```

- *Type:* string

A role that utilizes the GitHub OIDC Identity Provider in your AWS account.

You can create your own role in the console with the necessary trust policy
to allow gitHub actions from your gitHub repository to assume the role, or
you can utilize the `GitHubActionRole` construct to create a role for you.

---

##### `roleSessionName`<sup>Optional</sup> <a name="roleSessionName" id="cdk-pipelines-github.OpenIdConnectProviderProps.property.roleSessionName"></a>

```typescript
public readonly roleSessionName: string;
```

- *Type:* string
- *Default:* no role session name

The role session name to use when assuming the role.

---

### PageBuildOptions <a name="PageBuildOptions" id="cdk-pipelines-github.PageBuildOptions"></a>

The Page build event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.PageBuildOptions.Initializer"></a>

```typescript
import { PageBuildOptions } from 'cdk-pipelines-github'

const pageBuildOptions: PageBuildOptions = { ... }
```


### ProjectCardOptions <a name="ProjectCardOptions" id="cdk-pipelines-github.ProjectCardOptions"></a>

Project card options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.ProjectCardOptions.Initializer"></a>

```typescript
import { ProjectCardOptions } from 'cdk-pipelines-github'

const projectCardOptions: ProjectCardOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.ProjectCardOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.ProjectCardOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### ProjectColumnOptions <a name="ProjectColumnOptions" id="cdk-pipelines-github.ProjectColumnOptions"></a>

Probject column options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.ProjectColumnOptions.Initializer"></a>

```typescript
import { ProjectColumnOptions } from 'cdk-pipelines-github'

const projectColumnOptions: ProjectColumnOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.ProjectColumnOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.ProjectColumnOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### ProjectOptions <a name="ProjectOptions" id="cdk-pipelines-github.ProjectOptions"></a>

Project options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.ProjectOptions.Initializer"></a>

```typescript
import { ProjectOptions } from 'cdk-pipelines-github'

const projectOptions: ProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.ProjectOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.ProjectOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PublicOptions <a name="PublicOptions" id="cdk-pipelines-github.PublicOptions"></a>

The Public event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.PublicOptions.Initializer"></a>

```typescript
import { PublicOptions } from 'cdk-pipelines-github'

const publicOptions: PublicOptions = { ... }
```


### PullRequestOptions <a name="PullRequestOptions" id="cdk-pipelines-github.PullRequestOptions"></a>

Pull request options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.PullRequestOptions.Initializer"></a>

```typescript
import { PullRequestOptions } from 'cdk-pipelines-github'

const pullRequestOptions: PullRequestOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.PullRequestOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.PullRequestOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PullRequestReviewCommentOptions <a name="PullRequestReviewCommentOptions" id="cdk-pipelines-github.PullRequestReviewCommentOptions"></a>

Pull request review comment options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.PullRequestReviewCommentOptions.Initializer"></a>

```typescript
import { PullRequestReviewCommentOptions } from 'cdk-pipelines-github'

const pullRequestReviewCommentOptions: PullRequestReviewCommentOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.PullRequestReviewCommentOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.PullRequestReviewCommentOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PullRequestReviewOptions <a name="PullRequestReviewOptions" id="cdk-pipelines-github.PullRequestReviewOptions"></a>

Pull request review options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.PullRequestReviewOptions.Initializer"></a>

```typescript
import { PullRequestReviewOptions } from 'cdk-pipelines-github'

const pullRequestReviewOptions: PullRequestReviewOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.PullRequestReviewOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.PullRequestReviewOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PullRequestTargetOptions <a name="PullRequestTargetOptions" id="cdk-pipelines-github.PullRequestTargetOptions"></a>

Pull request target options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.PullRequestTargetOptions.Initializer"></a>

```typescript
import { PullRequestTargetOptions } from 'cdk-pipelines-github'

const pullRequestTargetOptions: PullRequestTargetOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.PullRequestTargetOptions.property.branches">branches</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. |
| <code><a href="#cdk-pipelines-github.PullRequestTargetOptions.property.paths">paths</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths. |
| <code><a href="#cdk-pipelines-github.PullRequestTargetOptions.property.tags">tags</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. |
| <code><a href="#cdk-pipelines-github.PullRequestTargetOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `branches`<sup>Optional</sup> <a name="branches" id="cdk-pipelines-github.PullRequestTargetOptions.property.branches"></a>

```typescript
public readonly branches: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.

For a pull_request event, only
branches and tags on the base are evaluated. If you define only tags or
only branches, the workflow won't run for events affecting the undefined
Git ref.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `paths`<sup>Optional</sup> <a name="paths" id="cdk-pipelines-github.PullRequestTargetOptions.property.paths"></a>

```typescript
public readonly paths: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths.

Path filters are not
evaluated for pushes to tags.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `tags`<sup>Optional</sup> <a name="tags" id="cdk-pipelines-github.PullRequestTargetOptions.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.

For a pull_request event, only
branches and tags on the base are evaluated. If you define only tags or
only branches, the workflow won't run for events affecting the undefined
Git ref.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.PullRequestTargetOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### PushOptions <a name="PushOptions" id="cdk-pipelines-github.PushOptions"></a>

Options for push-like events.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.PushOptions.Initializer"></a>

```typescript
import { PushOptions } from 'cdk-pipelines-github'

const pushOptions: PushOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.PushOptions.property.branches">branches</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. |
| <code><a href="#cdk-pipelines-github.PushOptions.property.paths">paths</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths. |
| <code><a href="#cdk-pipelines-github.PushOptions.property.tags">tags</a></code> | <code>string[]</code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags. |

---

##### `branches`<sup>Optional</sup> <a name="branches" id="cdk-pipelines-github.PushOptions.property.branches"></a>

```typescript
public readonly branches: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.

For a pull_request event, only
branches and tags on the base are evaluated. If you define only tags or
only branches, the workflow won't run for events affecting the undefined
Git ref.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `paths`<sup>Optional</sup> <a name="paths" id="cdk-pipelines-github.PushOptions.property.paths"></a>

```typescript
public readonly paths: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths.

Path filters are not
evaluated for pushes to tags.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

##### `tags`<sup>Optional</sup> <a name="tags" id="cdk-pipelines-github.PushOptions.property.tags"></a>

```typescript
public readonly tags: string[];
```

- *Type:* string[]

When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.

For a pull_request event, only
branches and tags on the base are evaluated. If you define only tags or
only branches, the workflow won't run for events affecting the undefined
Git ref.

> [https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)

---

### RegistryPackageOptions <a name="RegistryPackageOptions" id="cdk-pipelines-github.RegistryPackageOptions"></a>

Registry package options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.RegistryPackageOptions.Initializer"></a>

```typescript
import { RegistryPackageOptions } from 'cdk-pipelines-github'

const registryPackageOptions: RegistryPackageOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.RegistryPackageOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.RegistryPackageOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### ReleaseOptions <a name="ReleaseOptions" id="cdk-pipelines-github.ReleaseOptions"></a>

Release options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.ReleaseOptions.Initializer"></a>

```typescript
import { ReleaseOptions } from 'cdk-pipelines-github'

const releaseOptions: ReleaseOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.ReleaseOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.ReleaseOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### RepositoryDispatchOptions <a name="RepositoryDispatchOptions" id="cdk-pipelines-github.RepositoryDispatchOptions"></a>

Repository dispatch options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.RepositoryDispatchOptions.Initializer"></a>

```typescript
import { RepositoryDispatchOptions } from 'cdk-pipelines-github'

const repositoryDispatchOptions: RepositoryDispatchOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.RepositoryDispatchOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.RepositoryDispatchOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### RunSettings <a name="RunSettings" id="cdk-pipelines-github.RunSettings"></a>

Run settings for a job.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.RunSettings.Initializer"></a>

```typescript
import { RunSettings } from 'cdk-pipelines-github'

const runSettings: RunSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.RunSettings.property.shell">shell</a></code> | <code>string</code> | Which shell to use for running the step. |
| <code><a href="#cdk-pipelines-github.RunSettings.property.workingDirectory">workingDirectory</a></code> | <code>string</code> | Working directory to use when running the step. |

---

##### `shell`<sup>Optional</sup> <a name="shell" id="cdk-pipelines-github.RunSettings.property.shell"></a>

```typescript
public readonly shell: string;
```

- *Type:* string

Which shell to use for running the step.

---

*Example*

```typescript
"bash"
```


##### `workingDirectory`<sup>Optional</sup> <a name="workingDirectory" id="cdk-pipelines-github.RunSettings.property.workingDirectory"></a>

```typescript
public readonly workingDirectory: string;
```

- *Type:* string

Working directory to use when running the step.

---

### StatusOptions <a name="StatusOptions" id="cdk-pipelines-github.StatusOptions"></a>

The Status event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.StatusOptions.Initializer"></a>

```typescript
import { StatusOptions } from 'cdk-pipelines-github'

const statusOptions: StatusOptions = { ... }
```


### WatchOptions <a name="WatchOptions" id="cdk-pipelines-github.WatchOptions"></a>

Watch options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.WatchOptions.Initializer"></a>

```typescript
import { WatchOptions } from 'cdk-pipelines-github'

const watchOptions: WatchOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.WatchOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.WatchOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### WorkflowDispatchOptions <a name="WorkflowDispatchOptions" id="cdk-pipelines-github.WorkflowDispatchOptions"></a>

The Workflow dispatch event accepts no options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.WorkflowDispatchOptions.Initializer"></a>

```typescript
import { WorkflowDispatchOptions } from 'cdk-pipelines-github'

const workflowDispatchOptions: WorkflowDispatchOptions = { ... }
```


### WorkflowRunOptions <a name="WorkflowRunOptions" id="cdk-pipelines-github.WorkflowRunOptions"></a>

Workflow run options.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.WorkflowRunOptions.Initializer"></a>

```typescript
import { WorkflowRunOptions } from 'cdk-pipelines-github'

const workflowRunOptions: WorkflowRunOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.WorkflowRunOptions.property.types">types</a></code> | <code>string[]</code> | Which activity types to trigger on. |

---

##### `types`<sup>Optional</sup> <a name="types" id="cdk-pipelines-github.WorkflowRunOptions.property.types"></a>

```typescript
public readonly types: string[];
```

- *Type:* string[]

Which activity types to trigger on.

---

### WorkflowTriggers <a name="WorkflowTriggers" id="cdk-pipelines-github.WorkflowTriggers"></a>

The set of available triggers for GitHub Workflows.

> [https://docs.github.com/en/actions/reference/events-that-trigger-workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)

#### Initializer <a name="Initializer" id="cdk-pipelines-github.WorkflowTriggers.Initializer"></a>

```typescript
import { WorkflowTriggers } from 'cdk-pipelines-github'

const workflowTriggers: WorkflowTriggers = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.checkRun">checkRun</a></code> | <code><a href="#cdk-pipelines-github.CheckRunOptions">CheckRunOptions</a></code> | Runs your workflow anytime the check_run event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.checkSuite">checkSuite</a></code> | <code><a href="#cdk-pipelines-github.CheckSuiteOptions">CheckSuiteOptions</a></code> | Runs your workflow anytime the check_suite event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.create">create</a></code> | <code><a href="#cdk-pipelines-github.CreateOptions">CreateOptions</a></code> | Runs your workflow anytime someone creates a branch or tag, which triggers the create event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.delete">delete</a></code> | <code><a href="#cdk-pipelines-github.DeleteOptions">DeleteOptions</a></code> | Runs your workflow anytime someone deletes a branch or tag, which triggers the delete event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.deployment">deployment</a></code> | <code><a href="#cdk-pipelines-github.DeploymentOptions">DeploymentOptions</a></code> | Runs your workflow anytime someone creates a deployment, which triggers the deployment event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.deploymentStatus">deploymentStatus</a></code> | <code><a href="#cdk-pipelines-github.DeploymentStatusOptions">DeploymentStatusOptions</a></code> | Runs your workflow anytime a third party provides a deployment status, which triggers the deployment_status event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.fork">fork</a></code> | <code><a href="#cdk-pipelines-github.ForkOptions">ForkOptions</a></code> | Runs your workflow anytime when someone forks a repository, which triggers the fork event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.gollum">gollum</a></code> | <code><a href="#cdk-pipelines-github.GollumOptions">GollumOptions</a></code> | Runs your workflow when someone creates or updates a Wiki page, which triggers the gollum event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.issueComment">issueComment</a></code> | <code><a href="#cdk-pipelines-github.IssueCommentOptions">IssueCommentOptions</a></code> | Runs your workflow anytime the issue_comment event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.issues">issues</a></code> | <code><a href="#cdk-pipelines-github.IssuesOptions">IssuesOptions</a></code> | Runs your workflow anytime the issues event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.label">label</a></code> | <code><a href="#cdk-pipelines-github.LabelOptions">LabelOptions</a></code> | Runs your workflow anytime the label event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.milestone">milestone</a></code> | <code><a href="#cdk-pipelines-github.MilestoneOptions">MilestoneOptions</a></code> | Runs your workflow anytime the milestone event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.pageBuild">pageBuild</a></code> | <code><a href="#cdk-pipelines-github.PageBuildOptions">PageBuildOptions</a></code> | Runs your workflow anytime someone pushes to a GitHub Pages-enabled branch, which triggers the page_build event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.project">project</a></code> | <code><a href="#cdk-pipelines-github.ProjectOptions">ProjectOptions</a></code> | Runs your workflow anytime the project event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.projectCard">projectCard</a></code> | <code><a href="#cdk-pipelines-github.ProjectCardOptions">ProjectCardOptions</a></code> | Runs your workflow anytime the project_card event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.projectColumn">projectColumn</a></code> | <code><a href="#cdk-pipelines-github.ProjectColumnOptions">ProjectColumnOptions</a></code> | Runs your workflow anytime the project_column event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.public">public</a></code> | <code><a href="#cdk-pipelines-github.PublicOptions">PublicOptions</a></code> | Runs your workflow anytime someone makes a private repository public, which triggers the public event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.pullRequest">pullRequest</a></code> | <code><a href="#cdk-pipelines-github.PullRequestOptions">PullRequestOptions</a></code> | Runs your workflow anytime the pull_request event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.pullRequestReview">pullRequestReview</a></code> | <code><a href="#cdk-pipelines-github.PullRequestReviewOptions">PullRequestReviewOptions</a></code> | Runs your workflow anytime the pull_request_review event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.pullRequestReviewComment">pullRequestReviewComment</a></code> | <code><a href="#cdk-pipelines-github.PullRequestReviewCommentOptions">PullRequestReviewCommentOptions</a></code> | Runs your workflow anytime a comment on a pull request's unified diff is modified, which triggers the pull_request_review_comment event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.pullRequestTarget">pullRequestTarget</a></code> | <code><a href="#cdk-pipelines-github.PullRequestTargetOptions">PullRequestTargetOptions</a></code> | This event runs in the context of the base of the pull request, rather than in the merge commit as the pull_request event does. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.push">push</a></code> | <code><a href="#cdk-pipelines-github.PushOptions">PushOptions</a></code> | Runs your workflow when someone pushes to a repository branch, which triggers the push event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.registryPackage">registryPackage</a></code> | <code><a href="#cdk-pipelines-github.RegistryPackageOptions">RegistryPackageOptions</a></code> | Runs your workflow anytime a package is published or updated. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.release">release</a></code> | <code><a href="#cdk-pipelines-github.ReleaseOptions">ReleaseOptions</a></code> | Runs your workflow anytime the release event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.repositoryDispatch">repositoryDispatch</a></code> | <code><a href="#cdk-pipelines-github.RepositoryDispatchOptions">RepositoryDispatchOptions</a></code> | You can use the GitHub API to trigger a webhook event called repository_dispatch when you want to trigger a workflow for activity that happens outside of GitHub. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.schedule">schedule</a></code> | <code><a href="#cdk-pipelines-github.CronScheduleOptions">CronScheduleOptions</a>[]</code> | You can schedule a workflow to run at specific UTC times using POSIX cron syntax. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.status">status</a></code> | <code><a href="#cdk-pipelines-github.StatusOptions">StatusOptions</a></code> | Runs your workflow anytime the status of a Git commit changes, which triggers the status event. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.watch">watch</a></code> | <code><a href="#cdk-pipelines-github.WatchOptions">WatchOptions</a></code> | Runs your workflow anytime the watch event occurs. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.workflowDispatch">workflowDispatch</a></code> | <code><a href="#cdk-pipelines-github.WorkflowDispatchOptions">WorkflowDispatchOptions</a></code> | You can configure custom-defined input properties, default input values, and required inputs for the event directly in your workflow. |
| <code><a href="#cdk-pipelines-github.WorkflowTriggers.property.workflowRun">workflowRun</a></code> | <code><a href="#cdk-pipelines-github.WorkflowRunOptions">WorkflowRunOptions</a></code> | This event occurs when a workflow run is requested or completed, and allows you to execute a workflow based on the finished result of another workflow. |

---

##### `checkRun`<sup>Optional</sup> <a name="checkRun" id="cdk-pipelines-github.WorkflowTriggers.property.checkRun"></a>

```typescript
public readonly checkRun: CheckRunOptions;
```

- *Type:* <a href="#cdk-pipelines-github.CheckRunOptions">CheckRunOptions</a>

Runs your workflow anytime the check_run event occurs.

---

##### `checkSuite`<sup>Optional</sup> <a name="checkSuite" id="cdk-pipelines-github.WorkflowTriggers.property.checkSuite"></a>

```typescript
public readonly checkSuite: CheckSuiteOptions;
```

- *Type:* <a href="#cdk-pipelines-github.CheckSuiteOptions">CheckSuiteOptions</a>

Runs your workflow anytime the check_suite event occurs.

---

##### `create`<sup>Optional</sup> <a name="create" id="cdk-pipelines-github.WorkflowTriggers.property.create"></a>

```typescript
public readonly create: CreateOptions;
```

- *Type:* <a href="#cdk-pipelines-github.CreateOptions">CreateOptions</a>

Runs your workflow anytime someone creates a branch or tag, which triggers the create event.

---

##### `delete`<sup>Optional</sup> <a name="delete" id="cdk-pipelines-github.WorkflowTriggers.property.delete"></a>

```typescript
public readonly delete: DeleteOptions;
```

- *Type:* <a href="#cdk-pipelines-github.DeleteOptions">DeleteOptions</a>

Runs your workflow anytime someone deletes a branch or tag, which triggers the delete event.

---

##### `deployment`<sup>Optional</sup> <a name="deployment" id="cdk-pipelines-github.WorkflowTriggers.property.deployment"></a>

```typescript
public readonly deployment: DeploymentOptions;
```

- *Type:* <a href="#cdk-pipelines-github.DeploymentOptions">DeploymentOptions</a>

Runs your workflow anytime someone creates a deployment, which triggers the deployment event.

Deployments created with a commit SHA may not have
a Git ref.

---

##### `deploymentStatus`<sup>Optional</sup> <a name="deploymentStatus" id="cdk-pipelines-github.WorkflowTriggers.property.deploymentStatus"></a>

```typescript
public readonly deploymentStatus: DeploymentStatusOptions;
```

- *Type:* <a href="#cdk-pipelines-github.DeploymentStatusOptions">DeploymentStatusOptions</a>

Runs your workflow anytime a third party provides a deployment status, which triggers the deployment_status event.

Deployments created with a
commit SHA may not have a Git ref.

---

##### `fork`<sup>Optional</sup> <a name="fork" id="cdk-pipelines-github.WorkflowTriggers.property.fork"></a>

```typescript
public readonly fork: ForkOptions;
```

- *Type:* <a href="#cdk-pipelines-github.ForkOptions">ForkOptions</a>

Runs your workflow anytime when someone forks a repository, which triggers the fork event.

---

##### `gollum`<sup>Optional</sup> <a name="gollum" id="cdk-pipelines-github.WorkflowTriggers.property.gollum"></a>

```typescript
public readonly gollum: GollumOptions;
```

- *Type:* <a href="#cdk-pipelines-github.GollumOptions">GollumOptions</a>

Runs your workflow when someone creates or updates a Wiki page, which triggers the gollum event.

---

##### `issueComment`<sup>Optional</sup> <a name="issueComment" id="cdk-pipelines-github.WorkflowTriggers.property.issueComment"></a>

```typescript
public readonly issueComment: IssueCommentOptions;
```

- *Type:* <a href="#cdk-pipelines-github.IssueCommentOptions">IssueCommentOptions</a>

Runs your workflow anytime the issue_comment event occurs.

---

##### `issues`<sup>Optional</sup> <a name="issues" id="cdk-pipelines-github.WorkflowTriggers.property.issues"></a>

```typescript
public readonly issues: IssuesOptions;
```

- *Type:* <a href="#cdk-pipelines-github.IssuesOptions">IssuesOptions</a>

Runs your workflow anytime the issues event occurs.

---

##### `label`<sup>Optional</sup> <a name="label" id="cdk-pipelines-github.WorkflowTriggers.property.label"></a>

```typescript
public readonly label: LabelOptions;
```

- *Type:* <a href="#cdk-pipelines-github.LabelOptions">LabelOptions</a>

Runs your workflow anytime the label event occurs.

---

##### `milestone`<sup>Optional</sup> <a name="milestone" id="cdk-pipelines-github.WorkflowTriggers.property.milestone"></a>

```typescript
public readonly milestone: MilestoneOptions;
```

- *Type:* <a href="#cdk-pipelines-github.MilestoneOptions">MilestoneOptions</a>

Runs your workflow anytime the milestone event occurs.

---

##### `pageBuild`<sup>Optional</sup> <a name="pageBuild" id="cdk-pipelines-github.WorkflowTriggers.property.pageBuild"></a>

```typescript
public readonly pageBuild: PageBuildOptions;
```

- *Type:* <a href="#cdk-pipelines-github.PageBuildOptions">PageBuildOptions</a>

Runs your workflow anytime someone pushes to a GitHub Pages-enabled branch, which triggers the page_build event.

---

##### `project`<sup>Optional</sup> <a name="project" id="cdk-pipelines-github.WorkflowTriggers.property.project"></a>

```typescript
public readonly project: ProjectOptions;
```

- *Type:* <a href="#cdk-pipelines-github.ProjectOptions">ProjectOptions</a>

Runs your workflow anytime the project event occurs.

---

##### `projectCard`<sup>Optional</sup> <a name="projectCard" id="cdk-pipelines-github.WorkflowTriggers.property.projectCard"></a>

```typescript
public readonly projectCard: ProjectCardOptions;
```

- *Type:* <a href="#cdk-pipelines-github.ProjectCardOptions">ProjectCardOptions</a>

Runs your workflow anytime the project_card event occurs.

---

##### `projectColumn`<sup>Optional</sup> <a name="projectColumn" id="cdk-pipelines-github.WorkflowTriggers.property.projectColumn"></a>

```typescript
public readonly projectColumn: ProjectColumnOptions;
```

- *Type:* <a href="#cdk-pipelines-github.ProjectColumnOptions">ProjectColumnOptions</a>

Runs your workflow anytime the project_column event occurs.

---

##### `public`<sup>Optional</sup> <a name="public" id="cdk-pipelines-github.WorkflowTriggers.property.public"></a>

```typescript
public readonly public: PublicOptions;
```

- *Type:* <a href="#cdk-pipelines-github.PublicOptions">PublicOptions</a>

Runs your workflow anytime someone makes a private repository public, which triggers the public event.

---

##### `pullRequest`<sup>Optional</sup> <a name="pullRequest" id="cdk-pipelines-github.WorkflowTriggers.property.pullRequest"></a>

```typescript
public readonly pullRequest: PullRequestOptions;
```

- *Type:* <a href="#cdk-pipelines-github.PullRequestOptions">PullRequestOptions</a>

Runs your workflow anytime the pull_request event occurs.

---

##### `pullRequestReview`<sup>Optional</sup> <a name="pullRequestReview" id="cdk-pipelines-github.WorkflowTriggers.property.pullRequestReview"></a>

```typescript
public readonly pullRequestReview: PullRequestReviewOptions;
```

- *Type:* <a href="#cdk-pipelines-github.PullRequestReviewOptions">PullRequestReviewOptions</a>

Runs your workflow anytime the pull_request_review event occurs.

---

##### `pullRequestReviewComment`<sup>Optional</sup> <a name="pullRequestReviewComment" id="cdk-pipelines-github.WorkflowTriggers.property.pullRequestReviewComment"></a>

```typescript
public readonly pullRequestReviewComment: PullRequestReviewCommentOptions;
```

- *Type:* <a href="#cdk-pipelines-github.PullRequestReviewCommentOptions">PullRequestReviewCommentOptions</a>

Runs your workflow anytime a comment on a pull request's unified diff is modified, which triggers the pull_request_review_comment event.

---

##### `pullRequestTarget`<sup>Optional</sup> <a name="pullRequestTarget" id="cdk-pipelines-github.WorkflowTriggers.property.pullRequestTarget"></a>

```typescript
public readonly pullRequestTarget: PullRequestTargetOptions;
```

- *Type:* <a href="#cdk-pipelines-github.PullRequestTargetOptions">PullRequestTargetOptions</a>

This event runs in the context of the base of the pull request, rather than in the merge commit as the pull_request event does.

This prevents
executing unsafe workflow code from the head of the pull request that
could alter your repository or steal any secrets you use in your workflow.
This event allows you to do things like create workflows that label and
comment on pull requests based on the contents of the event payload.

WARNING: The `pull_request_target` event is granted read/write repository
token and can access secrets, even when it is triggered from a fork.
Although the workflow runs in the context of the base of the pull request,
you should make sure that you do not check out, build, or run untrusted
code from the pull request with this event. Additionally, any caches
share the same scope as the base branch, and to help prevent cache
poisoning, you should not save the cache if there is a possibility that
the cache contents were altered.

> [https://securitylab.github.com/research/github-actions-preventing-pwn-requests](https://securitylab.github.com/research/github-actions-preventing-pwn-requests)

---

##### `push`<sup>Optional</sup> <a name="push" id="cdk-pipelines-github.WorkflowTriggers.property.push"></a>

```typescript
public readonly push: PushOptions;
```

- *Type:* <a href="#cdk-pipelines-github.PushOptions">PushOptions</a>

Runs your workflow when someone pushes to a repository branch, which triggers the push event.

---

##### `registryPackage`<sup>Optional</sup> <a name="registryPackage" id="cdk-pipelines-github.WorkflowTriggers.property.registryPackage"></a>

```typescript
public readonly registryPackage: RegistryPackageOptions;
```

- *Type:* <a href="#cdk-pipelines-github.RegistryPackageOptions">RegistryPackageOptions</a>

Runs your workflow anytime a package is published or updated.

---

##### `release`<sup>Optional</sup> <a name="release" id="cdk-pipelines-github.WorkflowTriggers.property.release"></a>

```typescript
public readonly release: ReleaseOptions;
```

- *Type:* <a href="#cdk-pipelines-github.ReleaseOptions">ReleaseOptions</a>

Runs your workflow anytime the release event occurs.

---

##### `repositoryDispatch`<sup>Optional</sup> <a name="repositoryDispatch" id="cdk-pipelines-github.WorkflowTriggers.property.repositoryDispatch"></a>

```typescript
public readonly repositoryDispatch: RepositoryDispatchOptions;
```

- *Type:* <a href="#cdk-pipelines-github.RepositoryDispatchOptions">RepositoryDispatchOptions</a>

You can use the GitHub API to trigger a webhook event called repository_dispatch when you want to trigger a workflow for activity that happens outside of GitHub.

---

##### `schedule`<sup>Optional</sup> <a name="schedule" id="cdk-pipelines-github.WorkflowTriggers.property.schedule"></a>

```typescript
public readonly schedule: CronScheduleOptions[];
```

- *Type:* <a href="#cdk-pipelines-github.CronScheduleOptions">CronScheduleOptions</a>[]

You can schedule a workflow to run at specific UTC times using POSIX cron syntax.

Scheduled workflows run on the latest commit on the default or
base branch. The shortest interval you can run scheduled workflows is
once every 5 minutes.

> [https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07)

---

##### `status`<sup>Optional</sup> <a name="status" id="cdk-pipelines-github.WorkflowTriggers.property.status"></a>

```typescript
public readonly status: StatusOptions;
```

- *Type:* <a href="#cdk-pipelines-github.StatusOptions">StatusOptions</a>

Runs your workflow anytime the status of a Git commit changes, which triggers the status event.

---

##### `watch`<sup>Optional</sup> <a name="watch" id="cdk-pipelines-github.WorkflowTriggers.property.watch"></a>

```typescript
public readonly watch: WatchOptions;
```

- *Type:* <a href="#cdk-pipelines-github.WatchOptions">WatchOptions</a>

Runs your workflow anytime the watch event occurs.

---

##### `workflowDispatch`<sup>Optional</sup> <a name="workflowDispatch" id="cdk-pipelines-github.WorkflowTriggers.property.workflowDispatch"></a>

```typescript
public readonly workflowDispatch: WorkflowDispatchOptions;
```

- *Type:* <a href="#cdk-pipelines-github.WorkflowDispatchOptions">WorkflowDispatchOptions</a>

You can configure custom-defined input properties, default input values, and required inputs for the event directly in your workflow.

When the
workflow runs, you can access the input values in the github.event.inputs
context.

---

##### `workflowRun`<sup>Optional</sup> <a name="workflowRun" id="cdk-pipelines-github.WorkflowTriggers.property.workflowRun"></a>

```typescript
public readonly workflowRun: WorkflowRunOptions;
```

- *Type:* <a href="#cdk-pipelines-github.WorkflowRunOptions">WorkflowRunOptions</a>

This event occurs when a workflow run is requested or completed, and allows you to execute a workflow based on the finished result of another workflow.

A workflow run is triggered regardless of the result of the
previous workflow.

---

### YamlFileOptions <a name="YamlFileOptions" id="cdk-pipelines-github.YamlFileOptions"></a>

Options for `YamlFile`.

#### Initializer <a name="Initializer" id="cdk-pipelines-github.YamlFileOptions.Initializer"></a>

```typescript
import { YamlFileOptions } from 'cdk-pipelines-github'

const yamlFileOptions: YamlFileOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.YamlFileOptions.property.obj">obj</a></code> | <code>any</code> | The object that will be serialized. |

---

##### `obj`<sup>Optional</sup> <a name="obj" id="cdk-pipelines-github.YamlFileOptions.property.obj"></a>

```typescript
public readonly obj: any;
```

- *Type:* any
- *Default:* {} an empty object

The object that will be serialized.

You can modify the object's contents
before synthesis.

---

## Classes <a name="Classes" id="Classes"></a>

### AwsCredentials <a name="AwsCredentials" id="cdk-pipelines-github.AwsCredentials"></a>

Provides AWS credenitals to the pipeline jobs.

#### Initializers <a name="Initializers" id="cdk-pipelines-github.AwsCredentials.Initializer"></a>

```typescript
import { AwsCredentials } from 'cdk-pipelines-github'

new AwsCredentials()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.AwsCredentials.fromGitHubSecrets">fromGitHubSecrets</a></code> | Reference credential secrets to authenticate with AWS. |
| <code><a href="#cdk-pipelines-github.AwsCredentials.fromOpenIdConnect">fromOpenIdConnect</a></code> | Provide AWS credentials using OpenID Connect. |
| <code><a href="#cdk-pipelines-github.AwsCredentials.runnerHasPreconfiguredCreds">runnerHasPreconfiguredCreds</a></code> | Don't provide any AWS credentials, use this if runners have preconfigured credentials. |

---

##### `fromGitHubSecrets` <a name="fromGitHubSecrets" id="cdk-pipelines-github.AwsCredentials.fromGitHubSecrets"></a>

```typescript
import { AwsCredentials } from 'cdk-pipelines-github'

AwsCredentials.fromGitHubSecrets(props?: GitHubSecretsProviderProps)
```

Reference credential secrets to authenticate with AWS.

This method assumes
that your credentials will be stored as long-lived GitHub Secrets.

###### `props`<sup>Optional</sup> <a name="props" id="cdk-pipelines-github.AwsCredentials.fromGitHubSecrets.parameter.props"></a>

- *Type:* <a href="#cdk-pipelines-github.GitHubSecretsProviderProps">GitHubSecretsProviderProps</a>

---

##### `fromOpenIdConnect` <a name="fromOpenIdConnect" id="cdk-pipelines-github.AwsCredentials.fromOpenIdConnect"></a>

```typescript
import { AwsCredentials } from 'cdk-pipelines-github'

AwsCredentials.fromOpenIdConnect(props: OpenIdConnectProviderProps)
```

Provide AWS credentials using OpenID Connect.

###### `props`<sup>Required</sup> <a name="props" id="cdk-pipelines-github.AwsCredentials.fromOpenIdConnect.parameter.props"></a>

- *Type:* <a href="#cdk-pipelines-github.OpenIdConnectProviderProps">OpenIdConnectProviderProps</a>

---

##### `runnerHasPreconfiguredCreds` <a name="runnerHasPreconfiguredCreds" id="cdk-pipelines-github.AwsCredentials.runnerHasPreconfiguredCreds"></a>

```typescript
import { AwsCredentials } from 'cdk-pipelines-github'

AwsCredentials.runnerHasPreconfiguredCreds()
```

Don't provide any AWS credentials, use this if runners have preconfigured credentials.



### AwsCredentialsProvider <a name="AwsCredentialsProvider" id="cdk-pipelines-github.AwsCredentialsProvider"></a>

AWS credential provider.

#### Initializers <a name="Initializers" id="cdk-pipelines-github.AwsCredentialsProvider.Initializer"></a>

```typescript
import { AwsCredentialsProvider } from 'cdk-pipelines-github'

new AwsCredentialsProvider()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.AwsCredentialsProvider.credentialSteps">credentialSteps</a></code> | *No description.* |
| <code><a href="#cdk-pipelines-github.AwsCredentialsProvider.jobPermission">jobPermission</a></code> | *No description.* |

---

##### `credentialSteps` <a name="credentialSteps" id="cdk-pipelines-github.AwsCredentialsProvider.credentialSteps"></a>

```typescript
public credentialSteps(region: string, assumeRoleArn?: string): JobStep[]
```

###### `region`<sup>Required</sup> <a name="region" id="cdk-pipelines-github.AwsCredentialsProvider.credentialSteps.parameter.region"></a>

- *Type:* string

---

###### `assumeRoleArn`<sup>Optional</sup> <a name="assumeRoleArn" id="cdk-pipelines-github.AwsCredentialsProvider.credentialSteps.parameter.assumeRoleArn"></a>

- *Type:* string

---

##### `jobPermission` <a name="jobPermission" id="cdk-pipelines-github.AwsCredentialsProvider.jobPermission"></a>

```typescript
public jobPermission(): JobPermission
```




### DockerCredential <a name="DockerCredential" id="cdk-pipelines-github.DockerCredential"></a>

Represents a credential used to authenticate to a docker registry.

Uses the official Docker Login GitHub Action to authenticate.

> [https://github.com/marketplace/actions/docker-login](https://github.com/marketplace/actions/docker-login)


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.DockerCredential.customRegistry">customRegistry</a></code> | Create a credential for a custom registry. |
| <code><a href="#cdk-pipelines-github.DockerCredential.dockerHub">dockerHub</a></code> | Reference credential secrets to authenticate to DockerHub. |
| <code><a href="#cdk-pipelines-github.DockerCredential.ecr">ecr</a></code> | Create a credential for ECR. |

---

##### `customRegistry` <a name="customRegistry" id="cdk-pipelines-github.DockerCredential.customRegistry"></a>

```typescript
import { DockerCredential } from 'cdk-pipelines-github'

DockerCredential.customRegistry(registry: string, creds: ExternalDockerCredentialSecrets)
```

Create a credential for a custom registry.

This method assumes that you will have long-lived
GitHub Secrets stored under the usernameKey and passwordKey that will authenticate to the
registry you provide.

> [https://github.com/marketplace/actions/docker-login](https://github.com/marketplace/actions/docker-login)

###### `registry`<sup>Required</sup> <a name="registry" id="cdk-pipelines-github.DockerCredential.customRegistry.parameter.registry"></a>

- *Type:* string

---

###### `creds`<sup>Required</sup> <a name="creds" id="cdk-pipelines-github.DockerCredential.customRegistry.parameter.creds"></a>

- *Type:* <a href="#cdk-pipelines-github.ExternalDockerCredentialSecrets">ExternalDockerCredentialSecrets</a>

---

##### `dockerHub` <a name="dockerHub" id="cdk-pipelines-github.DockerCredential.dockerHub"></a>

```typescript
import { DockerCredential } from 'cdk-pipelines-github'

DockerCredential.dockerHub(creds?: DockerHubCredentialSecrets)
```

Reference credential secrets to authenticate to DockerHub.

This method assumes
that your credentials will be stored as long-lived GitHub Secrets under the
usernameKey and personalAccessTokenKey.

The default for usernameKey is `DOCKERHUB_USERNAME`. The default for personalAccessTokenKey
is `DOCKERHUB_TOKEN`. If you do not set these values, your credentials should be
found in your GitHub Secrets under these default keys.

###### `creds`<sup>Optional</sup> <a name="creds" id="cdk-pipelines-github.DockerCredential.dockerHub.parameter.creds"></a>

- *Type:* <a href="#cdk-pipelines-github.DockerHubCredentialSecrets">DockerHubCredentialSecrets</a>

---

##### `ecr` <a name="ecr" id="cdk-pipelines-github.DockerCredential.ecr"></a>

```typescript
import { DockerCredential } from 'cdk-pipelines-github'

DockerCredential.ecr(registry: string)
```

Create a credential for ECR.

This method will reuse your AWS credentials to log in to AWS.
Your AWS credentials are already used to deploy your CDK stacks. It can be supplied via
GitHub Secrets or using an IAM role that trusts the GitHub OIDC identity provider.

NOTE - All ECR repositories in the same account and region share a domain name
(e.g., 0123456789012.dkr.ecr.eu-west-1.amazonaws.com), and can only have one associated
set of credentials (and DockerCredential). Attempting to associate one set of credentials
with one ECR repo and another with another ECR repo in the same account and region will
result in failures when using these credentials in the pipeline.

###### `registry`<sup>Required</sup> <a name="registry" id="cdk-pipelines-github.DockerCredential.ecr.parameter.registry"></a>

- *Type:* string

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.DockerCredential.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.DockerCredential.property.passwordKey">passwordKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.DockerCredential.property.registry">registry</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.DockerCredential.property.usernameKey">usernameKey</a></code> | <code>string</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="cdk-pipelines-github.DockerCredential.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `passwordKey`<sup>Optional</sup> <a name="passwordKey" id="cdk-pipelines-github.DockerCredential.property.passwordKey"></a>

```typescript
public readonly passwordKey: string;
```

- *Type:* string

---

##### `registry`<sup>Optional</sup> <a name="registry" id="cdk-pipelines-github.DockerCredential.property.registry"></a>

```typescript
public readonly registry: string;
```

- *Type:* string

---

##### `usernameKey`<sup>Optional</sup> <a name="usernameKey" id="cdk-pipelines-github.DockerCredential.property.usernameKey"></a>

```typescript
public readonly usernameKey: string;
```

- *Type:* string

---


### GitHubActionStep <a name="GitHubActionStep" id="cdk-pipelines-github.GitHubActionStep"></a>

Specifies a GitHub Action as a step in the pipeline.

#### Initializers <a name="Initializers" id="cdk-pipelines-github.GitHubActionStep.Initializer"></a>

```typescript
import { GitHubActionStep } from 'cdk-pipelines-github'

new GitHubActionStep(id: string, props: GitHubActionStepProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-pipelines-github.GitHubActionStepProps">GitHubActionStepProps</a></code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-pipelines-github.GitHubActionStep.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-pipelines-github.GitHubActionStep.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-pipelines-github.GitHubActionStepProps">GitHubActionStepProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.addStepDependency">addStepDependency</a></code> | Add a dependency on another step. |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.toString">toString</a></code> | Return a string representation of this Step. |

---

##### `addStepDependency` <a name="addStepDependency" id="cdk-pipelines-github.GitHubActionStep.addStepDependency"></a>

```typescript
public addStepDependency(step: Step): void
```

Add a dependency on another step.

###### `step`<sup>Required</sup> <a name="step" id="cdk-pipelines-github.GitHubActionStep.addStepDependency.parameter.step"></a>

- *Type:* aws-cdk-lib.pipelines.Step

---

##### `toString` <a name="toString" id="cdk-pipelines-github.GitHubActionStep.toString"></a>

```typescript
public toString(): string
```

Return a string representation of this Step.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.sequence">sequence</a></code> | Define a sequence of steps to be executed in order. |

---

##### `sequence` <a name="sequence" id="cdk-pipelines-github.GitHubActionStep.sequence"></a>

```typescript
import { GitHubActionStep } from 'cdk-pipelines-github'

GitHubActionStep.sequence(steps: Step[])
```

Define a sequence of steps to be executed in order.

###### `steps`<sup>Required</sup> <a name="steps" id="cdk-pipelines-github.GitHubActionStep.sequence.parameter.steps"></a>

- *Type:* aws-cdk-lib.pipelines.Step[]

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.pipelines.Step[]</code> | Return the steps this step depends on, based on the FileSets it requires. |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.property.dependencyFileSets">dependencyFileSets</a></code> | <code>aws-cdk-lib.pipelines.FileSet[]</code> | The list of FileSets consumed by this Step. |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.property.id">id</a></code> | <code>string</code> | Identifier for this step. |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.property.isSource">isSource</a></code> | <code>boolean</code> | Whether or not this is a Source step. |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.property.primaryOutput">primaryOutput</a></code> | <code>aws-cdk-lib.pipelines.FileSet</code> | The primary FileSet produced by this Step. |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.GitHubActionStep.property.jobSteps">jobSteps</a></code> | <code><a href="#cdk-pipelines-github.JobStep">JobStep</a>[]</code> | *No description.* |

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="cdk-pipelines-github.GitHubActionStep.property.dependencies"></a>

```typescript
public readonly dependencies: Step[];
```

- *Type:* aws-cdk-lib.pipelines.Step[]

Return the steps this step depends on, based on the FileSets it requires.

---

##### `dependencyFileSets`<sup>Required</sup> <a name="dependencyFileSets" id="cdk-pipelines-github.GitHubActionStep.property.dependencyFileSets"></a>

```typescript
public readonly dependencyFileSets: FileSet[];
```

- *Type:* aws-cdk-lib.pipelines.FileSet[]

The list of FileSets consumed by this Step.

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-pipelines-github.GitHubActionStep.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Identifier for this step.

---

##### `isSource`<sup>Required</sup> <a name="isSource" id="cdk-pipelines-github.GitHubActionStep.property.isSource"></a>

```typescript
public readonly isSource: boolean;
```

- *Type:* boolean

Whether or not this is a Source step.

What it means to be a Source step depends on the engine.

---

##### `primaryOutput`<sup>Optional</sup> <a name="primaryOutput" id="cdk-pipelines-github.GitHubActionStep.property.primaryOutput"></a>

```typescript
public readonly primaryOutput: FileSet;
```

- *Type:* aws-cdk-lib.pipelines.FileSet

The primary FileSet produced by this Step.

Not all steps produce an output FileSet--if they do
you can substitute the `Step` object for the `FileSet` object.

---

##### `env`<sup>Required</sup> <a name="env" id="cdk-pipelines-github.GitHubActionStep.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `jobSteps`<sup>Required</sup> <a name="jobSteps" id="cdk-pipelines-github.GitHubActionStep.property.jobSteps"></a>

```typescript
public readonly jobSteps: JobStep[];
```

- *Type:* <a href="#cdk-pipelines-github.JobStep">JobStep</a>[]

---


### JsonPatch <a name="JsonPatch" id="cdk-pipelines-github.JsonPatch"></a>

Utility for applying RFC-6902 JSON-Patch to a document.

Use the the `JsonPatch.apply(doc, ...ops)` function to apply a set of
operations to a JSON document and return the result.

Operations can be created using the factory methods `JsonPatch.add()`,
`JsonPatch.remove()`, etc.

const output = JsonPatch.apply(input,
   JsonPatch.replace('/world/hi/there', 'goodbye'),
   JsonPatch.add('/world/foo/', 'boom'),
   JsonPatch.remove('/hello'),
);


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.JsonPatch.add">add</a></code> | Adds a value to an object or inserts it into an array. |
| <code><a href="#cdk-pipelines-github.JsonPatch.apply">apply</a></code> | Applies a set of JSON-Patch (RFC-6902) operations to `document` and returns the result. |
| <code><a href="#cdk-pipelines-github.JsonPatch.copy">copy</a></code> | Copies a value from one location to another within the JSON document. |
| <code><a href="#cdk-pipelines-github.JsonPatch.move">move</a></code> | Moves a value from one location to the other. |
| <code><a href="#cdk-pipelines-github.JsonPatch.remove">remove</a></code> | Removes a value from an object or array. |
| <code><a href="#cdk-pipelines-github.JsonPatch.replace">replace</a></code> | Replaces a value. |
| <code><a href="#cdk-pipelines-github.JsonPatch.test">test</a></code> | Tests that the specified value is set in the document. |

---

##### `add` <a name="add" id="cdk-pipelines-github.JsonPatch.add"></a>

```typescript
import { JsonPatch } from 'cdk-pipelines-github'

JsonPatch.add(path: string, value: any)
```

Adds a value to an object or inserts it into an array.

In the case of an
array, the value is inserted before the given index. The - character can be
used instead of an index to insert at the end of an array.

*Example*

```typescript
JsonPatch.add('/biscuits/1', { "name": "Ginger Nut" })
```


###### `path`<sup>Required</sup> <a name="path" id="cdk-pipelines-github.JsonPatch.add.parameter.path"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="cdk-pipelines-github.JsonPatch.add.parameter.value"></a>

- *Type:* any

---

##### `apply` <a name="apply" id="cdk-pipelines-github.JsonPatch.apply"></a>

```typescript
import { JsonPatch } from 'cdk-pipelines-github'

JsonPatch.apply(document: any, ops: JsonPatch)
```

Applies a set of JSON-Patch (RFC-6902) operations to `document` and returns the result.

###### `document`<sup>Required</sup> <a name="document" id="cdk-pipelines-github.JsonPatch.apply.parameter.document"></a>

- *Type:* any

The document to patch.

---

###### `ops`<sup>Required</sup> <a name="ops" id="cdk-pipelines-github.JsonPatch.apply.parameter.ops"></a>

- *Type:* <a href="#cdk-pipelines-github.JsonPatch">JsonPatch</a>

The operations to apply.

---

##### `copy` <a name="copy" id="cdk-pipelines-github.JsonPatch.copy"></a>

```typescript
import { JsonPatch } from 'cdk-pipelines-github'

JsonPatch.copy(from: string, path: string)
```

Copies a value from one location to another within the JSON document.

Both
from and path are JSON Pointers.

*Example*

```typescript
JsonPatch.copy('/biscuits/0', '/best_biscuit')
```


###### `from`<sup>Required</sup> <a name="from" id="cdk-pipelines-github.JsonPatch.copy.parameter.from"></a>

- *Type:* string

---

###### `path`<sup>Required</sup> <a name="path" id="cdk-pipelines-github.JsonPatch.copy.parameter.path"></a>

- *Type:* string

---

##### `move` <a name="move" id="cdk-pipelines-github.JsonPatch.move"></a>

```typescript
import { JsonPatch } from 'cdk-pipelines-github'

JsonPatch.move(from: string, path: string)
```

Moves a value from one location to the other.

Both from and path are JSON Pointers.

*Example*

```typescript
JsonPatch.move('/biscuits', '/cookies')
```


###### `from`<sup>Required</sup> <a name="from" id="cdk-pipelines-github.JsonPatch.move.parameter.from"></a>

- *Type:* string

---

###### `path`<sup>Required</sup> <a name="path" id="cdk-pipelines-github.JsonPatch.move.parameter.path"></a>

- *Type:* string

---

##### `remove` <a name="remove" id="cdk-pipelines-github.JsonPatch.remove"></a>

```typescript
import { JsonPatch } from 'cdk-pipelines-github'

JsonPatch.remove(path: string)
```

Removes a value from an object or array.

*Example*

```typescript
JsonPatch.remove('/biscuits/0')
```


###### `path`<sup>Required</sup> <a name="path" id="cdk-pipelines-github.JsonPatch.remove.parameter.path"></a>

- *Type:* string

---

##### `replace` <a name="replace" id="cdk-pipelines-github.JsonPatch.replace"></a>

```typescript
import { JsonPatch } from 'cdk-pipelines-github'

JsonPatch.replace(path: string, value: any)
```

Replaces a value.

Equivalent to a “remove” followed by an “add”.

*Example*

```typescript
JsonPatch.replace('/biscuits/0/name', 'Chocolate Digestive')
```


###### `path`<sup>Required</sup> <a name="path" id="cdk-pipelines-github.JsonPatch.replace.parameter.path"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="cdk-pipelines-github.JsonPatch.replace.parameter.value"></a>

- *Type:* any

---

##### `test` <a name="test" id="cdk-pipelines-github.JsonPatch.test"></a>

```typescript
import { JsonPatch } from 'cdk-pipelines-github'

JsonPatch.test(path: string, value: any)
```

Tests that the specified value is set in the document.

If the test fails,
then the patch as a whole should not apply.

*Example*

```typescript
JsonPatch.test('/best_biscuit/name', 'Choco Leibniz')
```


###### `path`<sup>Required</sup> <a name="path" id="cdk-pipelines-github.JsonPatch.test.parameter.path"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="cdk-pipelines-github.JsonPatch.test.parameter.value"></a>

- *Type:* any

---



### Runner <a name="Runner" id="cdk-pipelines-github.Runner"></a>

The type of runner to run the job on.

Can be GitHub or Self-hosted.
In case of self-hosted, a list of labels can be supplied.


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.Runner.selfHosted">selfHosted</a></code> | Creates a runner instance that sets runsOn to `self-hosted`. |

---

##### `selfHosted` <a name="selfHosted" id="cdk-pipelines-github.Runner.selfHosted"></a>

```typescript
import { Runner } from 'cdk-pipelines-github'

Runner.selfHosted(labels: string[])
```

Creates a runner instance that sets runsOn to `self-hosted`.

Additional labels can be supplied. There is no need to supply `self-hosted` as a label explicitly.

###### `labels`<sup>Required</sup> <a name="labels" id="cdk-pipelines-github.Runner.selfHosted.parameter.labels"></a>

- *Type:* string[]

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.Runner.property.runsOn">runsOn</a></code> | <code>string \| string[]</code> | *No description.* |

---

##### `runsOn`<sup>Required</sup> <a name="runsOn" id="cdk-pipelines-github.Runner.property.runsOn"></a>

```typescript
public readonly runsOn: string | string[];
```

- *Type:* string | string[]

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.Runner.property.MACOS_LATEST">MACOS_LATEST</a></code> | <code><a href="#cdk-pipelines-github.Runner">Runner</a></code> | Runner instance that sets runsOn to `macos-latest`. |
| <code><a href="#cdk-pipelines-github.Runner.property.UBUNTU_LATEST">UBUNTU_LATEST</a></code> | <code><a href="#cdk-pipelines-github.Runner">Runner</a></code> | Runner instance that sets runsOn to `ubuntu-latest`. |
| <code><a href="#cdk-pipelines-github.Runner.property.WINDOWS_LATEST">WINDOWS_LATEST</a></code> | <code><a href="#cdk-pipelines-github.Runner">Runner</a></code> | Runner instance that sets runsOn to `windows-latest`. |

---

##### `MACOS_LATEST`<sup>Required</sup> <a name="MACOS_LATEST" id="cdk-pipelines-github.Runner.property.MACOS_LATEST"></a>

```typescript
public readonly MACOS_LATEST: Runner;
```

- *Type:* <a href="#cdk-pipelines-github.Runner">Runner</a>

Runner instance that sets runsOn to `macos-latest`.

---

##### `UBUNTU_LATEST`<sup>Required</sup> <a name="UBUNTU_LATEST" id="cdk-pipelines-github.Runner.property.UBUNTU_LATEST"></a>

```typescript
public readonly UBUNTU_LATEST: Runner;
```

- *Type:* <a href="#cdk-pipelines-github.Runner">Runner</a>

Runner instance that sets runsOn to `ubuntu-latest`.

---

##### `WINDOWS_LATEST`<sup>Required</sup> <a name="WINDOWS_LATEST" id="cdk-pipelines-github.Runner.property.WINDOWS_LATEST"></a>

```typescript
public readonly WINDOWS_LATEST: Runner;
```

- *Type:* <a href="#cdk-pipelines-github.Runner">Runner</a>

Runner instance that sets runsOn to `windows-latest`.

---

### YamlFile <a name="YamlFile" id="cdk-pipelines-github.YamlFile"></a>

Represents a Yaml File.

#### Initializers <a name="Initializers" id="cdk-pipelines-github.YamlFile.Initializer"></a>

```typescript
import { YamlFile } from 'cdk-pipelines-github'

new YamlFile(filePath: string, options?: YamlFileOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.YamlFile.Initializer.parameter.filePath">filePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-pipelines-github.YamlFile.Initializer.parameter.options">options</a></code> | <code><a href="#cdk-pipelines-github.YamlFileOptions">YamlFileOptions</a></code> | *No description.* |

---

##### `filePath`<sup>Required</sup> <a name="filePath" id="cdk-pipelines-github.YamlFile.Initializer.parameter.filePath"></a>

- *Type:* string

---

##### `options`<sup>Optional</sup> <a name="options" id="cdk-pipelines-github.YamlFile.Initializer.parameter.options"></a>

- *Type:* <a href="#cdk-pipelines-github.YamlFileOptions">YamlFileOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.YamlFile.patch">patch</a></code> | Applies an RFC 6902 JSON-patch to the synthesized object file. See https://datatracker.ietf.org/doc/html/rfc6902 for more information. |
| <code><a href="#cdk-pipelines-github.YamlFile.toYaml">toYaml</a></code> | Returns the patched yaml file. |
| <code><a href="#cdk-pipelines-github.YamlFile.update">update</a></code> | Update the output object. |
| <code><a href="#cdk-pipelines-github.YamlFile.writeFile">writeFile</a></code> | Write the patched yaml file to the specified location. |

---

##### `patch` <a name="patch" id="cdk-pipelines-github.YamlFile.patch"></a>

```typescript
public patch(patches: JsonPatch): void
```

Applies an RFC 6902 JSON-patch to the synthesized object file. See https://datatracker.ietf.org/doc/html/rfc6902 for more information.

For example, with the following yaml file
```yaml
name: deploy
on:
   push:
     branches:
       - main
   workflow_dispatch: {}
...
```

modified in the following way:

```ts
declare const pipeline: GitHubWorkflow;
pipeline.workflowFile.patch(JsonPatch.add("/on/workflow_call", "{}"));
pipeline.workflowFile.patch(JsonPatch.remove("/on/workflow_dispatch"));
```

would result in the following yaml file:

```yaml
name: deploy
on:
   push:
     branches:
       - main
   workflow_call: {}
...
```

###### `patches`<sup>Required</sup> <a name="patches" id="cdk-pipelines-github.YamlFile.patch.parameter.patches"></a>

- *Type:* <a href="#cdk-pipelines-github.JsonPatch">JsonPatch</a>

The patch operations to apply.

---

##### `toYaml` <a name="toYaml" id="cdk-pipelines-github.YamlFile.toYaml"></a>

```typescript
public toYaml(): string
```

Returns the patched yaml file.

##### `update` <a name="update" id="cdk-pipelines-github.YamlFile.update"></a>

```typescript
public update(obj: any): void
```

Update the output object.

###### `obj`<sup>Required</sup> <a name="obj" id="cdk-pipelines-github.YamlFile.update.parameter.obj"></a>

- *Type:* any

---

##### `writeFile` <a name="writeFile" id="cdk-pipelines-github.YamlFile.writeFile"></a>

```typescript
public writeFile(): void
```

Write the patched yaml file to the specified location.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-pipelines-github.YamlFile.property.commentAtTop">commentAtTop</a></code> | <code>string</code> | A comment to be added to the top of the YAML file. |

---

##### `commentAtTop`<sup>Optional</sup> <a name="commentAtTop" id="cdk-pipelines-github.YamlFile.property.commentAtTop"></a>

```typescript
public readonly commentAtTop: string;
```

- *Type:* string

A comment to be added to the top of the YAML file.

Can be multiline. All non-empty line are pefixed with '# '. Empty lines are kept, but not commented.

For example:
```ts
declare const pipeline: GitHubWorkflow;
pipeline.workflowFile.commentAtTop =
`AUTOGENERATED FILE, DO NOT EDIT!
See ReadMe.md
`;
```

Results in YAML:
```yaml
# AUTOGENERATED FILE, DO NOT EDIT!
# See ReadMe.md

name: deploy
...
```

---



## Enums <a name="Enums" id="Enums"></a>

### JobPermission <a name="JobPermission" id="cdk-pipelines-github.JobPermission"></a>

Access level for workflow permission scopes.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.JobPermission.READ">READ</a></code> | Read-only access. |
| <code><a href="#cdk-pipelines-github.JobPermission.WRITE">WRITE</a></code> | Read-write access. |
| <code><a href="#cdk-pipelines-github.JobPermission.NONE">NONE</a></code> | No access at all. |

---

##### `READ` <a name="READ" id="cdk-pipelines-github.JobPermission.READ"></a>

Read-only access.

---


##### `WRITE` <a name="WRITE" id="cdk-pipelines-github.JobPermission.WRITE"></a>

Read-write access.

---


##### `NONE` <a name="NONE" id="cdk-pipelines-github.JobPermission.NONE"></a>

No access at all.

---


### StackCapabilities <a name="StackCapabilities" id="cdk-pipelines-github.StackCapabilities"></a>

Acknowledge IAM resources in AWS CloudFormation templates.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#capabilities](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#capabilities)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-pipelines-github.StackCapabilities.IAM">IAM</a></code> | Acknowledge your stack includes IAM resources. |
| <code><a href="#cdk-pipelines-github.StackCapabilities.NAMED_IAM">NAMED_IAM</a></code> | Acknowledge your stack includes custom names for IAM resources. |
| <code><a href="#cdk-pipelines-github.StackCapabilities.AUTO_EXPAND">AUTO_EXPAND</a></code> | Acknowledge your stack contains one or more macros. |

---

##### `IAM` <a name="IAM" id="cdk-pipelines-github.StackCapabilities.IAM"></a>

Acknowledge your stack includes IAM resources.

---


##### `NAMED_IAM` <a name="NAMED_IAM" id="cdk-pipelines-github.StackCapabilities.NAMED_IAM"></a>

Acknowledge your stack includes custom names for IAM resources.

---


##### `AUTO_EXPAND` <a name="AUTO_EXPAND" id="cdk-pipelines-github.StackCapabilities.AUTO_EXPAND"></a>

Acknowledge your stack contains one or more macros.

---

