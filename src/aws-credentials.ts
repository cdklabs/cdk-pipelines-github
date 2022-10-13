import { awsCredentialStep } from './private/aws-credentials';
import * as github from './workflows-model';

/**
 * AWS credential provider
 */
export class AwsCredentialsProvider {
  public jobPermission() {
    return github.JobPermission.NONE;
  }

  public credentialSteps(_region: string, _assumeRoleArn?: string): github.JobStep[] {
    return [];
  }
}

/**
 * Locations of GitHub Secrets used to authenticate to AWS
 */
export interface GitHubSecretsProviderProps {
  /**
   * @default "AWS_ACCESS_KEY_ID"
   */
  readonly accessKeyId: string;

  /**
   * @default "AWS_SECRET_ACCESS_KEY"
   */
  readonly secretAccessKey: string;

  /**
   * @default - no session token is used
   */
  readonly sessionToken?: string;
}

/**
 * AWS credential provider from GitHub secrets
 */
class GitHubSecretsProvider extends AwsCredentialsProvider {
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;
  private readonly sessionToken?: string;

  constructor(props?: GitHubSecretsProviderProps) {
    super();
    this.accessKeyId = props?.accessKeyId ?? 'AWS_ACCESS_KEY_ID';
    this.secretAccessKey = props?.secretAccessKey ?? 'AWS_SECRET_ACCESS_KEY';
    this.sessionToken = props?.sessionToken;
  }

  public credentialSteps(region: string, assumeRoleArn?: string): github.JobStep[] {
    return [
      awsCredentialStep('Authenticate Via GitHub Secrets', {
        region,
        accessKeyId: `\${{ secrets.${this.accessKeyId} }}`,
        secretAccessKey: `\${{ secrets.${this.secretAccessKey} }}`,
        ...(this.sessionToken ? {
          sessionToken: `\${{ secrets.${this.sessionToken} }}`,
        } : undefined),
        ...(assumeRoleArn ? {
          roleToAssume: assumeRoleArn,
          roleExternalId: 'Pipeline',
        } : undefined),
      }),
    ];
  }
}

/**
 * Role to assume using OpenId Connect
 */
export interface OpenIdConnectProviderProps {
  /**
   * A role that utilizes the GitHub OIDC Identity Provider in your AWS account.
   *
   * You can create your own role in the console with the necessary trust policy
   * to allow gitHub actions from your gitHub repository to assume the role, or
   * you can utilize the `GitHubActionRole` construct to create a role for you.
   */
  readonly gitHubActionRoleArn: string;
}

/**
 * AWS credential provider from OpenId Connect
 */
class OpenIdConnectProvider extends AwsCredentialsProvider {
  private readonly gitHubActionRoleArn: string;

  constructor(props: OpenIdConnectProviderProps) {
    super();
    this.gitHubActionRoleArn = props.gitHubActionRoleArn;
  }

  public jobPermission() {
    return github.JobPermission.WRITE;
  }

  public credentialSteps(region: string, assumeRoleArn?: string): github.JobStep[] {
    function getDeployRole(arn: string) {
      return arn.replace('cfn-exec', 'deploy');
    }

    let steps: github.JobStep[] = [];

    steps.push(
      awsCredentialStep('Authenticate Via OIDC Role', {
        region,
        roleToAssume: this.gitHubActionRoleArn,
      }),
    );

    if (assumeRoleArn) {
      // Result of initial credentials with GitHub Action role are these environment variables
      steps.push(
        awsCredentialStep('Assume CDK Deploy Role', {
          region,
          accessKeyId: '${{ env.AWS_ACCESS_KEY_ID }}',
          secretAccessKey: '${{ env.AWS_SECRET_ACCESS_KEY }}',
          sessionToken: '${{ env.AWS_SESSION_TOKEN }}',
          roleToAssume: getDeployRole(assumeRoleArn),
          roleExternalId: 'Pipeline',
        }),
      );
    }

    return steps;
  }
}

/**
 * Provides AWS credenitals to the pipeline jobs
 */
export class AwsCredentials {
  /**
   * Reference credential secrets to authenticate with AWS. This method assumes
   * that your credentials will be stored as long-lived GitHub Secrets.
   */
  static fromGitHubSecrets(props?: GitHubSecretsProviderProps): AwsCredentialsProvider {
    return new GitHubSecretsProvider(props);
  }
  static fromOpenIdConnect(props: OpenIdConnectProviderProps): AwsCredentialsProvider {
    return new OpenIdConnectProvider(props);
  }
  static runnerHasPreconfiguredCreds(): AwsCredentialsProvider {
    return new AwsCredentialsProvider();
  }
}
