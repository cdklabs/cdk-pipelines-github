import { Aws, CfnOutput } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * Properties for the GitHubActionRole construct.
 */
export interface GithubActionRoleProps {
  /**
   * A list of GitHub repositories you want to be able to access the IAM role.
   * Each entry should be your GitHub username and repository passed in as a
   * single string.
   *
   * For example, `['owner/repo1', 'owner/repo2'].
   */
  readonly repos: string[];

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
 * the `githubActionRoleArn` property. The role arn will be `arn:aws:iam::<accountId>:role/GithubActionRole`.
 *
 * @see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
 */
export class GithubActionRole extends Construct {
  public static existingGithubActionsProvider(scope: Construct): iam.IOpenIdConnectProvider {
    return iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
      scope,
      'GithubActionProvider',
      `arn:aws:iam::${Aws.ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com`,
    );
  }


  /**
   * The role that gets created.
   *
   * You should use the arn of this role as input to the `githubActionRoleArn`
   * property in your Github Workflow app.
   */
  public readonly role: iam.IRole;

  constructor(scope: Construct, id: string, props: GithubActionRoleProps) {
    super(scope, id);

    const rawEndpoint = 'token.actions.githubusercontent.com';
    const providerUrl = `https://${rawEndpoint}`;

    // uses the given provider or creates a new one.
    const provider = props.provider ?? new iam.OpenIdConnectProvider(this, 'github-oidc', {
      url: providerUrl,
      clientIds: ['sts.amazonaws.com'],
    });

    // create a role that references the provider as a trusted entity
    const principal = new iam.FederatedPrincipal(
      provider.openIdConnectProviderArn,
      {
        StringLike: {
          [`${rawEndpoint}:sub`]: formatRepos(props.repos),
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

    this.role = new iam.Role(this, 'github-role', {
      roleName: props.roleName ?? 'GithubActionRole',
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