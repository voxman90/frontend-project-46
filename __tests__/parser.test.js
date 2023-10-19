import { expect, test } from '@jest/globals';

import {
  diffNested,
} from '../__fixtures__/samples';
import getDiff, {
  mapDiff,
  filterDiff,
  getPropValue,
  getPropKey,
  getPropWeight,
} from '../src/parsers.js';

const nestedObjA = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const nestedObjB = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

test('Test getDataDiff for nested objects', () => {
  expect(getDiff(nestedObjA, nestedObjB)).toEqual(diffNested);
});

const diffObj1 = [
  { weight: -1, key: 'one', value: 1 },
  { weight: 0, key: 'two', value: 2 },
  { weight: 1, key: 'three', value: 3 },
  { weight: 2, key: 'four', value: { oldValue: '4', newValue: 4 } },
];

test('test mapDiff, filterDiff, reduceDiff, getPropValue, getPropKey, getPropWeight', () => {
  const mappingResult = [
    [-1, 'one', 1],
    [0, 'two', 2],
    [1, 'three', 3],
  ];

  const filterDiffResult = filterDiff(diffObj1, (prop) => getPropWeight(prop) !== 2);

  expect(mapDiff(filterDiffResult, (prop) => [
    getPropWeight(prop),
    getPropKey(prop),
    getPropValue(prop),
  ])).toEqual(mappingResult);
});
