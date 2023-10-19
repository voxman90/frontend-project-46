import { expect, test } from '@jest/globals';

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

const diffNested = [
  {
    weight: 3,
    key: 'common',
    value: [
      { weight: 1, key: 'follow', value: false },
      { weight: 0, key: 'setting1', value: 'Value 1' },
      { weight: -1, key: 'setting2', value: 200 },
      { weight: 2, key: 'setting3', value: { oldValue: true, newValue: null } },
      { weight: 1, key: 'setting4', value: 'blah blah' },
      { weight: 1, key: 'setting5', value: { key5: 'value5' } },
      {
        weight: 3,
        key: 'setting6',
        value: [
          {
            weight: 3,
            key: 'doge',
            value: [
              { weight: 2, key: 'wow', value: { oldValue: '', newValue: 'so much' } },
            ],
          },
          { weight: 0, key: 'key', value: 'value' },
          { weight: 1, key: 'ops', value: 'vops' },
        ],
      },
    ],
  },
  {
    weight: 3,
    key: 'group1',
    value: [
      { weight: 2, key: 'baz', value: { oldValue: 'bas', newValue: 'bars' } },
      { weight: 0, key: 'foo', value: 'bar' },
      { weight: 2, key: 'nest', value: { oldValue: { key: 'value' }, newValue: 'str' } },
    ],
  },
  { weight: -1, key: 'group2', value: { abc: 12345, deep: { id: 45 } } },
  { weight: 1, key: 'group3', value: { deep: { id: { number: 45 } }, fee: 100500 } },
];

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
