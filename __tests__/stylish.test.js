import { expect, describe, test } from '@jest/globals';

import stylishDiff from '../src/stylish.js';
import { isWeighted } from '../src/parsers.js';

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

const stylishABDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const stylishAEDiff = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;

const stylishEBDiff = `{
  + host: hexlet.io
  + timeout: 20
  + verbose: true
}`;

const stylishEmptyDiff = `{
}`;

const stylishNestedDiff = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

describe('Test stylishDiff', () => {
  test('test flat diff', () => {
    expect(stylishDiff(flatAflatBDiff)).toEqual(stylishABDiff);
    expect(stylishDiff(flatAEDiff)).toEqual(stylishAEDiff);
    expect(stylishDiff(EflatBDiff)).toEqual(stylishEBDiff);
  });

  test('test empty diff', () => {
    expect(stylishDiff(EEDiff)).toEqual(stylishEmptyDiff);
  });

  test('test nested diff', () => {
    expect(stylishDiff(diffNested)).toEqual(stylishNestedDiff);
  });
});
