import { expect, test } from '@jest/globals';

import { isObjectAndNotArray } from '../src/utils.js';

test('Test isObjectAndNotArray', () => {
  expect(isObjectAndNotArray({})).toBeTruthy();
  expect(isObjectAndNotArray({ prop1: 'val1', prop2: { prop3: 2 } })).toBeTruthy();

  expect(isObjectAndNotArray([])).toBeFalsy();
  expect(isObjectAndNotArray(1)).toBeFalsy();
  expect(isObjectAndNotArray('')).toBeFalsy();
  expect(isObjectAndNotArray(null)).toBeFalsy();
});
