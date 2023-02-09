import { Stage } from 'aws-cdk-lib';
import { AddStageOpts, StageDeployment, Wave, WaveProps } from 'aws-cdk-lib/pipelines';
import { AddGitHubStageOptions } from './github-common';
import { GitHubWorkflow } from './pipeline';

/**
 * Multiple stages that are deployed in parallel
 *
 * A `Wave`, but with addition GitHub options
 *
 * Create with `GitHubWorkflow.addWave()` or `GitHubWorkflow.addGitHubWave()`, do not construct directly
 */

export class GitHubWave extends Wave {
  constructor(
    /** Identifier for this Wave */
    public readonly id: string,
    /** GitHubWorkflow that this wave is part of  */
    private pipeline: GitHubWorkflow,
    props: WaveProps = {},
  ) {
    super(id, props);
  }

  /**
   * Add a Stage to this wave
   *
   * It will be deployed in parallel with all other stages in this
   * wave.
   */
  public addStage(stage: Stage, options: AddStageOpts = {}) {
    return this.addStageWithGitHubOptions(stage, options);
  }

  /**
   * Add a Stage to this wave
   *
   * It will be deployed in parallel with all other stages in this
   * wave.
   */
  public addStageWithGitHubOptions(
    stage: Stage,
    options?: AddGitHubStageOptions,
  ): StageDeployment {
    const stageDeployment = super.addStage(stage, options);
    this.pipeline._addStageFromWave(stage, stageDeployment, options);
    return stageDeployment;
  }
}
