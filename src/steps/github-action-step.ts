import { Step } from 'aws-cdk-lib/pipelines';
import { JobStep } from '../workflows-model';

export interface GitHubActionStepProps {
  /**
   * The Job step.
   */
  readonly jobStep: JobStep;

  /**
   * Environment variables to set.
   */
  readonly env?: Record<string, string>;
}

/**
 * Specifies a GitHub Action as a step in the pipeline.
 */
export class GitHubActionStep extends Step {
  public readonly env: Record<string, string>;
  public readonly jobStep: JobStep;

  constructor(id: string, props: GitHubActionStepProps) {
    super(id);
    this.jobStep = props.jobStep;
    this.env = props.env ?? {};
  }
}
