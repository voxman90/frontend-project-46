import { expect, describe, test } from '@jest/globals';

import {
  EEDiff,
  diffNested,
  plainEmptyDiff,
  plainNestedDiff,
} from '../../__fixtures__/samples.js';
import formatDiff from '../../src/formatters/plain.js';

describe('Test stylishDiff', () => {
  test('empty diffTree', () => {
    expect(formatDiff(EEDiff)).toEqual(plainEmptyDiff);
  });

  test('nested diffTree', () => {
    expect(formatDiff(diffNested)).toEqual(plainNestedDiff);
  });
});
