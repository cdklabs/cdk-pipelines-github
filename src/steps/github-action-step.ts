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
   * Indicates if this step uses the GitHub action role and thus should have access to it. When set
   * to true, the step will get the 'id-token: read' permission.
   * @default false
   */
  readonly useGitHubActionRole?: boolean;
}

/**
 * Specifies a GitHub Action as a step in the pipeline.
 */
export class GitHubActionStep extends Step {
  public readonly env: Record<string, string>;
  public readonly jobSteps: JobStep[];
  public readonly useGitHubActionRole: boolean;

  constructor(id: string, props: GitHubActionStepProps) {
    super(id);
    this.jobSteps = props.jobSteps;
    this.env = props.env ?? {};
    this.useGitHubActionRole = props.useGitHubActionRole ?? false;
  }
}
