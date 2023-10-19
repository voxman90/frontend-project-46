import { expect, describe, test } from '@jest/globals';

import formatDiff from '../../formatters/json.js';

const EEDiff = [];

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

const plainEmptyDiff = '[]';

const plainNestedDiff = '[{"weight":3,"key":"common","value":[{"weight":1,"key":"follow","value":false},{"weight":0,"key":"setting1","value":"Value 1"},{"weight":-1,"key":"setting2","value":200},{"weight":2,"key":"setting3","value":{"oldValue":true,"newValue":null}},{"weight":1,"key":"setting4","value":"blah blah"},{"weight":1,"key":"setting5","value":{"key5":"value5"}},{"weight":3,"key":"setting6","value":[{"weight":3,"key":"doge","value":[{"weight":2,"key":"wow","value":{"oldValue":"","newValue":"so much"}}]},{"weight":0,"key":"key","value":"value"},{"weight":1,"key":"ops","value":"vops"}]}]},{"weight":3,"key":"group1","value":[{"weight":2,"key":"baz","value":{"oldValue":"bas","newValue":"bars"}},{"weight":0,"key":"foo","value":"bar"},{"weight":2,"key":"nest","value":{"oldValue":{"key":"value"},"newValue":"str"}}]},{"weight":-1,"key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"weight":1,"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

describe('Test stylishDiff', () => {
  test('test empty diff', () => {
    expect(formatDiff(EEDiff)).toEqual(plainEmptyDiff);
  });

  test('test nested diff', () => {
    expect(formatDiff(diffNested)).toEqual(plainNestedDiff);
  });
});
