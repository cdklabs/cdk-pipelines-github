import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { GitHubCommonProps } from './github-common';

export interface GitHubStageProps extends StageProps, GitHubCommonProps {}

export class GitHubStage extends Stage {
  constructor(
    scope: Construct,
    id: string,
    public readonly props?: GitHubStageProps,
  ) {
    super(scope, id, props);
  }
}
