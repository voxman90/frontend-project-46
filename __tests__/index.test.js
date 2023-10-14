import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, describe, test } from '@jest/globals';

import getFileDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const ABDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const AEDiff = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;

const EBDiff = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;

const EEDiff = `{

}`;

describe('Test getFileDiff for different address types', () => {
  const relativePathA = '../__fixtures__/fileA.json';
  const relativePathB = '../__fixtures__/fileB.json';
  const absolutePathA = resolve(__dirname, relativePathA);
  const absolutePathB = resolve(__dirname, relativePathB);
  const wrongTypePath = '../__fixtures__/fileA.html';
  const wrongPath = '../__fixtures__/fileC.json';

  test('absolute address tests', () => {
    expect(getFileDiff(absolutePathA, absolutePathB)).toBe(ABDiff);
  });

  test('relative address tests', () => {
    expect(getFileDiff(relativePathA, relativePathB)).toBe(ABDiff);
  });

  test('wrong file type tests', () => {
    expect(() => getFileDiff(absolutePathA, wrongTypePath))
      .toThrow('Unsupported file type -- PARSE');
  });

  test('wrong address tests', () => {
    expect(() => getFileDiff(absolutePathA, wrongPath)).toThrow();
  });
});

describe('Test getFileDiff for different file types', () => {
  const pathToYamlA = '../__fixtures__/fileA.yaml';
  const pathToJSONA = '../__fixtures__/fileA.json';
  const pathToYmlB = '../__fixtures__/fileB.yml';
  const epmtyYamlE = '../__fixtures__/fileE.yaml';
  const epmtyJSONE = '../__fixtures__/fileE.json';

  test('test for YAML', () => {
    expect(getFileDiff(pathToYamlA, pathToYmlB)).toBe(ABDiff);
  });

  test('test for JSON and YAML', () => {
    expect(getFileDiff(pathToJSONA, pathToYmlB)).toBe(ABDiff);
  });

  test('tests with empty YAML and JSON', () => {
    expect(getFileDiff(pathToYamlA, epmtyYamlE)).toBe(AEDiff);
    expect(getFileDiff(epmtyJSONE, pathToYmlB)).toBe(EBDiff);
    expect(getFileDiff(epmtyYamlE, epmtyJSONE)).toBe(EEDiff);
  });
});
