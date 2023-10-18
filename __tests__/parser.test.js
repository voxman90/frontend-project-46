import { expect, describe, test } from '@jest/globals';

import getDataDiff, {
  isWeighted,
  mapWeightedProperties,
  getPropValue,
  getPropKey,
  getPropWeight,
  isDiffObj,
} from '../src/parsers.js';

const flatObjA = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const flatObjB = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

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

const emptyObj = {};

const flatAflatBDiff = {
  [isWeighted]: true,
  weightedProperties: [
    { weight: -1, key: 'follow', value: false },
    { weight: 0, key: 'host', value: 'hexlet.io' },
    { weight: -1, key: 'proxy', value: '123.234.53.22' },
    { weight: -1, key: 'timeout', value: 50 },
    { weight: 1, key: 'timeout', value: 20 },
    { weight: 1, key: 'verbose', value: true },
  ],
};

const flatAEDiff = {
  [isWeighted]: true,
  weightedProperties: [
    { weight: -1, key: 'follow', value: false },
    { weight: -1, key: 'host', value: 'hexlet.io' },
    { weight: -1, key: 'proxy', value: '123.234.53.22' },
    { weight: -1, key: 'timeout', value: 50 },
  ],
};

const EflatBDiff = {
  [isWeighted]: true,
  weightedProperties: [
    { weight: 1, key: 'host', value: 'hexlet.io' },
    { weight: 1, key: 'timeout', value: 20 },
    { weight: 1, key: 'verbose', value: true },
  ],
};

const EEDiff = {
  [isWeighted]: true,
  weightedProperties: [],
};

const diffNested = {
  [isWeighted]: true,
  weightedProperties: [
    {
      weight: 0,
      key: 'common',
      value: {
        [isWeighted]: true,
        weightedProperties: [
          { weight: 1, key: 'follow', value: false },
          { weight: 0, key: 'setting1', value: 'Value 1' },
          { weight: -1, key: 'setting2', value: 200 },
          { weight: -1, key: 'setting3', value: true },
          { weight: 1, key: 'setting3', value: null },
          { weight: 1, key: 'setting4', value: 'blah blah' },
          { weight: 1, key: 'setting5', value: { key5: 'value5' } },
          {
            weight: 0,
            key: 'setting6',
            value: {
              [isWeighted]: true,
              weightedProperties: [
                {
                  weight: 0,
                  key: 'doge',
                  value: {
                    [isWeighted]: true,
                    weightedProperties: [
                      { weight: -1, key: 'wow', value: '' },
                      { weight: 1, key: 'wow', value: 'so much' },
                    ],
                  },
                },
                { weight: 0, key: 'key', value: 'value' },
                { weight: 1, key: 'ops', value: 'vops' },
              ],
            },
          },
        ],
      },
    },
    {
      weight: 0,
      key: 'group1',
      value: {
        [isWeighted]: true,
        weightedProperties: [
          { weight: -1, key: 'baz', value: 'bas' },
          { weight: 1, key: 'baz', value: 'bars' },
          { weight: 0, key: 'foo', value: 'bar' },
          { weight: -1, key: 'nest', value: { key: 'value' } },
          { weight: 1, key: 'nest', value: 'str' },
        ],
      },
    },
    { weight: -1, key: 'group2', value: { abc: 12345, deep: { id: 45 } } },
    { weight: 1, key: 'group3', value: { deep: { id: { number: 45 } }, fee: 100500 } },
  ],
};

describe('Test getDataDiff', () => {
  test('test flat data', () => {
    expect(getDataDiff(flatObjA, flatObjB)).toEqual(flatAflatBDiff);
  });

  test('test empty data', () => {
    expect(getDataDiff(flatObjA, emptyObj)).toEqual(flatAEDiff);
    expect(getDataDiff(emptyObj, flatObjB)).toEqual(EflatBDiff);
    expect(getDataDiff(emptyObj, emptyObj)).toEqual(EEDiff);
  });

  test('test nested data', () => {
    expect(getDataDiff(nestedObjA, nestedObjB)).toEqual(diffNested);
  });
});

test('test isDiffObj', () => {
  expect(isDiffObj(diffNested)).toBeTruthy();
  expect(isDiffObj(flatAflatBDiff)).toBeTruthy();
  expect(isDiffObj(EEDiff)).toBeTruthy();
  expect(isDiffObj(emptyObj)).toBeFalsy();
  expect(isDiffObj(flatObjA)).toBeFalsy();
});

test('test mapWeightedProperties, getPropValue, getPropKey, getPropWeight', () => {
  const mappingResult = [
    [1, 'host', 'hexlet.io'],
    [1, 'timeout', 20],
    [1, 'verbose', true],
  ];

  expect(
    mapWeightedProperties(EflatBDiff, (prop) => [
      getPropWeight(prop),
      getPropKey(prop),
      getPropValue(prop),
    ]),
  ).toEqual(mappingResult);

  expect(
    mapWeightedProperties(EEDiff, (x) => x),
  ).toEqual([]);
});
