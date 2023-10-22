import { expect, describe, test } from '@jest/globals';

import getFormatter from '../../src/formatters/index.js';
import jsonFormatter from '../../src/formatters/json.js';
import stylishFormatter from '../../src/formatters/stylish.js';
import plainFormatter from '../../src/formatters/plain.js';

describe('Test getFormatter', () => {
  test('plain format', () => {
    expect(getFormatter('plain')).toEqual(plainFormatter);
  });

  test('stylish format', () => {
    expect(getFormatter('stylish')).toEqual(stylishFormatter);
  });

  test('json format', () => {
    expect(getFormatter('json')).toEqual(jsonFormatter);
  });

  test('incorrect format', () => {
    expect(() => { getFormatter(null); }).toThrow();
  });
});
