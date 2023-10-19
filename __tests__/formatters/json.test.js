import { expect, describe, test } from '@jest/globals';

import {
  EEDiff,
  diffNested,
  jsonEmptyDiff,
  jsonNestedDiff,
} from '../../__fixtures__/samples.js';
import formatDiff from '../../formatters/json.js';

describe('Test stylishDiff', () => {
  test('test empty diff', () => {
    expect(formatDiff(EEDiff)).toEqual(jsonEmptyDiff);
  });

  test('test nested diff', () => {
    expect(formatDiff(diffNested)).toEqual(jsonNestedDiff);
  });
});
