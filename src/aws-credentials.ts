import { awsCredentialStep } from './private/aws-credentials';
import * as github from './workflows-model';

/**
 * AWS credential provider
 */
export abstract class AwsCredentialsProvider {
  public abstract jobPermission(): github.JobPermission;
  public abstract credentialSteps(region: string, assumeRoleArn?: string): github.JobStep[];
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

  public jobPermission(): github.JobPermission {
    return github.JobPermission.NONE;
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

  /**
   * The role session name to use when assuming the role.
   *
   * @default - no role session name
   */
  readonly roleSessionName?: string;
  /**
   * The role session duration in seconds.
   *
   * @default - default duration of 1800 seconds
   */
  readonly roleDurationSeconds?: number;
  /**
   * Mask the AWS Account ID setting.
   *
   * @default - default not masked
   */
  readonly maskAwsAccountId?: boolean;
}

/**
 * AWS credential provider from OpenId Connect
 */
class OpenIdConnectProvider extends AwsCredentialsProvider {
  private readonly gitHubActionRoleArn: string;
  private readonly roleSessionName: string | undefined;
  private readonly roleDurationSeconds: number | undefined;
  private readonly maskAwsAccountId: boolean | undefined;

  constructor(props: OpenIdConnectProviderProps) {
    super();
    this.gitHubActionRoleArn = props.gitHubActionRoleArn;
    this.roleSessionName = props.roleSessionName;
    this.roleDurationSeconds = props.roleDurationSeconds;
    this.maskAwsAccountId = props.maskAwsAccountId;
  }

  public jobPermission(): github.JobPermission {
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
        roleSessionName: this.roleSessionName,
        roleDurationSeconds: this.roleDurationSeconds,
        maskAwsAccountId: this.maskAwsAccountId,
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
 * Dummy AWS credential provider
 */
class NoCredentialsProvider extends AwsCredentialsProvider {
  public jobPermission(): github.JobPermission {
    return github.JobPermission.NONE;
  }
  public credentialSteps(_region: string, _assumeRoleArn?: string): github.JobStep[] {
    return [];
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

  /**
   * Provide AWS credentials using OpenID Connect.
   */
  static fromOpenIdConnect(props: OpenIdConnectProviderProps): AwsCredentialsProvider {
    return new OpenIdConnectProvider(props);
  }

  /**
   * Don't provide any AWS credentials, use this if runners have preconfigured credentials.
   */
  static runnerHasPreconfiguredCreds(): AwsCredentialsProvider {
    return new NoCredentialsProvider();
  }
}
