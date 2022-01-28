export class DockerCredential {
  /**
   * Create a credential for DockerHub. This method assumes that you will have long-lived
   * Github Secrets stored under the usernameKey and personalAccessTokenKey.
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
   * Github Secrets stored under the usernameKey and passwordKey.
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


export interface DockerHubCredentialSecrets {
  /**
   * The key of the Github Secret containing the DockerHub username.
   *
   * @default 'DOCKERHUB_USERNAME'
   */
  readonly usernameKey?: string;

  /**
   * The key of the Github Secret containing the DockerHub personal access token.
   *
   * @default 'DOCKERHUB_TOKEN'
   */
  readonly personalAccessTokenKey?: string;
}

export interface ExternalDockerCredentialSecrets {
  /**
   * The key of the Github Secret containing your registry username.
   */
  readonly usernameKey: string;

  /**
   * The key of the Github Secret containing your registry password.
   */
  readonly passwordKey: string;
}