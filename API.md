# API Reference

**Classes**

Name|Description
----|-----------
[AwsCredentials](#cdk-pipelines-github-awscredentials)|Provides AWS credenitals to the pipeline jobs.
[AwsCredentialsProvider](#cdk-pipelines-github-awscredentialsprovider)|AWS credential provider.
[DockerCredential](#cdk-pipelines-github-dockercredential)|Represents a credential used to authenticate to a docker registry.
[GitHubActionRole](#cdk-pipelines-github-githubactionrole)|Creates or references a GitHub OIDC provider and accompanying role that trusts the provider.
[GitHubActionStep](#cdk-pipelines-github-githubactionstep)|Specifies a GitHub Action as a step in the pipeline.
[GitHubWorkflow](#cdk-pipelines-github-githubworkflow)|CDK Pipelines for GitHub workflows.
[JsonPatch](#cdk-pipelines-github-jsonpatch)|Utility for applying RFC-6902 JSON-Patch to a document.
[Runner](#cdk-pipelines-github-runner)|The type of runner to run the job on.
[YamlFile](#cdk-pipelines-github-yamlfile)|Represents a Yaml File.


**Structs**

Name|Description
----|-----------
[AddGitHubStageOptions](#cdk-pipelines-github-addgithubstageoptions)|Options to pass to `addStageWithGitHubOpts`.
[AwsCredentialsSecrets](#cdk-pipelines-github-awscredentialssecrets)|Names of secrets for AWS credentials.
[CheckRunOptions](#cdk-pipelines-github-checkrunoptions)|Check run options.
[CheckSuiteOptions](#cdk-pipelines-github-checksuiteoptions)|Check suite options.
[ContainerCredentials](#cdk-pipelines-github-containercredentials)|Credentials to use to authenticate to Docker registries.
[ContainerOptions](#cdk-pipelines-github-containeroptions)|Options petaining to container environments.
[CreateOptions](#cdk-pipelines-github-createoptions)|The Create event accepts no options.
[CronScheduleOptions](#cdk-pipelines-github-cronscheduleoptions)|CRON schedule options.
[DeleteOptions](#cdk-pipelines-github-deleteoptions)|The Delete event accepts no options.
[DeploymentOptions](#cdk-pipelines-github-deploymentoptions)|The Deployment event accepts no options.
[DeploymentStatusOptions](#cdk-pipelines-github-deploymentstatusoptions)|The Deployment status event accepts no options.
[DockerHubCredentialSecrets](#cdk-pipelines-github-dockerhubcredentialsecrets)|Locations of GitHub Secrets used to authenticate to DockerHub.
[ExternalDockerCredentialSecrets](#cdk-pipelines-github-externaldockercredentialsecrets)|Generic structure to supply the locations of GitHub Secrets used to authenticate to a docker registry.
[ForkOptions](#cdk-pipelines-github-forkoptions)|The Fork event accepts no options.
[GitHubActionRoleProps](#cdk-pipelines-github-githubactionroleprops)|Properties for the GitHubActionRole construct.
[GitHubActionStepProps](#cdk-pipelines-github-githubactionstepprops)|*No description*
[GitHubSecretsProviderProps](#cdk-pipelines-github-githubsecretsproviderprops)|Locations of GitHub Secrets used to authenticate to AWS.
[GitHubWorkflowProps](#cdk-pipelines-github-githubworkflowprops)|Props for `GitHubWorkflow`.
[GollumOptions](#cdk-pipelines-github-gollumoptions)|The Gollum event accepts no options.
[IssueCommentOptions](#cdk-pipelines-github-issuecommentoptions)|Issue comment options.
[IssuesOptions](#cdk-pipelines-github-issuesoptions)|Issues options.
[Job](#cdk-pipelines-github-job)|A GitHub Workflow job definition.
[JobDefaults](#cdk-pipelines-github-jobdefaults)|Default settings for all steps in the job.
[JobMatrix](#cdk-pipelines-github-jobmatrix)|A job matrix.
[JobPermissions](#cdk-pipelines-github-jobpermissions)|The available scopes and access values for workflow permissions.
[JobSettings](#cdk-pipelines-github-jobsettings)|Job level settings applied to all jobs in the workflow.
[JobStep](#cdk-pipelines-github-jobstep)|A job step.
[JobStepOutput](#cdk-pipelines-github-jobstepoutput)|An output binding for a job.
[JobStrategy](#cdk-pipelines-github-jobstrategy)|A strategy creates a build matrix for your jobs.
[LabelOptions](#cdk-pipelines-github-labeloptions)|label options.
[MilestoneOptions](#cdk-pipelines-github-milestoneoptions)|Milestone options.
[OpenIdConnectProviderProps](#cdk-pipelines-github-openidconnectproviderprops)|Role to assume using OpenId Connect.
[PageBuildOptions](#cdk-pipelines-github-pagebuildoptions)|The Page build event accepts no options.
[ProjectCardOptions](#cdk-pipelines-github-projectcardoptions)|Project card options.
[ProjectColumnOptions](#cdk-pipelines-github-projectcolumnoptions)|Probject column options.
[ProjectOptions](#cdk-pipelines-github-projectoptions)|Project options.
[PublicOptions](#cdk-pipelines-github-publicoptions)|The Public event accepts no options.
[PullRequestOptions](#cdk-pipelines-github-pullrequestoptions)|Pull request options.
[PullRequestReviewCommentOptions](#cdk-pipelines-github-pullrequestreviewcommentoptions)|Pull request review comment options.
[PullRequestReviewOptions](#cdk-pipelines-github-pullrequestreviewoptions)|Pull request review options.
[PullRequestTargetOptions](#cdk-pipelines-github-pullrequesttargetoptions)|Pull request target options.
[PushOptions](#cdk-pipelines-github-pushoptions)|Options for push-like events.
[RegistryPackageOptions](#cdk-pipelines-github-registrypackageoptions)|Registry package options.
[ReleaseOptions](#cdk-pipelines-github-releaseoptions)|Release options.
[RepositoryDispatchOptions](#cdk-pipelines-github-repositorydispatchoptions)|Repository dispatch options.
[RunSettings](#cdk-pipelines-github-runsettings)|Run settings for a job.
[StatusOptions](#cdk-pipelines-github-statusoptions)|The Status event accepts no options.
[WatchOptions](#cdk-pipelines-github-watchoptions)|Watch options.
[WorkflowDispatchOptions](#cdk-pipelines-github-workflowdispatchoptions)|The Workflow dispatch event accepts no options.
[WorkflowRunOptions](#cdk-pipelines-github-workflowrunoptions)|Workflow run options.
[WorkflowTriggers](#cdk-pipelines-github-workflowtriggers)|The set of available triggers for GitHub Workflows.
[YamlFileOptions](#cdk-pipelines-github-yamlfileoptions)|Options for `YamlFile`.


**Enums**

Name|Description
----|-----------
[JobPermission](#cdk-pipelines-github-jobpermission)|Access level for workflow permission scopes.
[StackCapabilities](#cdk-pipelines-github-stackcapabilities)|Acknowledge IAM resources in AWS CloudFormation templates.



## class AwsCredentials 🔹 <a id="cdk-pipelines-github-awscredentials"></a>

Provides AWS credenitals to the pipeline jobs.


### Initializer




```ts
new AwsCredentials()
```



### Methods


#### *static* fromGitHubSecrets(props?)🔹 <a id="cdk-pipelines-github-awscredentials-fromgithubsecrets"></a>

Reference credential secrets to authenticate with AWS.

This method assumes
that your credentials will be stored as long-lived GitHub Secrets.

```ts
static fromGitHubSecrets(props?: GitHubSecretsProviderProps): AwsCredentialsProvider
```

* **props** (<code>[GitHubSecretsProviderProps](#cdk-pipelines-github-githubsecretsproviderprops)</code>)  *No description*
  * **accessKeyId** (<code>string</code>)  *No description* 
  * **secretAccessKey** (<code>string</code>)  *No description* 
  * **sessionToken** (<code>string</code>)  *No description* __*Default*__: no session token is used

__Returns__:
* <code>[AwsCredentialsProvider](#cdk-pipelines-github-awscredentialsprovider)</code>

#### *static* fromOpenIdConnect(props)🔹 <a id="cdk-pipelines-github-awscredentials-fromopenidconnect"></a>

Provide AWS credentials using OpenID Connect.

```ts
static fromOpenIdConnect(props: OpenIdConnectProviderProps): AwsCredentialsProvider
```

* **props** (<code>[OpenIdConnectProviderProps](#cdk-pipelines-github-openidconnectproviderprops)</code>)  *No description*
  * **gitHubActionRoleArn** (<code>string</code>)  A role that utilizes the GitHub OIDC Identity Provider in your AWS account. 
  * **roleSessionName** (<code>string</code>)  The role session name to use when assuming the role. __*Default*__: no role session name

__Returns__:
* <code>[AwsCredentialsProvider](#cdk-pipelines-github-awscredentialsprovider)</code>

#### *static* runnerHasPreconfiguredCreds()🔹 <a id="cdk-pipelines-github-awscredentials-runnerhaspreconfiguredcreds"></a>

Don't provide any AWS credentials, use this if runners have preconfigured credentials.

```ts
static runnerHasPreconfiguredCreds(): AwsCredentialsProvider
```


__Returns__:
* <code>[AwsCredentialsProvider](#cdk-pipelines-github-awscredentialsprovider)</code>



## class AwsCredentialsProvider 🔹 <a id="cdk-pipelines-github-awscredentialsprovider"></a>

AWS credential provider.

__Obtainable from__: [AwsCredentials](#cdk-pipelines-github-awscredentials).[fromGitHubSecrets](#cdk-pipelines-github-awscredentials#cdk-pipelines-github-awscredentials-fromgithubsecrets)(), [AwsCredentials](#cdk-pipelines-github-awscredentials).[fromOpenIdConnect](#cdk-pipelines-github-awscredentials#cdk-pipelines-github-awscredentials-fromopenidconnect)(), [AwsCredentials](#cdk-pipelines-github-awscredentials).[runnerHasPreconfiguredCreds](#cdk-pipelines-github-awscredentials#cdk-pipelines-github-awscredentials-runnerhaspreconfiguredcreds)()

### Initializer




```ts
new AwsCredentialsProvider()
```



### Methods


#### credentialSteps(region, assumeRoleArn?)🔹 <a id="cdk-pipelines-github-awscredentialsprovider-credentialsteps"></a>



```ts
credentialSteps(region: string, assumeRoleArn?: string): Array<JobStep>
```

* **region** (<code>string</code>)  *No description*
* **assumeRoleArn** (<code>string</code>)  *No description*

__Returns__:
* <code>Array<[JobStep](#cdk-pipelines-github-jobstep)></code>

#### jobPermission()🔹 <a id="cdk-pipelines-github-awscredentialsprovider-jobpermission"></a>



```ts
jobPermission(): JobPermission
```


__Returns__:
* <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code>



## class DockerCredential 🔹 <a id="cdk-pipelines-github-dockercredential"></a>

Represents a credential used to authenticate to a docker registry.

Uses the official Docker Login GitHub Action to authenticate.



### Properties


Name | Type | Description 
-----|------|-------------
**name**🔹 | <code>string</code> | <span></span>
**passwordKey**?🔹 | <code>string</code> | __*Optional*__
**registry**?🔹 | <code>string</code> | __*Optional*__
**usernameKey**?🔹 | <code>string</code> | __*Optional*__

### Methods


#### *static* customRegistry(registry, creds)🔹 <a id="cdk-pipelines-github-dockercredential-customregistry"></a>

Create a credential for a custom registry.

This method assumes that you will have long-lived
GitHub Secrets stored under the usernameKey and passwordKey that will authenticate to the
registry you provide.

```ts
static customRegistry(registry: string, creds: ExternalDockerCredentialSecrets): DockerCredential
```

* **registry** (<code>string</code>)  *No description*
* **creds** (<code>[ExternalDockerCredentialSecrets](#cdk-pipelines-github-externaldockercredentialsecrets)</code>)  *No description*
  * **passwordKey** (<code>string</code>)  The key of the GitHub Secret containing your registry password. 
  * **usernameKey** (<code>string</code>)  The key of the GitHub Secret containing your registry username. 

__Returns__:
* <code>[DockerCredential](#cdk-pipelines-github-dockercredential)</code>

#### *static* dockerHub(creds?)🔹 <a id="cdk-pipelines-github-dockercredential-dockerhub"></a>

Reference credential secrets to authenticate to DockerHub.

This method assumes
that your credentials will be stored as long-lived GitHub Secrets under the
usernameKey and personalAccessTokenKey.

The default for usernameKey is `DOCKERHUB_USERNAME`. The default for personalAccessTokenKey
is `DOCKERHUB_TOKEN`. If you do not set these values, your credentials should be
found in your GitHub Secrets under these default keys.

```ts
static dockerHub(creds?: DockerHubCredentialSecrets): DockerCredential
```

* **creds** (<code>[DockerHubCredentialSecrets](#cdk-pipelines-github-dockerhubcredentialsecrets)</code>)  *No description*
  * **personalAccessTokenKey** (<code>string</code>)  The key of the GitHub Secret containing the DockerHub personal access token. __*Default*__: 'DOCKERHUB_TOKEN'
  * **usernameKey** (<code>string</code>)  The key of the GitHub Secret containing the DockerHub username. __*Default*__: 'DOCKERHUB_USERNAME'

__Returns__:
* <code>[DockerCredential](#cdk-pipelines-github-dockercredential)</code>

#### *static* ecr(registry)🔹 <a id="cdk-pipelines-github-dockercredential-ecr"></a>

Create a credential for ECR.

This method will reuse your AWS credentials to log in to AWS.
Your AWS credentials are already used to deploy your CDK stacks. It can be supplied via
GitHub Secrets or using an IAM role that trusts the GitHub OIDC identity provider.

NOTE - All ECR repositories in the same account and region share a domain name
(e.g., 0123456789012.dkr.ecr.eu-west-1.amazonaws.com), and can only have one associated
set of credentials (and DockerCredential). Attempting to associate one set of credentials
with one ECR repo and another with another ECR repo in the same account and region will
result in failures when using these credentials in the pipeline.

```ts
static ecr(registry: string): DockerCredential
```

* **registry** (<code>string</code>)  *No description*

__Returns__:
* <code>[DockerCredential](#cdk-pipelines-github-dockercredential)</code>



## class GitHubActionRole 🔹 <a id="cdk-pipelines-github-githubactionrole"></a>

Creates or references a GitHub OIDC provider and accompanying role that trusts the provider.

This role can be used to authenticate against AWS instead of using long-lived AWS user credentials
stored in GitHub secrets.

You can do this manually in the console, or create a separate stack that uses this construct.
You must `cdk deploy` once (with your normal AWS credentials) to have this role created for you.

You can then make note of the role arn in the stack output and send it into the Github Workflow app via
the `gitHubActionRoleArn` property. The role arn will be `arn:aws:iam::<accountId>:role/GithubActionRole`.

__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new GitHubActionRole(scope: Construct, id: string, props: GitHubActionRoleProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[GitHubActionRoleProps](#cdk-pipelines-github-githubactionroleprops)</code>)  *No description*
  * **repos** (<code>Array<string></code>)  A list of GitHub repositories you want to be able to access the IAM role. 
  * **provider** (<code>[aws_iam.IOpenIdConnectProvider](#aws-cdk-lib-aws-iam-iopenidconnectprovider)</code>)  The GitHub OpenId Connect Provider. Must have provider url `https://token.actions.githubusercontent.com`. The audience must be `sts:amazonaws.com`. __*Default*__: a provider is created for you.
  * **roleName** (<code>string</code>)  The name of the Oidc role. __*Default*__: 'GitHubActionRole'



### Properties


Name | Type | Description 
-----|------|-------------
**role**🔹 | <code>[aws_iam.IRole](#aws-cdk-lib-aws-iam-irole)</code> | The role that gets created.

### Methods


#### *static* existingGitHubActionsProvider(scope)🔹 <a id="cdk-pipelines-github-githubactionrole-existinggithubactionsprovider"></a>

Reference an existing GitHub Actions provider.

You do not need to pass in an arn because the arn for such
a provider is always the same.

```ts
static existingGitHubActionsProvider(scope: Construct): IOpenIdConnectProvider
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*

__Returns__:
* <code>[aws_iam.IOpenIdConnectProvider](#aws-cdk-lib-aws-iam-iopenidconnectprovider)</code>



## class GitHubActionStep 🔹 <a id="cdk-pipelines-github-githubactionstep"></a>

Specifies a GitHub Action as a step in the pipeline.

__Implements__: [pipelines.IFileSetProducer](#aws-cdk-lib-pipelines-ifilesetproducer)
__Extends__: [pipelines.Step](#aws-cdk-lib-pipelines-step)

### Initializer




```ts
new GitHubActionStep(id: string, props: GitHubActionStepProps)
```

* **id** (<code>string</code>)  *No description*
* **props** (<code>[GitHubActionStepProps](#cdk-pipelines-github-githubactionstepprops)</code>)  *No description*
  * **jobSteps** (<code>Array<[JobStep](#cdk-pipelines-github-jobstep)></code>)  The Job steps. 
  * **env** (<code>Map<string, string></code>)  Environment variables to set. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**env**🔹 | <code>Map<string, string></code> | <span></span>
**jobSteps**🔹 | <code>Array<[JobStep](#cdk-pipelines-github-jobstep)></code> | <span></span>



## class GitHubWorkflow 🔹 <a id="cdk-pipelines-github-githubworkflow"></a>

CDK Pipelines for GitHub workflows.

__Implements__: [IConstruct](#constructs-iconstruct), [IDependable](#constructs-idependable)
__Extends__: [pipelines.PipelineBase](#aws-cdk-lib-pipelines-pipelinebase)

### Initializer




```ts
new GitHubWorkflow(scope: Construct, id: string, props: GitHubWorkflowProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[GitHubWorkflowProps](#cdk-pipelines-github-githubworkflowprops)</code>)  *No description*
  * **synth** (<code>[pipelines.IFileSetProducer](#aws-cdk-lib-pipelines-ifilesetproducer)</code>)  The build step that produces the CDK Cloud Assembly. 
  * **awsCredentials** (<code>[AwsCredentialsSecrets](#cdk-pipelines-github-awscredentialssecrets)</code>)  Names of GitHub repository secrets that include AWS credentials for deployment. __*Default*__: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
  * **awsCreds** (<code>[AwsCredentialsProvider](#cdk-pipelines-github-awscredentialsprovider)</code>)  Configure provider for AWS credentials used for deployment. __*Default*__: Get AWS credentials from GitHub secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
  * **buildContainer** (<code>[ContainerOptions](#cdk-pipelines-github-containeroptions)</code>)  Build container options. __*Default*__: GitHub defaults
  * **cdkCliVersion** (<code>string</code>)  Version of the CDK CLI to use. __*Default*__: automatic
  * **dockerCredentials** (<code>Array<[DockerCredential](#cdk-pipelines-github-dockercredential)></code>)  The Docker Credentials to use to login. __*Optional*__
  * **gitHubActionRoleArn** (<code>string</code>)  A role that utilizes the GitHub OIDC Identity Provider in your AWS account. __*Default*__: GitHub repository secrets are used instead of OpenId Connect role.
  * **jobSettings** (<code>[JobSettings](#cdk-pipelines-github-jobsettings)</code>)  Job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs. __*Optional*__
  * **postBuildSteps** (<code>Array<[JobStep](#cdk-pipelines-github-jobstep)></code>)  GitHub workflow steps to execute after build. __*Default*__: []
  * **preBuildSteps** (<code>Array<[JobStep](#cdk-pipelines-github-jobstep)></code>)  GitHub workflow steps to execute before build. __*Default*__: []
  * **preSynthed** (<code>boolean</code>)  Indicates if the repository already contains a synthesized `cdk.out` directory, in which case we will simply checkout the repo in jobs that require `cdk.out`. __*Default*__: false
  * **publishAssetsAuthRegion** (<code>string</code>)  Will assume the GitHubActionRole in this region when publishing assets. __*Default*__: "us-west-2"
  * **runner** (<code>[Runner](#cdk-pipelines-github-runner)</code>)  The type of runner to run the job on. __*Default*__: Runner.UBUNTU_LATEST
  * **workflowName** (<code>string</code>)  Name of the workflow. __*Default*__: "deploy"
  * **workflowPath** (<code>string</code>)  File path for the GitHub workflow. __*Default*__: ".github/workflows/deploy.yml"
  * **workflowTriggers** (<code>[WorkflowTriggers](#cdk-pipelines-github-workflowtriggers)</code>)  GitHub workflow triggers. __*Default*__: By default, workflow is triggered on push to the `main` branch and can also be triggered manually (`workflow_dispatch`).



### Properties


Name | Type | Description 
-----|------|-------------
**workflowFile**🔹 | <code>[YamlFile](#cdk-pipelines-github-yamlfile)</code> | <span></span>
**workflowName**🔹 | <code>string</code> | <span></span>
**workflowPath**🔹 | <code>string</code> | <span></span>

### Methods


#### addStageWithGitHubOptions(stage, options?)🔹 <a id="cdk-pipelines-github-githubworkflow-addstagewithgithuboptions"></a>

Deploy a single Stage by itself with options for further GitHub configuration.

Add a Stage to the pipeline, to be deployed in sequence with other Stages added to the pipeline.
All Stacks in the stage will be deployed in an order automatically determined by their relative dependencies.

```ts
addStageWithGitHubOptions(stage: Stage, options?: AddGitHubStageOptions): StageDeployment
```

* **stage** (<code>[Stage](#aws-cdk-lib-stage)</code>)  *No description*
* **options** (<code>[AddGitHubStageOptions](#cdk-pipelines-github-addgithubstageoptions)</code>)  *No description*
  * **post** (<code>Array<[pipelines.Step](#aws-cdk-lib-pipelines-step)></code>)  Additional steps to run after all of the stacks in the stage. __*Default*__: No additional steps
  * **pre** (<code>Array<[pipelines.Step](#aws-cdk-lib-pipelines-step)></code>)  Additional steps to run before any of the stacks in the stage. __*Default*__: No additional steps
  * **stackSteps** (<code>Array<[pipelines.StackSteps](#aws-cdk-lib-pipelines-stacksteps)></code>)  Instructions for stack level steps. __*Default*__: No additional instructions
  * **gitHubEnvironment** (<code>string</code>)  Run the stage in a specific GitHub Environment. __*Default*__: no GitHub environment
  * **jobSettings** (<code>[JobSettings](#cdk-pipelines-github-jobsettings)</code>)  Job level settings that will be applied to all jobs in the stage. __*Optional*__
  * **stackCapabilities** (<code>Array<[StackCapabilities](#cdk-pipelines-github-stackcapabilities)></code>)  In some cases, you must explicitly acknowledge that your CloudFormation stack template contains certain capabilities in order for CloudFormation to create the stack. __*Default*__: ['CAPABILITY_IAM']

__Returns__:
* <code>[pipelines.StageDeployment](#aws-cdk-lib-pipelines-stagedeployment)</code>

#### protected doBuildPipeline()🔹 <a id="cdk-pipelines-github-githubworkflow-dobuildpipeline"></a>

Implemented by subclasses to do the actual pipeline construction.

```ts
protected doBuildPipeline(): void
```







## class JsonPatch 🔹 <a id="cdk-pipelines-github-jsonpatch"></a>

Utility for applying RFC-6902 JSON-Patch to a document.

Use the the `JsonPatch.apply(doc, ...ops)` function to apply a set of
operations to a JSON document and return the result.

Operations can be created using the factory methods `JsonPatch.add()`,
`JsonPatch.remove()`, etc.


### Methods


#### *static* add(path, value)🔹 <a id="cdk-pipelines-github-jsonpatch-add"></a>

Adds a value to an object or inserts it into an array.

In the case of an
array, the value is inserted before the given index. The - character can be
used instead of an index to insert at the end of an array.

```ts
static add(path: string, value: any): JsonPatch
```

* **path** (<code>string</code>)  *No description*
* **value** (<code>any</code>)  *No description*

__Returns__:
* <code>[JsonPatch](#cdk-pipelines-github-jsonpatch)</code>

#### *static* apply(document, ...ops)🔹 <a id="cdk-pipelines-github-jsonpatch-apply"></a>

Applies a set of JSON-Patch (RFC-6902) operations to `document` and returns the result.

```ts
static apply(document: any, ...ops: JsonPatch[]): any
```

* **document** (<code>any</code>)  The document to patch.
* **ops** (<code>[JsonPatch](#cdk-pipelines-github-jsonpatch)</code>)  The operations to apply.

__Returns__:
* <code>any</code>

#### *static* copy(from, path)🔹 <a id="cdk-pipelines-github-jsonpatch-copy"></a>

Copies a value from one location to another within the JSON document.

Both
from and path are JSON Pointers.

```ts
static copy(from: string, path: string): JsonPatch
```

* **from** (<code>string</code>)  *No description*
* **path** (<code>string</code>)  *No description*

__Returns__:
* <code>[JsonPatch](#cdk-pipelines-github-jsonpatch)</code>

#### *static* move(from, path)🔹 <a id="cdk-pipelines-github-jsonpatch-move"></a>

Moves a value from one location to the other.

Both from and path are JSON Pointers.

```ts
static move(from: string, path: string): JsonPatch
```

* **from** (<code>string</code>)  *No description*
* **path** (<code>string</code>)  *No description*

__Returns__:
* <code>[JsonPatch](#cdk-pipelines-github-jsonpatch)</code>

#### *static* remove(path)🔹 <a id="cdk-pipelines-github-jsonpatch-remove"></a>

Removes a value from an object or array.

```ts
static remove(path: string): JsonPatch
```

* **path** (<code>string</code>)  *No description*

__Returns__:
* <code>[JsonPatch](#cdk-pipelines-github-jsonpatch)</code>

#### *static* replace(path, value)🔹 <a id="cdk-pipelines-github-jsonpatch-replace"></a>

Replaces a value.

Equivalent to a “remove” followed by an “add”.

```ts
static replace(path: string, value: any): JsonPatch
```

* **path** (<code>string</code>)  *No description*
* **value** (<code>any</code>)  *No description*

__Returns__:
* <code>[JsonPatch](#cdk-pipelines-github-jsonpatch)</code>

#### *static* test(path, value)🔹 <a id="cdk-pipelines-github-jsonpatch-test"></a>

Tests that the specified value is set in the document.

If the test fails,
then the patch as a whole should not apply.

```ts
static test(path: string, value: any): JsonPatch
```

* **path** (<code>string</code>)  *No description*
* **value** (<code>any</code>)  *No description*

__Returns__:
* <code>[JsonPatch](#cdk-pipelines-github-jsonpatch)</code>



## class Runner 🔹 <a id="cdk-pipelines-github-runner"></a>

The type of runner to run the job on.

Can be GitHub or Self-hosted.
In case of self-hosted, a list of labels can be supplied.



### Properties


Name | Type | Description 
-----|------|-------------
**runsOn**🔹 | <code>string &#124; Array<string></code> | <span></span>
*static* **MACOS_LATEST**🔹 | <code>[Runner](#cdk-pipelines-github-runner)</code> | Runner instance that sets runsOn to `macos-latest`.
*static* **UBUNTU_LATEST**🔹 | <code>[Runner](#cdk-pipelines-github-runner)</code> | Runner instance that sets runsOn to `ubuntu-latest`.
*static* **WINDOWS_LATEST**🔹 | <code>[Runner](#cdk-pipelines-github-runner)</code> | Runner instance that sets runsOn to `windows-latest`.

### Methods


#### *static* selfHosted(labels)🔹 <a id="cdk-pipelines-github-runner-selfhosted"></a>

Creates a runner instance that sets runsOn to `self-hosted`.

Additional labels can be supplied. There is no need to supply `self-hosted` as a label explicitly.

```ts
static selfHosted(labels: Array<string>): Runner
```

* **labels** (<code>Array<string></code>)  *No description*

__Returns__:
* <code>[Runner](#cdk-pipelines-github-runner)</code>



## class YamlFile 🔹 <a id="cdk-pipelines-github-yamlfile"></a>

Represents a Yaml File.


### Initializer




```ts
new YamlFile(filePath: string, options?: YamlFileOptions)
```

* **filePath** (<code>string</code>)  *No description*
* **options** (<code>[YamlFileOptions](#cdk-pipelines-github-yamlfileoptions)</code>)  *No description*
  * **obj** (<code>any</code>)  The object that will be serialized. __*Default*__: {} an empty object



### Properties


Name | Type | Description 
-----|------|-------------
**commentAtTop**?🔹 | <code>string</code> | A comment to be added to the top of the YAML file.<br/>__*Optional*__

### Methods


#### patch(...patches)🔹 <a id="cdk-pipelines-github-yamlfile-patch"></a>

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

```ts
patch(...patches: JsonPatch[]): void
```

* **patches** (<code>[JsonPatch](#cdk-pipelines-github-jsonpatch)</code>)  - The patch operations to apply.




#### toYaml()🔹 <a id="cdk-pipelines-github-yamlfile-toyaml"></a>

Returns the patched yaml file.

```ts
toYaml(): string
```


__Returns__:
* <code>string</code>

#### update(obj)🔹 <a id="cdk-pipelines-github-yamlfile-update"></a>

Update the output object.

```ts
update(obj: any): void
```

* **obj** (<code>any</code>)  *No description*




#### writeFile()🔹 <a id="cdk-pipelines-github-yamlfile-writefile"></a>

Write the patched yaml file to the specified location.

```ts
writeFile(): void
```







## struct AddGitHubStageOptions 🔹 <a id="cdk-pipelines-github-addgithubstageoptions"></a>


Options to pass to `addStageWithGitHubOpts`.



Name | Type | Description 
-----|------|-------------
**gitHubEnvironment**?🔹 | <code>string</code> | Run the stage in a specific GitHub Environment.<br/>__*Default*__: no GitHub environment
**jobSettings**?🔹 | <code>[JobSettings](#cdk-pipelines-github-jobsettings)</code> | Job level settings that will be applied to all jobs in the stage.<br/>__*Optional*__
**post**?🔹 | <code>Array<[pipelines.Step](#aws-cdk-lib-pipelines-step)></code> | Additional steps to run after all of the stacks in the stage.<br/>__*Default*__: No additional steps
**pre**?🔹 | <code>Array<[pipelines.Step](#aws-cdk-lib-pipelines-step)></code> | Additional steps to run before any of the stacks in the stage.<br/>__*Default*__: No additional steps
**stackCapabilities**?🔹 | <code>Array<[StackCapabilities](#cdk-pipelines-github-stackcapabilities)></code> | In some cases, you must explicitly acknowledge that your CloudFormation stack template contains certain capabilities in order for CloudFormation to create the stack.<br/>__*Default*__: ['CAPABILITY_IAM']
**stackSteps**?🔹 | <code>Array<[pipelines.StackSteps](#aws-cdk-lib-pipelines-stacksteps)></code> | Instructions for stack level steps.<br/>__*Default*__: No additional instructions



## struct AwsCredentialsSecrets 🔹 <a id="cdk-pipelines-github-awscredentialssecrets"></a>


Names of secrets for AWS credentials.



Name | Type | Description 
-----|------|-------------
**accessKeyId**?🔹 | <code>string</code> | __*Default*__: "AWS_ACCESS_KEY_ID"
**secretAccessKey**?🔹 | <code>string</code> | __*Default*__: "AWS_SECRET_ACCESS_KEY"
**sessionToken**?🔹 | <code>string</code> | __*Default*__: no session token is used



## struct CheckRunOptions 🔹 <a id="cdk-pipelines-github-checkrunoptions"></a>


Check run options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct CheckSuiteOptions 🔹 <a id="cdk-pipelines-github-checksuiteoptions"></a>


Check suite options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct ContainerCredentials 🔹 <a id="cdk-pipelines-github-containercredentials"></a>


Credentials to use to authenticate to Docker registries.



Name | Type | Description 
-----|------|-------------
**password**🔹 | <code>string</code> | The password.
**username**🔹 | <code>string</code> | The username.



## struct ContainerOptions 🔹 <a id="cdk-pipelines-github-containeroptions"></a>


Options petaining to container environments.



Name | Type | Description 
-----|------|-------------
**image**🔹 | <code>string</code> | The Docker image to use as the container to run the action.
**credentials**?🔹 | <code>[ContainerCredentials](#cdk-pipelines-github-containercredentials)</code> | f the image's container registry requires authentication to pull the image, you can use credentials to set a map of the username and password.<br/>__*Optional*__
**env**?🔹 | <code>Map<string, string></code> | Sets a map of environment variables in the container.<br/>__*Optional*__
**options**?🔹 | <code>Array<string></code> | Additional Docker container resource options.<br/>__*Optional*__
**ports**?🔹 | <code>Array<number></code> | Sets an array of ports to expose on the container.<br/>__*Optional*__
**volumes**?🔹 | <code>Array<string></code> | Sets an array of volumes for the container to use.<br/>__*Optional*__



## struct CreateOptions 🔹 <a id="cdk-pipelines-github-createoptions"></a>


The Create event accepts no options.


## struct CronScheduleOptions 🔹 <a id="cdk-pipelines-github-cronscheduleoptions"></a>


CRON schedule options.



Name | Type | Description 
-----|------|-------------
**cron**🔹 | <code>string</code> | <span></span>



## struct DeleteOptions 🔹 <a id="cdk-pipelines-github-deleteoptions"></a>


The Delete event accepts no options.


## struct DeploymentOptions 🔹 <a id="cdk-pipelines-github-deploymentoptions"></a>


The Deployment event accepts no options.


## struct DeploymentStatusOptions 🔹 <a id="cdk-pipelines-github-deploymentstatusoptions"></a>


The Deployment status event accepts no options.


## struct DockerHubCredentialSecrets 🔹 <a id="cdk-pipelines-github-dockerhubcredentialsecrets"></a>


Locations of GitHub Secrets used to authenticate to DockerHub.



Name | Type | Description 
-----|------|-------------
**personalAccessTokenKey**?🔹 | <code>string</code> | The key of the GitHub Secret containing the DockerHub personal access token.<br/>__*Default*__: 'DOCKERHUB_TOKEN'
**usernameKey**?🔹 | <code>string</code> | The key of the GitHub Secret containing the DockerHub username.<br/>__*Default*__: 'DOCKERHUB_USERNAME'



## struct ExternalDockerCredentialSecrets 🔹 <a id="cdk-pipelines-github-externaldockercredentialsecrets"></a>


Generic structure to supply the locations of GitHub Secrets used to authenticate to a docker registry.



Name | Type | Description 
-----|------|-------------
**passwordKey**🔹 | <code>string</code> | The key of the GitHub Secret containing your registry password.
**usernameKey**🔹 | <code>string</code> | The key of the GitHub Secret containing your registry username.



## struct ForkOptions 🔹 <a id="cdk-pipelines-github-forkoptions"></a>


The Fork event accepts no options.


## struct GitHubActionRoleProps 🔹 <a id="cdk-pipelines-github-githubactionroleprops"></a>


Properties for the GitHubActionRole construct.



Name | Type | Description 
-----|------|-------------
**repos**🔹 | <code>Array<string></code> | A list of GitHub repositories you want to be able to access the IAM role.
**provider**?🔹 | <code>[aws_iam.IOpenIdConnectProvider](#aws-cdk-lib-aws-iam-iopenidconnectprovider)</code> | The GitHub OpenId Connect Provider. Must have provider url `https://token.actions.githubusercontent.com`. The audience must be `sts:amazonaws.com`.<br/>__*Default*__: a provider is created for you.
**roleName**?🔹 | <code>string</code> | The name of the Oidc role.<br/>__*Default*__: 'GitHubActionRole'



## struct GitHubActionStepProps 🔹 <a id="cdk-pipelines-github-githubactionstepprops"></a>






Name | Type | Description 
-----|------|-------------
**jobSteps**🔹 | <code>Array<[JobStep](#cdk-pipelines-github-jobstep)></code> | The Job steps.
**env**?🔹 | <code>Map<string, string></code> | Environment variables to set.<br/>__*Optional*__



## struct GitHubSecretsProviderProps 🔹 <a id="cdk-pipelines-github-githubsecretsproviderprops"></a>


Locations of GitHub Secrets used to authenticate to AWS.



Name | Type | Description 
-----|------|-------------
**accessKeyId**🔹 | <code>string</code> | <span></span>
**secretAccessKey**🔹 | <code>string</code> | <span></span>
**sessionToken**?🔹 | <code>string</code> | __*Default*__: no session token is used



## struct GitHubWorkflowProps 🔹 <a id="cdk-pipelines-github-githubworkflowprops"></a>


Props for `GitHubWorkflow`.



Name | Type | Description 
-----|------|-------------
**synth**🔹 | <code>[pipelines.IFileSetProducer](#aws-cdk-lib-pipelines-ifilesetproducer)</code> | The build step that produces the CDK Cloud Assembly.
**awsCredentials**?⚠️ | <code>[AwsCredentialsSecrets](#cdk-pipelines-github-awscredentialssecrets)</code> | Names of GitHub repository secrets that include AWS credentials for deployment.<br/>__*Default*__: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
**awsCreds**?🔹 | <code>[AwsCredentialsProvider](#cdk-pipelines-github-awscredentialsprovider)</code> | Configure provider for AWS credentials used for deployment.<br/>__*Default*__: Get AWS credentials from GitHub secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
**buildContainer**?🔹 | <code>[ContainerOptions](#cdk-pipelines-github-containeroptions)</code> | Build container options.<br/>__*Default*__: GitHub defaults
**cdkCliVersion**?🔹 | <code>string</code> | Version of the CDK CLI to use.<br/>__*Default*__: automatic
**dockerCredentials**?🔹 | <code>Array<[DockerCredential](#cdk-pipelines-github-dockercredential)></code> | The Docker Credentials to use to login.<br/>__*Optional*__
**gitHubActionRoleArn**?⚠️ | <code>string</code> | A role that utilizes the GitHub OIDC Identity Provider in your AWS account.<br/>__*Default*__: GitHub repository secrets are used instead of OpenId Connect role.
**jobSettings**?🔹 | <code>[JobSettings](#cdk-pipelines-github-jobsettings)</code> | Job level settings that will be applied to all jobs in the workflow, including synth and asset deploy jobs.<br/>__*Optional*__
**postBuildSteps**?🔹 | <code>Array<[JobStep](#cdk-pipelines-github-jobstep)></code> | GitHub workflow steps to execute after build.<br/>__*Default*__: []
**preBuildSteps**?🔹 | <code>Array<[JobStep](#cdk-pipelines-github-jobstep)></code> | GitHub workflow steps to execute before build.<br/>__*Default*__: []
**preSynthed**?🔹 | <code>boolean</code> | Indicates if the repository already contains a synthesized `cdk.out` directory, in which case we will simply checkout the repo in jobs that require `cdk.out`.<br/>__*Default*__: false
**publishAssetsAuthRegion**?🔹 | <code>string</code> | Will assume the GitHubActionRole in this region when publishing assets.<br/>__*Default*__: "us-west-2"
**runner**?🔹 | <code>[Runner](#cdk-pipelines-github-runner)</code> | The type of runner to run the job on.<br/>__*Default*__: Runner.UBUNTU_LATEST
**workflowName**?🔹 | <code>string</code> | Name of the workflow.<br/>__*Default*__: "deploy"
**workflowPath**?🔹 | <code>string</code> | File path for the GitHub workflow.<br/>__*Default*__: ".github/workflows/deploy.yml"
**workflowTriggers**?🔹 | <code>[WorkflowTriggers](#cdk-pipelines-github-workflowtriggers)</code> | GitHub workflow triggers.<br/>__*Default*__: By default, workflow is triggered on push to the `main` branch and can also be triggered manually (`workflow_dispatch`).



## struct GollumOptions 🔹 <a id="cdk-pipelines-github-gollumoptions"></a>


The Gollum event accepts no options.


## struct IssueCommentOptions 🔹 <a id="cdk-pipelines-github-issuecommentoptions"></a>


Issue comment options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct IssuesOptions 🔹 <a id="cdk-pipelines-github-issuesoptions"></a>


Issues options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct Job 🔹 <a id="cdk-pipelines-github-job"></a>


A GitHub Workflow job definition.



Name | Type | Description 
-----|------|-------------
**permissions**🔹 | <code>[JobPermissions](#cdk-pipelines-github-jobpermissions)</code> | You can modify the default permissions granted to the GITHUB_TOKEN, adding or removing access as required, so that you only allow the minimum required access.
**runsOn**🔹 | <code>string &#124; Array<string></code> | The type of machine to run the job on.
**steps**🔹 | <code>Array<[JobStep](#cdk-pipelines-github-jobstep)></code> | A job contains a sequence of tasks called steps.
**concurrency**?🔹 | <code>any</code> | Concurrency ensures that only a single job or workflow using the same concurrency group will run at a time.<br/>__*Optional*__
**container**?🔹 | <code>[ContainerOptions](#cdk-pipelines-github-containeroptions)</code> | A container to run any steps in a job that don't already specify a container.<br/>__*Optional*__
**continueOnError**?🔹 | <code>boolean</code> | Prevents a workflow run from failing when a job fails.<br/>__*Optional*__
**defaults**?🔹 | <code>[JobDefaults](#cdk-pipelines-github-jobdefaults)</code> | A map of default settings that will apply to all steps in the job.<br/>__*Optional*__
**env**?🔹 | <code>Map<string, string></code> | A map of environment variables that are available to all steps in the job.<br/>__*Optional*__
**environment**?🔹 | <code>any</code> | The environment that the job references.<br/>__*Optional*__
**if**?🔹 | <code>string</code> | You can use the if conditional to prevent a job from running unless a condition is met.<br/>__*Optional*__
**name**?🔹 | <code>string</code> | The name of the job displayed on GitHub.<br/>__*Optional*__
**needs**?🔹 | <code>Array<string></code> | Identifies any jobs that must complete successfully before this job will run.<br/>__*Optional*__
**outputs**?🔹 | <code>Map<string, string></code> | A map of outputs for a job.<br/>__*Optional*__
**services**?🔹 | <code>Map<string, [ContainerOptions](#cdk-pipelines-github-containeroptions)></code> | Used to host service containers for a job in a workflow.<br/>__*Optional*__
**strategy**?🔹 | <code>[JobStrategy](#cdk-pipelines-github-jobstrategy)</code> | A strategy creates a build matrix for your jobs.<br/>__*Optional*__
**timeoutMinutes**?🔹 | <code>number</code> | The maximum number of minutes to let a job run before GitHub automatically cancels it.<br/>__*Default*__: 360



## struct JobDefaults 🔹 <a id="cdk-pipelines-github-jobdefaults"></a>


Default settings for all steps in the job.



Name | Type | Description 
-----|------|-------------
**run**?🔹 | <code>[RunSettings](#cdk-pipelines-github-runsettings)</code> | Default run settings.<br/>__*Optional*__



## struct JobMatrix 🔹 <a id="cdk-pipelines-github-jobmatrix"></a>


A job matrix.



Name | Type | Description 
-----|------|-------------
**domain**?🔹 | <code>Map<string, Array<string>></code> | Each option you define in the matrix has a key and value.<br/>__*Optional*__
**exclude**?🔹 | <code>Array<Map<string, string>></code> | You can remove a specific configurations defined in the build matrix using the exclude option.<br/>__*Optional*__
**include**?🔹 | <code>Array<Map<string, string>></code> | You can add additional configuration options to a build matrix job that already exists.<br/>__*Optional*__



## struct JobPermissions 🔹 <a id="cdk-pipelines-github-jobpermissions"></a>


The available scopes and access values for workflow permissions.

If you
specify the access for any of these scopes, all those that are not
specified are set to `JobPermission.NONE`, instead of the default behavior
when none is specified.



Name | Type | Description 
-----|------|-------------
**actions**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**checks**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**contents**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**deployments**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**discussions**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**idToken**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**issues**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**packages**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**pullRequests**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**repositoryProjects**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**securityEvents**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__
**statuses**?🔹 | <code>[JobPermission](#cdk-pipelines-github-jobpermission)</code> | __*Optional*__



## struct JobSettings 🔹 <a id="cdk-pipelines-github-jobsettings"></a>


Job level settings applied to all jobs in the workflow.



Name | Type | Description 
-----|------|-------------
**if**?🔹 | <code>string</code> | jobs.<job_id>.if.<br/>__*Optional*__



## struct JobStep 🔹 <a id="cdk-pipelines-github-jobstep"></a>


A job step.



Name | Type | Description 
-----|------|-------------
**continueOnError**?🔹 | <code>boolean</code> | Prevents a job from failing when a step fails.<br/>__*Optional*__
**env**?🔹 | <code>Map<string, string></code> | Sets environment variables for steps to use in the runner environment.<br/>__*Optional*__
**id**?🔹 | <code>string</code> | A unique identifier for the step.<br/>__*Optional*__
**if**?🔹 | <code>string</code> | You can use the if conditional to prevent a job from running unless a condition is met.<br/>__*Optional*__
**name**?🔹 | <code>string</code> | A name for your step to display on GitHub.<br/>__*Optional*__
**run**?🔹 | <code>string</code> | Runs command-line programs using the operating system's shell.<br/>__*Optional*__
**timeoutMinutes**?🔹 | <code>number</code> | The maximum number of minutes to run the step before killing the process.<br/>__*Optional*__
**uses**?🔹 | <code>string</code> | Selects an action to run as part of a step in your job.<br/>__*Optional*__
**with**?🔹 | <code>Map<string, any></code> | A map of the input parameters defined by the action.<br/>__*Optional*__



## struct JobStepOutput 🔹 <a id="cdk-pipelines-github-jobstepoutput"></a>


An output binding for a job.



Name | Type | Description 
-----|------|-------------
**outputName**🔹 | <code>string</code> | The name of the job output that is being bound.
**stepId**🔹 | <code>string</code> | The ID of the step that exposes the output.



## struct JobStrategy 🔹 <a id="cdk-pipelines-github-jobstrategy"></a>


A strategy creates a build matrix for your jobs.

You can define different
variations to run each job in.



Name | Type | Description 
-----|------|-------------
**failFast**?🔹 | <code>boolean</code> | When set to true, GitHub cancels all in-progress jobs if any matrix job fails.<br/>__*Optional*__
**matrix**?🔹 | <code>[JobMatrix](#cdk-pipelines-github-jobmatrix)</code> | You can define a matrix of different job configurations.<br/>__*Optional*__
**maxParallel**?🔹 | <code>number</code> | The maximum number of jobs that can run simultaneously when using a matrix job strategy.<br/>__*Optional*__



## struct LabelOptions 🔹 <a id="cdk-pipelines-github-labeloptions"></a>


label options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct MilestoneOptions 🔹 <a id="cdk-pipelines-github-milestoneoptions"></a>


Milestone options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct OpenIdConnectProviderProps 🔹 <a id="cdk-pipelines-github-openidconnectproviderprops"></a>


Role to assume using OpenId Connect.



Name | Type | Description 
-----|------|-------------
**gitHubActionRoleArn**🔹 | <code>string</code> | A role that utilizes the GitHub OIDC Identity Provider in your AWS account.
**roleSessionName**?🔹 | <code>string</code> | The role session name to use when assuming the role.<br/>__*Default*__: no role session name



## struct PageBuildOptions 🔹 <a id="cdk-pipelines-github-pagebuildoptions"></a>


The Page build event accepts no options.


## struct ProjectCardOptions 🔹 <a id="cdk-pipelines-github-projectcardoptions"></a>


Project card options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct ProjectColumnOptions 🔹 <a id="cdk-pipelines-github-projectcolumnoptions"></a>


Probject column options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct ProjectOptions 🔹 <a id="cdk-pipelines-github-projectoptions"></a>


Project options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct PublicOptions 🔹 <a id="cdk-pipelines-github-publicoptions"></a>


The Public event accepts no options.


## struct PullRequestOptions 🔹 <a id="cdk-pipelines-github-pullrequestoptions"></a>


Pull request options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct PullRequestReviewCommentOptions 🔹 <a id="cdk-pipelines-github-pullrequestreviewcommentoptions"></a>


Pull request review comment options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct PullRequestReviewOptions 🔹 <a id="cdk-pipelines-github-pullrequestreviewoptions"></a>


Pull request review options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct PullRequestTargetOptions 🔹 <a id="cdk-pipelines-github-pullrequesttargetoptions"></a>


Pull request target options.



Name | Type | Description 
-----|------|-------------
**branches**?🔹 | <code>Array<string></code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.<br/>__*Optional*__
**paths**?🔹 | <code>Array<string></code> | When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths.<br/>__*Optional*__
**tags**?🔹 | <code>Array<string></code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.<br/>__*Optional*__
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct PushOptions 🔹 <a id="cdk-pipelines-github-pushoptions"></a>


Options for push-like events.



Name | Type | Description 
-----|------|-------------
**branches**?🔹 | <code>Array<string></code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.<br/>__*Optional*__
**paths**?🔹 | <code>Array<string></code> | When using the push and pull_request events, you can configure a workflow to run when at least one file does not match paths-ignore or at least one modified file matches the configured paths.<br/>__*Optional*__
**tags**?🔹 | <code>Array<string></code> | When using the push and pull_request events, you can configure a workflow to run on specific branches or tags.<br/>__*Optional*__



## struct RegistryPackageOptions 🔹 <a id="cdk-pipelines-github-registrypackageoptions"></a>


Registry package options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct ReleaseOptions 🔹 <a id="cdk-pipelines-github-releaseoptions"></a>


Release options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct RepositoryDispatchOptions 🔹 <a id="cdk-pipelines-github-repositorydispatchoptions"></a>


Repository dispatch options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct RunSettings 🔹 <a id="cdk-pipelines-github-runsettings"></a>


Run settings for a job.



Name | Type | Description 
-----|------|-------------
**shell**?🔹 | <code>string</code> | Which shell to use for running the step.<br/>__*Optional*__
**workingDirectory**?🔹 | <code>string</code> | Working directory to use when running the step.<br/>__*Optional*__



## struct StatusOptions 🔹 <a id="cdk-pipelines-github-statusoptions"></a>


The Status event accepts no options.


## struct WatchOptions 🔹 <a id="cdk-pipelines-github-watchoptions"></a>


Watch options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct WorkflowDispatchOptions 🔹 <a id="cdk-pipelines-github-workflowdispatchoptions"></a>


The Workflow dispatch event accepts no options.


## struct WorkflowRunOptions 🔹 <a id="cdk-pipelines-github-workflowrunoptions"></a>


Workflow run options.



Name | Type | Description 
-----|------|-------------
**types**?🔹 | <code>Array<string></code> | Which activity types to trigger on.<br/>__*Optional*__



## struct WorkflowTriggers 🔹 <a id="cdk-pipelines-github-workflowtriggers"></a>


The set of available triggers for GitHub Workflows.



Name | Type | Description 
-----|------|-------------
**checkRun**?🔹 | <code>[CheckRunOptions](#cdk-pipelines-github-checkrunoptions)</code> | Runs your workflow anytime the check_run event occurs.<br/>__*Optional*__
**checkSuite**?🔹 | <code>[CheckSuiteOptions](#cdk-pipelines-github-checksuiteoptions)</code> | Runs your workflow anytime the check_suite event occurs.<br/>__*Optional*__
**create**?🔹 | <code>[CreateOptions](#cdk-pipelines-github-createoptions)</code> | Runs your workflow anytime someone creates a branch or tag, which triggers the create event.<br/>__*Optional*__
**delete**?🔹 | <code>[DeleteOptions](#cdk-pipelines-github-deleteoptions)</code> | Runs your workflow anytime someone deletes a branch or tag, which triggers the delete event.<br/>__*Optional*__
**deployment**?🔹 | <code>[DeploymentOptions](#cdk-pipelines-github-deploymentoptions)</code> | Runs your workflow anytime someone creates a deployment, which triggers the deployment event.<br/>__*Optional*__
**deploymentStatus**?🔹 | <code>[DeploymentStatusOptions](#cdk-pipelines-github-deploymentstatusoptions)</code> | Runs your workflow anytime a third party provides a deployment status, which triggers the deployment_status event.<br/>__*Optional*__
**fork**?🔹 | <code>[ForkOptions](#cdk-pipelines-github-forkoptions)</code> | Runs your workflow anytime when someone forks a repository, which triggers the fork event.<br/>__*Optional*__
**gollum**?🔹 | <code>[GollumOptions](#cdk-pipelines-github-gollumoptions)</code> | Runs your workflow when someone creates or updates a Wiki page, which triggers the gollum event.<br/>__*Optional*__
**issueComment**?🔹 | <code>[IssueCommentOptions](#cdk-pipelines-github-issuecommentoptions)</code> | Runs your workflow anytime the issue_comment event occurs.<br/>__*Optional*__
**issues**?🔹 | <code>[IssuesOptions](#cdk-pipelines-github-issuesoptions)</code> | Runs your workflow anytime the issues event occurs.<br/>__*Optional*__
**label**?🔹 | <code>[LabelOptions](#cdk-pipelines-github-labeloptions)</code> | Runs your workflow anytime the label event occurs.<br/>__*Optional*__
**milestone**?🔹 | <code>[MilestoneOptions](#cdk-pipelines-github-milestoneoptions)</code> | Runs your workflow anytime the milestone event occurs.<br/>__*Optional*__
**pageBuild**?🔹 | <code>[PageBuildOptions](#cdk-pipelines-github-pagebuildoptions)</code> | Runs your workflow anytime someone pushes to a GitHub Pages-enabled branch, which triggers the page_build event.<br/>__*Optional*__
**project**?🔹 | <code>[ProjectOptions](#cdk-pipelines-github-projectoptions)</code> | Runs your workflow anytime the project event occurs.<br/>__*Optional*__
**projectCard**?🔹 | <code>[ProjectCardOptions](#cdk-pipelines-github-projectcardoptions)</code> | Runs your workflow anytime the project_card event occurs.<br/>__*Optional*__
**projectColumn**?🔹 | <code>[ProjectColumnOptions](#cdk-pipelines-github-projectcolumnoptions)</code> | Runs your workflow anytime the project_column event occurs.<br/>__*Optional*__
**public**?🔹 | <code>[PublicOptions](#cdk-pipelines-github-publicoptions)</code> | Runs your workflow anytime someone makes a private repository public, which triggers the public event.<br/>__*Optional*__
**pullRequest**?🔹 | <code>[PullRequestOptions](#cdk-pipelines-github-pullrequestoptions)</code> | Runs your workflow anytime the pull_request event occurs.<br/>__*Optional*__
**pullRequestReview**?🔹 | <code>[PullRequestReviewOptions](#cdk-pipelines-github-pullrequestreviewoptions)</code> | Runs your workflow anytime the pull_request_review event occurs.<br/>__*Optional*__
**pullRequestReviewComment**?🔹 | <code>[PullRequestReviewCommentOptions](#cdk-pipelines-github-pullrequestreviewcommentoptions)</code> | Runs your workflow anytime a comment on a pull request's unified diff is modified, which triggers the pull_request_review_comment event.<br/>__*Optional*__
**pullRequestTarget**?🔹 | <code>[PullRequestTargetOptions](#cdk-pipelines-github-pullrequesttargetoptions)</code> | This event runs in the context of the base of the pull request, rather than in the merge commit as the pull_request event does.<br/>__*Optional*__
**push**?🔹 | <code>[PushOptions](#cdk-pipelines-github-pushoptions)</code> | Runs your workflow when someone pushes to a repository branch, which triggers the push event.<br/>__*Optional*__
**registryPackage**?🔹 | <code>[RegistryPackageOptions](#cdk-pipelines-github-registrypackageoptions)</code> | Runs your workflow anytime a package is published or updated.<br/>__*Optional*__
**release**?🔹 | <code>[ReleaseOptions](#cdk-pipelines-github-releaseoptions)</code> | Runs your workflow anytime the release event occurs.<br/>__*Optional*__
**repositoryDispatch**?🔹 | <code>[RepositoryDispatchOptions](#cdk-pipelines-github-repositorydispatchoptions)</code> | You can use the GitHub API to trigger a webhook event called repository_dispatch when you want to trigger a workflow for activity that happens outside of GitHub.<br/>__*Optional*__
**schedule**?🔹 | <code>Array<[CronScheduleOptions](#cdk-pipelines-github-cronscheduleoptions)></code> | You can schedule a workflow to run at specific UTC times using POSIX cron syntax.<br/>__*Optional*__
**status**?🔹 | <code>[StatusOptions](#cdk-pipelines-github-statusoptions)</code> | Runs your workflow anytime the status of a Git commit changes, which triggers the status event.<br/>__*Optional*__
**watch**?🔹 | <code>[WatchOptions](#cdk-pipelines-github-watchoptions)</code> | Runs your workflow anytime the watch event occurs.<br/>__*Optional*__
**workflowDispatch**?🔹 | <code>[WorkflowDispatchOptions](#cdk-pipelines-github-workflowdispatchoptions)</code> | You can configure custom-defined input properties, default input values, and required inputs for the event directly in your workflow.<br/>__*Optional*__
**workflowRun**?🔹 | <code>[WorkflowRunOptions](#cdk-pipelines-github-workflowrunoptions)</code> | This event occurs when a workflow run is requested or completed, and allows you to execute a workflow based on the finished result of another workflow.<br/>__*Optional*__



## struct YamlFileOptions 🔹 <a id="cdk-pipelines-github-yamlfileoptions"></a>


Options for `YamlFile`.



Name | Type | Description 
-----|------|-------------
**obj**?🔹 | <code>any</code> | The object that will be serialized.<br/>__*Default*__: {} an empty object



## enum JobPermission 🔹 <a id="cdk-pipelines-github-jobpermission"></a>

Access level for workflow permission scopes.

Name | Description
-----|-----
**READ** 🔹|Read-only access.
**WRITE** 🔹|Read-write access.
**NONE** 🔹|No access at all.


## enum StackCapabilities 🔹 <a id="cdk-pipelines-github-stackcapabilities"></a>

Acknowledge IAM resources in AWS CloudFormation templates.

Name | Description
-----|-----
**IAM** 🔹|Acknowledge your stack includes IAM resources.
**NAMED_IAM** 🔹|Acknowledge your stack includes custom names for IAM resources.
**AUTO_EXPAND** 🔹|Acknowledge your stack contains one or more macros.


