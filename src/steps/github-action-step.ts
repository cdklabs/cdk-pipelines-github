import { Step } from 'aws-cdk-lib/pipelines';
import { JobStep, JobPermissions } from '../workflows-model';

export interface GitHubActionStepProps {
  /**
   * The Job steps.
   */
  readonly jobSteps: JobStep[];

  /**
   * Environment variables to set.
   */
  readonly env?: Record<string, string>;

  /**
   * Permissions for the GitHub Action step.
   * @default The job receives 'contents: write' permissions. If you set additional permissions and require 'contents: write', it must be provided in your configuration.
   */
  readonly permissions?: JobPermissions;

  /**
   * The GitHub Environment for the GitHub Action step.
   * To set shell-level environment variables, use `env`.
   * @see https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment
   * @default No GitHub Environment is selected.
   */
  readonly githubEnvironment?: string;
}

/**
 * Specifies a GitHub Action as a step in the pipeline.
 */
export class GitHubActionStep extends Step {
  public readonly env: Record<string, string>;
  public readonly jobSteps: JobStep[];
  public readonly githubEnvironment?: string;
  public readonly permissions?: JobPermissions;

  constructor(id: string, props: GitHubActionStepProps) {
    super(id);
    this.jobSteps = props.jobSteps;
    this.env = props.env ?? {};
    this.githubEnvironment = props.githubEnvironment;
    this.permissions = props.permissions;
  }
}
