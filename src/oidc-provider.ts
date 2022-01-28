import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * Properties for the GithubOidc construct.
 */
export interface GithubOidcProps {
  /**
   * Your Github username.
   */
  readonly username: string;

  /**
   * The Github repository where your actions come from.
   */
  readonly repository: string;

  /**
   * The branch that your actions originate.
   *
   * @default 'main'
   */
  readonly branch?: string;

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
 * Create or references a Github OIDC provider and accompanying role that trusts the provider.
 * This role can be used to authenticate against AWS instead of using long-standing
 * Github secrets.
 *
 * You can do this manually in the console, or create a separate stack that uses this construct.
 * You must `cdk deploy` once (with your normal AWS credentials) to have this role created for you.
 *
 * You can then utilize the role arn as a stack output and send it into the Github Workflow app via
 * the `githubOidcRoleArn` property. The role arn will be `arn:aws:iam::<accountId>:role/GithubActionRole`.
 *
 * @see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
 */
export class GithubOidc extends Construct {
  /**
   * The arn of the role that gets created. The arn will equal
   * `arn:aws:iam::<accountId>:role/GithubActionRole`.
   *
   * You should use this arn as input to the `githubOidcRoleArn` property
   * in your Github Workflow app.
   */
  public readonly roleArn: string;

  constructor(scope: Construct, id: string, props: GithubOidcProps) {
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
        StringEquals: {
          [`${rawEndpoint}:sub`]: `repo:${props.username}/${props.repository}:ref:refs/heads/${props.branch ?? 'main'}`,
        },
      },
      'sts:AssumeRoleWithWebIdentity',
    );

    const role = new iam.Role(this, 'github-role', {
      roleName: 'GithubActionRole',
      assumedBy: principal,
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
    });

    this.roleArn = role.roleArn;
  }
}