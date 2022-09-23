import { writeFileSync } from 'fs';
import * as YAML from 'yaml';
import { JsonPatch } from './json-patch';

/**
 * Options for `YamlFile`
 */
export interface YamlFileOptions {
  /**
   * The object that will be serialized. You can modify the object's contents
   * before synthesis.
   *
   * @default {} an empty object
   */
  readonly obj?: any;
}

/**
 * Represents a Yaml File.
 */
export class YamlFile {
  /**
   * The path to the file that the object will be written to.
   */
  private readonly filePath: string;

  /**
   * The output object. This object can be mutated until the project is synthesized.
   */
  private obj: object;

  /**
   * Patches to be applied to `obj` after the resolver is called.
   */
  private readonly patchOperations: JsonPatch[];

  constructor(filePath: string, options: YamlFileOptions = {}) {
    this.filePath = filePath;
    this.obj = options.obj ?? {};
    this.patchOperations = [];
  }

  /**
   * Update the output object.
   */
  public update(obj: any) {
    this.obj = obj;
  }

  /**
   * Applies an RFC 6902 JSON-patch to the synthesized object file.
   * See https://datatracker.ietf.org/doc/html/rfc6902 for more information.
   *
   * For example, with the following yaml file
   * ```yaml
   * name: deploy
   * on:
   *   push:
   *     branches:
   *       - main
   *   workflow_dispatch: {}
   * ...
   * ```
   *
   * modified in the following way:
   *
   * ```ts
   * pipeline.workflowFile.patch(JsonPatch.add("/on/workflow_call", "{}"));
   * pipeline.workflowFile.patch(JsonPatch.remove("/on/workflow_dispatch"));
   * ```
   *
   * would result in the following yaml file:
   *
   * ```yaml
   * name: deploy
   * on:
   *   push:
   *     branches:
   *       - main
   *   workflow_call: {}
   * ...
   * ```
   *
   * @param patches - The patch operations to apply
   */
  public patch(...patches: JsonPatch[]) {
    this.patchOperations.push(...patches);
  }

  public toYaml(): string {
    return YAML.stringify(this.obj, {
      indent: 2,
    });
  }

  private patchedYaml(): string {
    const patched = JsonPatch.apply(this.obj, ...this.patchOperations);

    return YAML.stringify(patched, {
      indent: 2,
    });
  }

  public writeFile() {
    writeFileSync(this.filePath, this.patchedYaml());
  }
}