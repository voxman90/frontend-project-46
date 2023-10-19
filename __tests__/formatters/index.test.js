import { expect, describe, test } from '@jest/globals';

import getFormatter from '../../formatters/index.js';
import jsonFormatter from '../../formatters/json.js';
import stylishFormatter from '../../formatters/stylish.js';
import plainFormatter from '../../formatters/plain.js';

describe('Test getFormatter', () => {
  test('test format plain', () => {
    expect(getFormatter('plain')).toEqual(plainFormatter);
  });

  test('test format stylish', () => {
    expect(getFormatter('stylish')).toEqual(stylishFormatter);
  });

  test('test format json', () => {
    expect(getFormatter('json')).toEqual(jsonFormatter);
  });

  test('test incorrect format', () => {
    expect(() => { getFormatter(null); }).toThrowError();
  });
});
