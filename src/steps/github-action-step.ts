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
   * Add an addition `if` clause on the `job.*` step for this `GitHubActionStep`
   *
   * Note that setting this may allow the job to run even if any of the jobs it depends on fails.
   *
   * In cases where it's only desired to run when previous jobs succeed, then use `success()`, such as:
   *
   * ```ts
   * const postStep = new GitHubActionStep('PostDeployAction', {
   *     jobSteps: [
   *       // ...
   *     ],
   *     if: "success() && contains(github.event.issue.labels.*.name, 'cleanup')",
   *   });
   * ```
   *
   * @see https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idif
   * @see https://docs.github.com/en/actions/learn-github-actions/expressions#success
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
