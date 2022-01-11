/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
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
    rimraf(this.outdir);
  }
}


/**
 * rm -rf reimplementation, don't want to depend on an NPM package for this
 */
export function rimraf(fsPath: string) {
  try {
    const isDir = fs.lstatSync(fsPath).isDirectory();

    if (isDir) {
      for (const file of fs.readdirSync(fsPath)) {
        rimraf(path.join(fsPath, file));
      }
      fs.rmdirSync(fsPath);
    } else {
      fs.unlinkSync(fsPath);
    }
  } catch (e: any) {
    // We will survive ENOENT
    if (e.code !== 'ENOENT') { throw e; }
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