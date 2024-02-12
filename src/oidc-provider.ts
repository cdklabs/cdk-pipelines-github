import { Aws, CfnOutput } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * GitHub OIDC thumbprints updated 2023-07-27
 *
 * https://github.blog/changelog/2023-06-27-github-actions-update-on-oidc-integration-with-aws/
 */
const GITHUB_OIDC_THUMBPRINTS = [
  '6938fd4d98bab03faadb97b34396831e3780aea1',
  '1c58a3a8518e8759bf075b76b750d4f2df264fcd',
];

/**
 * Properties for the GitHubActionRole construct.
 */
export interface GitHubActionRoleProps {
  /**
   * A list of GitHub repositories you want to be able to access the IAM role.
   * Each entry should be your GitHub username and repository passed in as a
   * single string.
   * An entry `owner/repo` is equivalent to the subjectClaim `repo:owner/repo:*`.
   *
   * For example, `['owner/repo1', 'owner/repo2'].
   */
  readonly repos?: string[];

  /**
   * A list of subject claims allowed to access the IAM role.
   * See https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect
   * A subject claim can include `*` and `?` wildcards according to the `StringLike`
   * condition operator.
   *
   * For example, `['repo:owner/repo1:ref:refs/heads/branch1', 'repo:owner/repo1:environment:prod']`
   */
  readonly subjectClaims?: string[];

  /**
   * The name of the Oidc role.
   *
   * @default 'GitHubActionRole'
   */
  readonly roleName?: string;

  /**
   * The GitHub OpenId Connect Provider. Must have provider url
   * `https://token.actions.githubusercontent.com`. The audience must be
   * `sts:amazonaws.com`.
   *
   * Only one such provider can be defined per account, so if you already
   * have a provider with the same url, a new provider cannot be created for you.
   *
   * @default - a provider is created for you.
   */
  readonly provider?: iam.IOpenIdConnectProvider;

  /**
   * Thumbprints of GitHub's certificates
   *
   * Every time GitHub rotates their certificates, this value will need to be updated.
   *
   * Default value is up-to-date to June 27, 2023 as per
   * https://github.blog/changelog/2023-06-27-github-actions-update-on-oidc-integration-with-aws/
   *
   * @default - Use built-in keys
   */
  readonly thumbprints?: string[];
}

/**
 * Creates or references a GitHub OIDC provider and accompanying role that trusts the provider.
 * This role can be used to authenticate against AWS instead of using long-lived AWS user credentials
 * stored in GitHub secrets.
 *
 * You can do this manually in the console, or create a separate stack that uses this construct.
 * You must `cdk deploy` once (with your normal AWS credentials) to have this role created for you.
 *
 * You can then make note of the role arn in the stack output and send it into the Github Workflow app via
 * the `gitHubActionRoleArn` property. The role arn will be `arn:<partition>:iam::<accountId>:role/GithubActionRole`.
 *
 * @see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
 */
export class GitHubActionRole extends Construct {
  /**
   * Reference an existing GitHub Actions provider.
   * You do not need to pass in an arn because the arn for such
   * a provider is always the same.
   */
  public static existingGitHubActionsProvider(scope: Construct): iam.IOpenIdConnectProvider {
    return iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
      scope,
      'GitHubActionProvider',
      `arn:${Aws.PARTITION}:iam::${Aws.ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com`,
    );
  }

  /**
   * The role that gets created.
   *
   * You should use the arn of this role as input to the `gitHubActionRoleArn`
   * property in your GitHub Workflow app.
   */
  public readonly role: iam.IRole;

  constructor(scope: Construct, id: string, props: GitHubActionRoleProps) {
    super(scope, id);

    const rawEndpoint = 'token.actions.githubusercontent.com';
    const providerUrl = `https://${rawEndpoint}`;

    // uses the given provider or creates a new one.
    const provider = props.provider ?? new iam.OpenIdConnectProvider(this, 'github-provider', {
      url: providerUrl,
      clientIds: ['sts.amazonaws.com'],
      thumbprints: props.thumbprints ?? GITHUB_OIDC_THUMBPRINTS,
    });

    // create a role that references the provider as a trusted entity
    const principal = new iam.FederatedPrincipal(
      provider.openIdConnectProviderArn,
      {
        StringLike: {
          [`${rawEndpoint}:sub`]: formatRepos(props.repos ?? []).concat(props.subjectClaims ?? []),
        },
      },
      'sts:AssumeRoleWithWebIdentity',
    );

    // permit this role from assuming all of the CDK bootstrap roles
    const oidcPolicyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['sts:AssumeRole'],
      resources: ['*'],
      conditions: {
        'ForAnyValue:StringEquals': {
          'iam:ResourceTag/aws-cdk:bootstrap-role': [
            'deploy',
            'lookup',
            'file-publishing',
            'image-publishing',
          ],
        },
      },
    });

    // permit this role from accessing ecr repositories for docker assets
    const ecrPolicyStatement = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ecr:GetAuthorizationToken'],
      resources: ['*'],
    });

    this.role = new iam.Role(this, 'github-action-role', {
      roleName: props.roleName ?? 'GitHubActionRole',
      assumedBy: principal,
      inlinePolicies: {
        AssumeBootstrapRoles: new iam.PolicyDocument({
          statements: [oidcPolicyStatement, ecrPolicyStatement],
        }),
      },
    });

    // show the role arn in the stack output
    new CfnOutput(this, 'roleArn', {
      value: this.role.roleArn,
    });
  }
}

function formatRepos(repos: string[]) {
  const formattedRepos = [];
  for (const repo of repos) {
    formattedRepos.push(`repo:${repo}:*`);
  }
  return formattedRepos;
}
