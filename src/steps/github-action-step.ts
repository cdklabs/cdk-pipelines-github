import { Step } from 'aws-cdk-lib/pipelines';
import { JobStep } from '../workflows-model';

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
   * jobs.<job_id>.if. - overrides the JobSettings if provided, empty string (`''`) will remove the `if` clause
   *
   * @see https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idif
   */
  readonly if?: string;
};

/**
 * Specifies a GitHub Action as a step in the pipeline.
 */
export class GitHubActionStep extends Step {
  public readonly env: Record<string, string>;
  public readonly jobSteps: JobStep[];
  public readonly if?: string;

  constructor(id: string, props: GitHubActionStepProps) {
    super(id);
    this.jobSteps = props.jobSteps;
    this.env = props.env ?? {};
    this.if = props.if;
  }
}
