import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, describe, test } from '@jest/globals';

import getFileDiff from '../src/index.js';
import { stylishNestedDiff } from '../__fixtures__/samples.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Test getFileDiff for different address types', () => {
  const relativePathA = '../__fixtures__/nestedA.json';
  const relativePathB = '../__fixtures__/nestedB.json';
  const absolutePathA = resolve(__dirname, relativePathA);
  const absolutePathB = resolve(__dirname, relativePathB);
  const wrongTypePath = '../__fixtures__/nestedA.html';
  const wrongPath = '../__fixtures__/nestedC.json';

  test('absolute address tests', () => {
    expect(getFileDiff(absolutePathA, absolutePathB, 'stylish')).toBe(stylishNestedDiff);
  });

  test('relative address tests', () => {
    expect(getFileDiff(relativePathA, relativePathB, 'stylish')).toBe(stylishNestedDiff);
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
  const pathToYamlA = '../__fixtures__/nestedA.yml';
  const pathToJSONA = '../__fixtures__/nestedA.json';
  const pathToYmlB = '../__fixtures__/nestedB.yaml';

  test('test for YAML', () => {
    expect(getFileDiff(pathToYamlA, pathToYmlB, 'stylish')).toBe(stylishNestedDiff);
  });

  test('test for JSON and YAML', () => {
    expect(getFileDiff(pathToJSONA, pathToYmlB, 'stylish')).toBe(stylishNestedDiff);
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
