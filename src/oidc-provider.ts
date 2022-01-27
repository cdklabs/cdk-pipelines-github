import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

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
 * Create a Github OIDC provider and accompanying role that trusts the provider.
 * This role can be used to authenticate against AWS instead of using long-standing
 * Github secrets.
 *
 * @see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
 */
export class GithubOidcProviderRole extends Construct {
  /**
   * The role that is created for you.
   */
  public readonly oidcRole: iam.IRole;

  constructor(scope: Construct, id: string, props: GithubOidcProps) {
    super(scope, id);

    const rawEndpoint = 'token.actions.githubusercontent.com';
    const providerUrl = `https://${rawEndpoint}`;
    const audience = 'sts.amazonaws.com';

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
      assumedBy: principal,
    });

    this.oidcRole = role;
  }
}