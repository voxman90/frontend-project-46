import { expect, describe, test } from '@jest/globals';

import formatDiff from '../../formatters/plain.js';

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

const plainEmptyDiff = '';

const plainNestedDiff = `\
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

describe('Test stylishDiff', () => {
  test('test empty diff', () => {
    expect(formatDiff(EEDiff)).toEqual(plainEmptyDiff);
  });

  test('test nested diff', () => {
    expect(formatDiff(diffNested)).toEqual(plainNestedDiff);
  });
});
