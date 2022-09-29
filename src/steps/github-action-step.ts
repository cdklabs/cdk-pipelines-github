import { Step } from 'aws-cdk-lib/pipelines';
import { JobStep } from '../workflows-model';

export interface GithubActionStepProps {
  /**
   * The Job step.
   */
  readonly jobStep: JobStep;

  /**
   * Environment variables to set.
   */
  readonly env?: Record<string, string>;
}

export class GithubActionStep extends Step {
  readonly env: Record<string, string>;
  readonly jobStep: JobStep;

  constructor(id: string, props: GithubActionStepProps) {
    super(id);
    this.jobStep = props.jobStep;
    this.env = props.env ?? {};
  }
}
