import { CfnOutput } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * Properties for the AwsOidc construct.
 */
export interface AwsOidcProps {
  /**
   * Your Github username and repository passed in as a single string.
   * For example, `owner/repo`.
   */
  readonly repoString: string;

  /**
   * The branch of your repository that triggers Github Actions.
   *
   * @default - all branches
   */
  readonly branch?: string;

  /**
   * The name of the Oidc role.
   *
   * @default 'GithubActionRole'
   */
  readonly roleName?: string;

  /**
   * The Github OpenId Connect Provider. Must have provider url
   * `https://token.actions.githubusercontent.com`. The audience must be
   * `sts:amazonaws.com`.
   *
   * Only one such provider can be defined per account, so if you already
   * have a provider with the same url, a new provider cannot be created for you.
   *
   * @default - a provider is created for you.
   */
  readonly provider?: iam.IOpenIdConnectProvider;
}

/**
 * Creates or references a Github OIDC provider and accompanying role that trusts the provider.
 * This role can be used to authenticate against AWS instead of using long-lived AWS user credentials
 * stored in Github secrets.
 *
 * You can do this manually in the console, or create a separate stack that uses this construct.
 * You must `cdk deploy` once (with your normal AWS credentials) to have this role created for you.
 *
 * You can then make note of the role arn in the stack output and send it into the Github Workflow app via
 * the `awsOidcRoleArn` property. The role arn will be `arn:aws:iam::<accountId>:role/GithubActionRole`.
 *
 * @see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
 */
export class AwsOidc extends Construct {
  /**
   * The role that gets created.
   *
   * You should use the arn of this role as input to the `awsOidcRoleArn`
   * property in your Github Workflow app.
   */
  public readonly role: iam.IRole;

  constructor(scope: Construct, id: string, props: AwsOidcProps) {
    super(scope, id);

    const rawEndpoint = 'token.actions.githubusercontent.com';
    const providerUrl = `https://${rawEndpoint}`;
    const audience = 'sts.amazonaws.com';

    // uses the given provider or creates a new one.
    const provider = props.provider ?? new iam.OpenIdConnectProvider(this, 'github-oidc', {
      url: providerUrl,
      clientIds: [audience],
    });

    // create a role that references the provider as a trusted entity
    const principal = new iam.FederatedPrincipal(
      provider.openIdConnectProviderArn,
      {
        StringLike: {
          [`${rawEndpoint}:sub`]: `repo:${props.repoString}:ref:refs/heads/${props.branch ?? '*'}`,
        },
      },
      'sts:AssumeRoleWithWebIdentity',
    );

    this.role = new iam.Role(this, 'github-role', {
      roleName: props.roleName ?? 'GithubActionRole',
      assumedBy: principal,
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
    });

    // show the role arn in the stack output
    new CfnOutput(this, 'roleArn', {
      value: this.role.roleArn,
    });
  }
}