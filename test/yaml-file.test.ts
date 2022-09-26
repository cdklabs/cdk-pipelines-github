import { readFileSync } from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import { JsonPatch } from '../src/json-patch';
import { YamlFile } from '../src/yaml-file';
import { withTemporaryDirectory } from './testutil';

describe('patch', () => {
  function patchTest(patches: JsonPatch[], initialObj: any, assertObj: any) {
    withTemporaryDirectory((dir) => {
      const fileName = path.join(dir, 'file.yml');
      const yamlFile = new YamlFile(fileName, {
        obj: initialObj,
      });
      yamlFile.patch(...patches);

      yamlFile.writeFile();

      expect(YAML.parse(readFileSync(fileName, 'utf-8'))).toStrictEqual(assertObj);
    });
  }

  test('patch(p, v) can add to an existing array', () => {
    patchTest(
      [
        JsonPatch.add('/first/second/array/-', '1'),
        JsonPatch.add('/first/second/array/-', '2'),
        JsonPatch.add('/first/second/array/1', '3'),
      ],
      { first: { second: { array: ['0'] } } },
      { first: { second: { array: ['0', '3', '1', '2'] } } },
    );
  });

  test('patch(p, v) can create an array', () => {
    patchTest(
      [
        JsonPatch.add('/first/second/array', []),
        JsonPatch.add('/first/second/array/-', '1'),
        JsonPatch.add('/first/second/array/-', '2'),
      ],
      { first: { second: {} } },
      { first: { second: { array: ['1', '2'] } } },
    );
  });
});