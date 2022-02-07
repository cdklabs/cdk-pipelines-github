import * as github from '../workflows-model';

interface AwsCredentialsStepProps {
  /**
   * @default undefined
   */
  readonly roleToAssume?: string;

  /**
   * @default undefined
   */
  readonly roleExternalId?: string;

  /**
   * @default true
   */
  readonly roleSkipSessionTagging?: boolean;

  /**
   * The GitHub Action role arn, if we are using OIDC to authenticate. The other option
   * to authenticate is with `accessKeyId` and `secretAccessKey`.
   *
   * @default - OIDC not used and `accessKeyId` and `secretAccessKey` are expected.
   */
  readonly githubActionRoleArn?: string;

  /**
   * The AWS Region.
   */
  readonly region: string;

  /**
   * To authenticate via GitHub secrets, at least this and `secretAccessKey` must
   * be provided. Alternatively, provide just an `oidcRoleArn`.
   *
   * @default undefined
   */
  readonly accessKeyId?: string;

  /**
   * To authenticate via GitHub secrets, at least this and `accessKeyId` must
   * be provided. Alternatively, provide just an `oidcRoleArn`.
   *
   * @default undefined
   */
  readonly secretAccessKey?: string;

  /**
   * Provide an AWS session token.
   *
   * @default undefined
   */
  readonly sessionToken?: string;
}

export function awsCredentialStep(stepName: string, props: AwsCredentialsStepProps): github.JobStep {
  const params: Record<string, any> = {};

  // Neither of these checks should occur, since this method is internal,
  // but they are here just in case.
  if (!props.githubActionRoleArn && !(props.accessKeyId && props.secretAccessKey)) {
    throw new Error('AWS authentication not found via OIDC or GitHub secrets');
  }

  if (props.githubActionRoleArn && (props.accessKeyId || props.secretAccessKey)) {
    throw new Error('Please provide one method of authentication, not both');
  }

  params['aws-region'] = props.region;
  params['role-duration-seconds'] = 30 * 60;
  // Session tagging requires the role to have `sts:TagSession` permissions,
  // which CDK bootstrapped roles do not currently have.
  params['role-skip-session-tagging'] = props.roleSkipSessionTagging ?? true;

  if (props.githubActionRoleArn) {
    params['role-to-assume'] = props.githubActionRoleArn;
  } else {
    params['aws-access-key-id'] = props.accessKeyId;
    params['aws-secret-access-key'] = props.secretAccessKey;

    if (props.sessionToken) {
      params['aws-session-token'] = props.sessionToken;
    }

    if (props.roleToAssume) {
      params['role-to-assume'] = props.roleToAssume;
      params['role-external-id'] = 'Pipeline';
    }
  }

  return {
    name: stepName,
    uses: 'aws-actions/configure-aws-credentials@v1',
    with: params,
  };
}