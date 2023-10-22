import { expect, describe, test } from '@jest/globals';

import {
  EEDiff,
  diffNested,
  jsonEmptyDiff,
  jsonNestedDiff,
} from '../../__fixtures__/samples.js';
import formatDiff from '../../src/formatters/json.js';

describe('Test stylishDiff', () => {
  test('test empty diffTree', () => {
    expect(formatDiff(EEDiff)).toEqual(jsonEmptyDiff);
  });

  test('test nested diffTree', () => {
    expect(formatDiff(diffNested)).toEqual(jsonNestedDiff);
  });
});
