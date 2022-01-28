// import * as pipelines from 'aws-cdk-lib/pipelines';
// import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
// import * as ecr from 'aws-cdk-lib/aws-ecr';
// import * as iam from 'aws-cdk-lib/aws-iam';
// import { DockerCredentialUsage } from 'aws-cdk-lib/pipelines';

// export abstract class GithubDockerCredential extends pipelines.DockerCredential {
//   public static dockerHub(_secret: secretsmanager.Secret, _opts: pipelines.ExternalDockerCredentialOptions = {}): pipelines.DockerCredential {
//     throw new Error('credentials with secrets manager not supported yet.');
//   }

//   public static dockerHubV2(opts?: ExternalDockerCredentialOptions): GithubDockerCredential {
//     return new ExternalDockerCredential(opts?.usages);
//   }

//   public static customRegistry(
//     _registryDomain: string,
//     _secret: secretsmanager.ISecret,
//     _opts: pipelines.ExternalDockerCredentialOptions = {}): pipelines.DockerCredential {
//     throw new Error('credentials with secrets manager not supported yet.');  
//   }

//   public static ecr(_repositories: ecr.IRepository[], _opts?: pipelines.EcrDockerCredentialOptions): pipelines.DockerCredential {
//     throw new Error('credentials with secrets manager not suported yet.');
//   }

//   constructor(protected readonly usages?: pipelines.DockerCredentialUsage[]) {
//     super(usages);
//     if (usages?.includes(pipelines.DockerCredentialUsage.SELF_UPDATE)) {
//       throw new Error('github workflows does not support self mutation');
//     }
//   }
// }

// export interface ExternalDockerCredentialOptions {
//   /**
//    * @default 'DOCKERHUB_USERNAME'
//    */
//   readonly secretUsernameField?: string;

//   /**
//    * @default 'DOCKERHUB_TOKEN'
//    */
//   readonly secretPasswordField?: string;

//   readonly usages?: pipelines.DockerCredentialUsage[];
// }

// /**
//  * DockerCredential defined by a registry domain and Github secrets.
//  */
// class ExternalDockerCredential extends GithubDockerCredential {
//   constructor(
//     private readonly registryDomain: string,
//     private readonly opts: ExternalDockerCredentialOptions) {
//     super(opts.usages);
//   }

//   public grantRead(_grantee: iam.IGrantable, _usage: DockerCredentialUsage) {
//     return;
//   }

//   public _renderCdkAssetsConfig(): DockerCredentialCredentialSource {
//     return {
//       [this.registryDomain]: {
        
//       }
//     }
//   }
// }
