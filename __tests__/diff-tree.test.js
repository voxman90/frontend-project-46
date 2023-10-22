import { expect, test } from '@jest/globals';

import { nestedObjA, nestedObjB, diffNested } from '../__fixtures__/samples';
import getDiffTree from '../src/diff-tree';

test('getDiffTree', () => {
  expect(getDiffTree(nestedObjA, nestedObjB)).toEqual(diffNested);
});
