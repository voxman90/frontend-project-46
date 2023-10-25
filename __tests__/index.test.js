import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { expect, describe, test } from '@jest/globals';

import getFileDiff from '../src/index.js';
import {
  jsonNestedDiff,
  plainNestedDiff,
  stylishNestedDiff,
} from '../__fixtures__/samples.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(__dirname, '..', '__fixtures__');
const getFixturePath = (fileName, fileExt) => join(fixtureDir, `${fileName}.${fileExt}`);

describe.each([
  ['json'],
  ['yaml'],
  ['yml'],
])('Test getFileDiff for \'%s\' type file', (fileExt) => {
  const fileAPath = getFixturePath('nestedA', fileExt);
  const fileBPath = getFixturePath('nestedB', fileExt);

  test.each([
    ['stylish', stylishNestedDiff],
    ['plain', plainNestedDiff],
    ['json', jsonNestedDiff],
  ])('and for \'%s\' formatter', (formatType, expected) => {
    expect(getFileDiff(fileAPath, fileBPath, formatType)).toBe(expected);
  });
});
