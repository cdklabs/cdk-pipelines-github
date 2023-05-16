import { AddStageOpts } from 'aws-cdk-lib/pipelines';
import { JobSettings } from './pipeline';
import { StackCapabilities } from './stage-options';

export enum StackParameterType {
  SECRET,
  ENV_VARIABLE,
  PLAIN_TEXT,
}

export interface StackParameter {
  /**
   * StackParameterType
   *
   * required
   */
  readonly type: StackParameterType;

  /**
   * Parameter value
   *
   * required
   */
  readonly value: string;
}

/**
 * Github environment with name and url.
 *
 * @see https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idenvironment
 */
export interface GitHubEnvironment {
  /**
   * Name of the environment
   *
   * @see https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-using-environment-name-and-url
   */
  readonly name: string;

  /**
   * The url for the environment.
   *
   * @see https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#example-using-environment-name-and-url
   */
  readonly url?: string;
}

/**
 * Common properties to extend both StageProps and AddStageOpts
 */
export interface GitHubCommonProps {
  /**
   * Run the stage in a specific GitHub Environment. If specified,
   * any protection rules configured for the environment must pass
   * before the job is set to a runner. For example, if the environment
   * has a manual approval rule configured, then the workflow will
   * wait for the approval before sending the job to the runner.
   *
   * Running a workflow that references an environment that does not
   * exist will create an environment with the referenced name.
   * @see https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment
   *
   * @default - no GitHub environment
   */
  readonly gitHubEnvironment?: GitHubEnvironment;

  /**
   * In some cases, you must explicitly acknowledge that your CloudFormation
   * stack template contains certain capabilities in order for CloudFormation
   * to create the stack.
   *
   * If insufficiently specified, CloudFormation returns an `InsufficientCapabilities`
   * error.
   *
   * @default ['CAPABILITY_IAM']
   */
  readonly stackCapabilities?: StackCapabilities[];

  /**
   * Job level settings that will be applied to all jobs in the stage.
   * Currently the only valid setting is 'if'.
   */
  readonly jobSettings?: JobSettings;

  /**
   * Stack parameters to supply to the stack during deployment
   * @default - No parameters
   */
  readonly stackParameters?: Record<string, StackParameter[]>;
}

/**
 * Options to pass to `addStageWithGitHubOpts`.
 */
export interface AddGitHubStageOptions extends AddStageOpts, GitHubCommonProps {}
