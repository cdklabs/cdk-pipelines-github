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
};

/**
 * Specifies a GitHub Action as a step in the pipeline.
 */
export class GitHubActionStep extends Step {
  public readonly env: Record<string, string>;
  public readonly jobSteps: JobStep[];

  constructor(id: string, props: GitHubActionStepProps) {
    super(id);
    this.jobSteps = props.jobSteps;
    this.env = props.env ?? {};
  }
}
