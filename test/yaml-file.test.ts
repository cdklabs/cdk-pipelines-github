import { readFileSync } from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import { JsonPatch } from '../src/json-patch';
import { YamlFile } from '../src/yaml-file';
import { withTemporaryDirectory } from './testutil';

describe('patch', () => {
  function patchTest(patches: JsonPatch[], initialObj: any, assertObj: any, updateObj?: any) {
    withTemporaryDirectory((dir) => {
      const fileName = path.join(dir, 'file.yml');
      const yamlFile = new YamlFile(fileName, {
        obj: initialObj,
      });
      yamlFile.patch(...patches);

      if (updateObj) {
        yamlFile.update(updateObj);
      }

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

  test('patch(p, v) can add to an existing array after update', () => {
    patchTest(
      [
        JsonPatch.add('/first/second/array/-', '1'),
        JsonPatch.add('/first/second/array/-', '2'),
        JsonPatch.add('/first/second/array/1', '3'),
      ],
      { first: { second: { array: ['?'] } } }, // shouldn't use
      { first: { second: { array: ['0', '3', '1', '2'] } } },
      { first: { second: { array: ['0'] } } }, // should use
    );
  });

  test('patch(p, v) can create an array', () => {
    patchTest(
      [
        JsonPatch.add('/first/second/array', []),
        JsonPatch.add('/first/second/array/-', '1'),
        JsonPatch.add('/first/second/array/-', '2'),
      ],
      { first: { third: {} } }, // shouldn't use
      { first: { second: { array: ['1', '2'] } } },
      { first: { second: {} } }, // should use
    );
  });
});


describe('yaml file comments', () => {
  function commentTest(commentAtTop: string | undefined, initialObj: any, assetDoc: string) {
    withTemporaryDirectory((dir) => {
      const fileName = path.join(dir, 'file.yml');
      const yamlFile = new YamlFile(fileName, {
        obj: initialObj,
      });
      yamlFile.commentAtTop = commentAtTop;
      yamlFile.writeFile();

      expect(readFileSync(fileName, 'utf-8')).toMatchSnapshot(assetDoc);
      expect(yamlFile.commentAtTop).toStrictEqual(commentAtTop);
    });
  }

  test('comment at top works', () => {
    const commentBeforeYaml = 'commentAtTopTest.yml';
    commentTest(
      'Comment before',
      { first: { second: { array: ['0'] } } },
      commentBeforeYaml,
    );
  });

  test('multi-line comments work', () => {
    const commentAfterYaml = 'multilineCommentAtTopAndBottomTest.yml';
    commentTest(
      `Comment before:\n\n${['A', 'B', 'C'].map((x) => ` - ${x}\n`).join('')}`,
      { first: { second: { array: ['0'] } } },
      commentAfterYaml,
    );
  });
});