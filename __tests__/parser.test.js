import { expect, test } from '@jest/globals';
import yaml from 'js-yaml';

import getParser from '../src/parsers.js';

test('getParser', () => {
  expect(getParser('yml')).toEqual(getParser('yaml'));
  expect(getParser('yml')).toEqual(yaml.load);
  expect(getParser('json')).toEqual(JSON.parse);
});
