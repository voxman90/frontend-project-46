import { expect, describe, test } from '@jest/globals';

import {
  EEDiff,
  diffNested,
  stylishEmptyDiff,
  stylishNestedDiff,
} from '../../__fixtures__/samples.js';
import formatDiff from '../../formatters/stylish.js';

describe('Test stylishDiff', () => {
  test('test empty diff', () => {
    expect(formatDiff(EEDiff)).toEqual(stylishEmptyDiff);
  });

  test('test nested diff', () => {
    expect(formatDiff(diffNested)).toEqual(stylishNestedDiff);
  });
});
