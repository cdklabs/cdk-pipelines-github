/**
 * Represents a credential used to authenticate to a docker registry.
 * Uses the official Docker Login GitHub Action to authenticate.
 *
 * @see https://github.com/marketplace/actions/docker-login
 */
export class DockerCredential {
  /**
   * Reference credential secrets to authenticate to DockerHub. This method assumes
   * that your credentials will be stored as long-lived GitHub Secrets under the
   * usernameKey and personalAccessTokenKey.
   *
   * The default for usernameKey is `DOCKERHUB_USERNAME`. The default for personalAccessTokenKey
   * is `DOCKERHUB_TOKEN`. If you do not set these values, your credentials should be
   * found in your GitHub Secrets under these default keys.
   */
  public static dockerHub(creds: DockerHubCredentialSecrets = {}): DockerCredential {
    return new DockerCredential(
      'docker',
      undefined,
      creds.usernameKey ?? 'DOCKERHUB_USERNAME',
      creds.personalAccessTokenKey ?? 'DOCKERHUB_TOKEN',
    );
  }

  /**
   * Create a credential for ECR. This method will reuse your AWS credentials to log in to AWS.
   * Your AWS credentials are already used to deploy your CDK stacks. It can be supplied via
   * GitHub Secrets or using an IAM role that trusts the GitHub OIDC identity provider.
   *
   * NOTE - All ECR repositories in the same account and region share a domain name
   * (e.g., 0123456789012.dkr.ecr.eu-west-1.amazonaws.com), and can only have one associated
   * set of credentials (and DockerCredential). Attempting to associate one set of credentials
   * with one ECR repo and another with another ECR repo in the same account and region will
   * result in failures when using these credentials in the pipeline.
   */
  public static ecr(registry: string): DockerCredential {
    return new DockerCredential('ecr', registry);
  }

  /**
   * Create a credential for a custom registry. This method assumes that you will have long-lived
   * GitHub Secrets stored under the usernameKey and passwordKey that will authenticate to the
   * registry you provide.
   *
   * @see https://github.com/marketplace/actions/docker-login
   */
  public static customRegistry(registry: string, creds: ExternalDockerCredentialSecrets): DockerCredential {
    return new DockerCredential('custom', registry, creds.usernameKey, creds.passwordKey);
  }

  private constructor(
    readonly name: string,
    readonly registry?: string,
    readonly usernameKey?: string,
    readonly passwordKey?: string,
  ) {}
}

/**
 * Locations of GitHub Secrets used to authenticate to DockerHub.
 */
export interface DockerHubCredentialSecrets {
  /**
   * The key of the GitHub Secret containing the DockerHub username.
   *
   * @default 'DOCKERHUB_USERNAME'
   */
  readonly usernameKey?: string;

  /**
   * The key of the GitHub Secret containing the DockerHub personal access token.
   *
   * @default 'DOCKERHUB_TOKEN'
   */
  readonly personalAccessTokenKey?: string;
}

/**
 * Generic structure to supply the locations of GitHub Secrets used to authenticate
 * to a docker registry.
 */
export interface ExternalDockerCredentialSecrets {
  /**
   * The key of the GitHub Secret containing your registry username.
   */
  readonly usernameKey: string;

  /**
   * The key of the GitHub Secret containing your registry password.
   */
  readonly passwordKey: string;
}
