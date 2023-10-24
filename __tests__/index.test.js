import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { expect, describe, test } from '@jest/globals';

import getFileDiff from '../src/index.js';
import {
  jsonNestedDiff,
  plainNestedDiff,
  stylishNestedDiff,
} from '../__fixtures__/samples.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fileDir = resolve(__dirname, '../__fixtures__/');

describe.each([
  ['json'],
  ['yaml'],
  ['yml'],
])('Test getFileDiff for \'%s\' type file', (fileExt) => {
  const fileAPath = join(fileDir, `nestedA.${fileExt}`);
  const fileBPath = join(fileDir, `nestedB.${fileExt}`);

  test.each([
    ['stylish', stylishNestedDiff],
    ['plain', plainNestedDiff],
    ['json', jsonNestedDiff],
  ])('and for \'%s\' formatter', (formatType, expected) => {
    expect(getFileDiff(fileAPath, fileBPath, formatType)).toBe(expected);
  });
});
