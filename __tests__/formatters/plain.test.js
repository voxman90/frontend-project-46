import { expect, describe, test } from '@jest/globals';

import {
  EEDiff,
  diffNested,
  plainEmptyDiff,
  plainNestedDiff,
} from '../../__fixtures__/samples.js';
import formatDiff from '../../formatters/plain.js';

describe('Test stylishDiff', () => {
  test('test empty diff', () => {
    expect(formatDiff(EEDiff)).toEqual(plainEmptyDiff);
  });

  test('test nested diff', () => {
    expect(formatDiff(diffNested)).toEqual(plainNestedDiff);
  });
});
