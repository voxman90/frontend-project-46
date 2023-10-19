import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, describe, test } from '@jest/globals';

import getFileDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const stylishABDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe('Test getFileDiff for different address types', () => {
  const relativePathA = '../__fixtures__/fileA.json';
  const relativePathB = '../__fixtures__/fileB.json';
  const absolutePathA = resolve(__dirname, relativePathA);
  const absolutePathB = resolve(__dirname, relativePathB);
  const wrongTypePath = '../__fixtures__/fileA.html';
  const wrongPath = '../__fixtures__/fileC.json';

  test('absolute address tests', () => {
    expect(getFileDiff(absolutePathA, absolutePathB, 'stylish')).toBe(stylishABDiff);
  });

  test('relative address tests', () => {
    expect(getFileDiff(relativePathA, relativePathB, 'stylish')).toBe(stylishABDiff);
  });

  test('wrong file type tests', () => {
    expect(() => getFileDiff(absolutePathA, wrongTypePath, 'stylish'))
      .toThrow('Unsupported file type: html');
  });

  test('wrong address tests', () => {
    expect(() => getFileDiff(absolutePathA, wrongPath, 'stylish')).toThrow();
  });
});

describe('Test getFileDiff for different file types', () => {
  const pathToYamlA = '../__fixtures__/fileA.yaml';
  const pathToJSONA = '../__fixtures__/fileA.json';
  const pathToYmlB = '../__fixtures__/fileB.yml';

  test('test for YAML', () => {
    expect(getFileDiff(pathToYamlA, pathToYmlB, 'stylish')).toBe(stylishABDiff);
  });

  test('test for JSON and YAML', () => {
    expect(getFileDiff(pathToJSONA, pathToYmlB, 'stylish')).toBe(stylishABDiff);
  });

  const pathToYamlNestedA = '../__fixtures__/nestedA.yml';
  const pathToYamlNestedB = '../__fixtures__/nestedB.yaml';
  const pathToJSONNestedA = '../__fixtures__/nestedA.json';
  const pathToJSONNestedB = '../__fixtures__/nestedB.json';

  test('test for nested JSON and YAML', () => {
    expect(getFileDiff(pathToYamlNestedA, pathToJSONNestedB, 'stylish'))
      .toBe(getFileDiff(pathToJSONNestedA, pathToYamlNestedB, 'stylish'));
  });
});
