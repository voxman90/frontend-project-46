import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { expect, describe, test } from '@jest/globals';

import getFileDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const file1File2Diff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const file1FileEDiff = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;

const file2FileEDiff = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;

describe('Test getFileDiff for JSON', () => {
  const file1RelativeAdress = '../__fixtures__/file1.json';
  const file2RelativeAdress = '../__fixtures__/file2.json';
  const epmtyJSONFileRelativeAdress = '../__fixtures__/fileE.json';
  const file1AbsoluteAdress = resolve(__dirname, file1RelativeAdress);
  const file2AbsoluteAdress = resolve(__dirname, file2RelativeAdress);
  const wrongTypeAdress = '../__fixtures__/file1.html';
  const wrongAdress = '../__fixtures__/file3.json';

  test('absolute address tests', () => {
    expect(getFileDiff(file1AbsoluteAdress, file2AbsoluteAdress)).toBe(file1File2Diff);
  });

  test('wrong file type tests', () => {
    expect(() => getFileDiff(file1AbsoluteAdress, wrongTypeAdress)).toThrow('Unsupported file type -- PARSE');
  });

  test('wrong address tests', () => {
    expect(() => getFileDiff(file1AbsoluteAdress, wrongAdress)).toThrow();
  });

  test('relative address tests', () => {
    expect(getFileDiff(file1RelativeAdress, file2RelativeAdress)).toBe(file1File2Diff);
  });

  test('tests with empty JSON', () => {
    expect(getFileDiff(file1AbsoluteAdress, epmtyJSONFileRelativeAdress)).toBe(file1FileEDiff);
    expect(getFileDiff(epmtyJSONFileRelativeAdress, file2AbsoluteAdress)).toBe(file2FileEDiff);
    expect(getFileDiff(epmtyJSONFileRelativeAdress, epmtyJSONFileRelativeAdress)).toBe('{\n\n}');
  });
});

describe('Test getFileDiff for YAML', () => {
  const file1RelativeAdress = '../__fixtures__/file1.yaml';
  const file2RelativeAdress = '../__fixtures__/file2.yml';
  const epmtyJSONFileRelativeAdress = '../__fixtures__/fileE.yaml';
  const file1AbsoluteAdress = resolve(__dirname, file1RelativeAdress);
  const file2AbsoluteAdress = resolve(__dirname, file2RelativeAdress);

  test('absolute address tests', () => {
    expect(getFileDiff(file1AbsoluteAdress, file2AbsoluteAdress)).toBe(file1File2Diff);
  });

  test('relative address tests', () => {
    expect(getFileDiff(file1RelativeAdress, file2RelativeAdress)).toBe(file1File2Diff);
  });

  test('tests with empty YAML', () => {
    expect(getFileDiff(file1AbsoluteAdress, epmtyJSONFileRelativeAdress)).toBe(file1FileEDiff);
    expect(getFileDiff(epmtyJSONFileRelativeAdress, file2AbsoluteAdress)).toBe(file2FileEDiff);
    expect(getFileDiff(epmtyJSONFileRelativeAdress, epmtyJSONFileRelativeAdress)).toBe('{\n\n}');
  });
});
