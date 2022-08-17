import { Step } from 'aws-cdk-lib/pipelines';
import { JobStep } from '../workflows-model';

interface GithubActionStepProps {
  /**
   * The Job step.
   */
  jobStep: JobStep;

  /**
   * Environment variables to set.
   */
  env?: Record<string, string>;
}

export class GithubActionStep extends Step {
  readonly env: Record<string, string>;
  readonly jobStep: JobStep;

  constructor(id: string, { env, jobStep }: GithubActionStepProps) {
    super(id);
    this.jobStep = jobStep;
    this.env = env ?? {};
  }
}