export class DockerCredential {
  public static dockerHub(creds: DockerHubCredentialSecrets = {}): DockerCredential {
    return new DockerCredential(
      'docker',
      undefined,
      creds.username ?? 'DOCKERHUB_USERNAME',
      creds.personalAccessToken ?? 'DOCKERHUB_TOKEN',
    );
  }

  public static ecr(registry: string): DockerCredential {
    return new DockerCredential('ecr', registry);
  }

  public static customRegistry(registry: string, creds: ExternalDockerCredentialSecrets): DockerCredential {
    return new DockerCredential('custom', registry, creds.username, creds.password);
  }

  private constructor(
    readonly name: string,
    readonly registry?: string,
    readonly username?: string,
    readonly password?: string,
  ) {}
}


export interface DockerHubCredentialSecrets {
  /**
   * The name of the Github Secret containing the DockerHub username.
   *
   * @default 'DOCKERHUB_USERNAME'
   */
  readonly username?: string;

  /**
   * The name of the Github Secret containing the DockerHub personal access token.
   *
   * @default 'DOCKERHUB_TOKEN'
   */
  readonly personalAccessToken?: string;
}

export interface ExternalDockerCredentialSecrets {
  /**
   * The name of the Github Secret containing your registry username.
   */
  readonly username: string;

  /**
   * The name of the Github Secret containing your registry password.
   */
  readonly password: string;
}