import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { expect, describe, test } from '@jest/globals';

import getFileDiff from '../src/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, '..', '__fixtures__');
const getFixturePath = (fileName, fileExt) => join(fixturesDir, `${fileName}.${fileExt}`);

describe.each([
  ['json'],
  ['yaml'],
  ['yml'],
])('Test getFileDiff for \'%s\' type file', (fileExt) => {
  const fileAPath = getFixturePath('nestedA', fileExt);
  const fileBPath = getFixturePath('nestedB', fileExt);

  test.each([
    ['stylish'],
    ['plain'],
    ['json'],
  ])('and for \'%s\' formatter', (formatType) => {
    const resultPath = getFixturePath(`${formatType}NestedDiff`, 'txt');
    const expected = readFileSync(resultPath, 'utf8');

    expect(getFileDiff(fileAPath, fileBPath, formatType)).toBe(expected);
  });
});
