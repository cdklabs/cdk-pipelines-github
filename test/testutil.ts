/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { App, AppProps, Stack, Stage } from 'aws-cdk-lib';

export class TestApp extends App {
  constructor(props?: Partial<AppProps>) {
    super({
      context: {
        '@aws-cdk/core:newStyleStackSynthesis': '1',
      },
      stackTraces: false,
      autoSynth: false,
      treeMetadata: false,
      ...props,
    });
  }

  public cleanup() {
    fs.rmSync(this.outdir, { recursive: true });
  }
}

/**
 * Because 'expect(stack)' doesn't work correctly for stacks in nested assemblies
 */
export function stackTemplate(stack: Stack) {
  const stage = Stage.of(stack);
  if (!stage) { throw new Error('stack not in a Stage'); }
  return stage.synth().getStackArtifact(stack.artifactId);
}

export function withTemporaryDirectory<T>(callback: (dir: string) => T): T {
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), path.basename(__filename)));
  try {
    return callback(tmpdir);
  } finally {
    fs.rmSync(tmpdir, { recursive: true });
  }
}