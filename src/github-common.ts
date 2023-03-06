import { AddStageOpts } from 'aws-cdk-lib/pipelines';
import { JobSettings } from './pipeline';
import { StackCapabilities } from './stage-options';

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
  readonly gitHubEnvironment?: string;

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
}

/**
 * Options to pass to `addStageWithGitHubOpts`.
 */
export interface AddGitHubStageOptions extends AddStageOpts, GitHubCommonProps {}
