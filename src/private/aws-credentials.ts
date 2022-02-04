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
   * The OIDC role arn, if we are using OIDC to authenticate.
   *
   * @default - OIDC not used and `accessKeyId` and `secretAccessKey` are expected.
   */
  readonly oidcRoleArn?: string;

  /**
   * The AWS Region.
   */
  readonly region: string;

  /**
   * @default undefined
   */
  readonly accessKeyId?: string;

  /**
   * @default undefined
   */
  readonly secretAccessKey?: string;

  /**
   * @default undefined
   */
  readonly sessionToken?: string;
}

export function awsCredentialStep(stepName: string, props: AwsCredentialsStepProps): github.JobStep {
  const params: Record<string, any> = {};

  if (!props.oidcRoleArn && !(props.accessKeyId && props.secretAccessKey)) {
    throw new Error('AWS authentication not found via OIDC or GitHub secrets');
  }

  params['aws-region'] = props.region;
  params['role-duration-seconds'] = 30 * 60;
  // Session tagging requires the role to have `sts:TagSession` permissions,
  // which CDK bootstrapped roles do not currently have.
  params['role-skip-session-tagging'] = props.roleSkipSessionTagging ?? true;

  if (props.oidcRoleArn) {
    params['role-to-assume'] = props.oidcRoleArn;
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