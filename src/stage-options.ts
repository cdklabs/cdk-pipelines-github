import { AddStageOpts } from 'aws-cdk-lib/pipelines';
import { GitHubCommonProps } from './pipeline';

/**
 * Acknowledge IAM resources in AWS CloudFormation templates.
 *
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-iam-template.html#capabilities
 */
export enum StackCapabilities {
  /** Acknowledge your stack includes IAM resources */
  IAM = 'CAPABILITY_IAM',

  /** Acknowledge your stack includes custom names for IAM resources */
  NAMED_IAM = 'CAPABILITY_NAMED_IAM',

  /** Acknowledge your stack contains one or more macros */
  AUTO_EXPAND = 'CAPABILITY_AUTO_EXPAND',
}

/**
 * Options to pass to `addStageWithGitHubOpts`.
 */
export interface AddGitHubStageOptions extends AddStageOpts, GitHubCommonProps {}
