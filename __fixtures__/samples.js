export const EEDiff = {
  weight: 3,
  key: 'root',
  value: [],
};

export const nestedObjA = {
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

export const nestedObjB = {
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

export const diffNested = {
  weight: 3,
  key: 'root',
  value: [
    {
      weight: 3,
      key: 'common',
      value: [
        { weight: 1, key: 'follow', value: false },
        { weight: 0, key: 'setting1', value: 'Value 1' },
        { weight: -1, key: 'setting2', value: 200 },
        { weight: 2, key: 'setting3', value: { old: true, new: null } },
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
                { weight: 2, key: 'wow', value: { old: '', new: 'so much' } },
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
        { weight: 2, key: 'baz', value: { old: 'bas', new: 'bars' } },
        { weight: 0, key: 'foo', value: 'bar' },
        { weight: 2, key: 'nest', value: { old: { key: 'value' }, new: 'str' } },
      ],
    },
    { weight: -1, key: 'group2', value: { abc: 12345, deep: { id: 45 } } },
    { weight: 1, key: 'group3', value: { deep: { id: { number: 45 } }, fee: 100500 } },
  ],
};

export const jsonEmptyDiff = '{"weight":3,"key":"root","value":[]}';

export const jsonNestedDiff = '{"weight":3,"key":"root","value":[{"weight":3,"key":"common","value":[{"weight":1,"key":"follow","value":false},{"weight":0,"key":"setting1","value":"Value 1"},{"weight":-1,"key":"setting2","value":200},{"weight":2,"key":"setting3","value":{"old":true,"new":null}},{"weight":1,"key":"setting4","value":"blah blah"},{"weight":1,"key":"setting5","value":{"key5":"value5"}},{"weight":3,"key":"setting6","value":[{"weight":3,"key":"doge","value":[{"weight":2,"key":"wow","value":{"old":"","new":"so much"}}]},{"weight":0,"key":"key","value":"value"},{"weight":1,"key":"ops","value":"vops"}]}]},{"weight":3,"key":"group1","value":[{"weight":2,"key":"baz","value":{"old":"bas","new":"bars"}},{"weight":0,"key":"foo","value":"bar"},{"weight":2,"key":"nest","value":{"old":{"key":"value"},"new":"str"}}]},{"weight":-1,"key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"weight":1,"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]}';

export const plainEmptyDiff = '';

export const plainNestedDiff = `\
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

export const stylishEmptyDiff = `{

}`;

export const stylishNestedDiff = `{
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
