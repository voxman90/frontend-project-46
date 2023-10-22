import { expect, describe, test } from '@jest/globals';

import {
  EEDiff,
  diffNested,
  stylishEmptyDiff,
  stylishNestedDiff,
} from '../../__fixtures__/samples.js';
import formatDiff from '../../src/formatters/stylish.js';

describe('Test stylishDiff', () => {
  test('empty diffTree', () => {
    expect(formatDiff(EEDiff)).toEqual(stylishEmptyDiff);
  });

  test('nested diffTree', () => {
    expect(formatDiff(diffNested)).toEqual(stylishNestedDiff);
  });
});
