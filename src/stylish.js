/* eslint-disable no-use-before-define */

import {
  getPropValue,
  getPropKey,
  getPropWeight,
  isDiffObj,
  mapWeightedProperties,
} from './parsers';

import {
  makeList,
  appendList,
  reduceList,
  isObjectAndNotArray,
} from './utils';

const halfIndent = ' '.repeat(2);
const indent = halfIndent.repeat(2);
const zeroWeightPrefix = '  ';
const plusWeightPrefix = '+ ';
const minusWeightPrefix = '- ';

const stylishWeight = (prop) => {
  switch (getPropWeight(prop)) {
    case 1:
      return plusWeightPrefix;
    case -1:
      return minusWeightPrefix;
    default:
      return zeroWeightPrefix;
  }
};

const stylishKey = (prop) => `${getPropKey(prop)}: `;

const stylishValue = (depth, prop) => {
  const value = getPropValue(prop);

  if (isObjectAndNotArray(value)) {
    return stylishObj(depth + 1, value);
  }

  return makeList(`${value}`);
};

const stylishProp = (depth, prop, isWeightedProp = false) => appendList(
  makeList(
    '\n',
    halfIndent.repeat(2 * depth + 1),
    ((isWeightedProp) ? stylishWeight(prop) : halfIndent),
    stylishKey(prop),
  ),
  stylishValue(depth, prop),
);

const thisIsWeightedProp = true;

const stylishObj = (depth, obj) => appendList(
  makeList('{'),
  ...(
    (isDiffObj(obj))
      ? mapWeightedProperties(obj, (prop) => stylishProp(depth, prop, thisIsWeightedProp))
      : Object.keys(obj).sort().map((key) => stylishProp(depth, { key, value: obj[key] }))
  ),
  makeList('\n', indent.repeat(depth), '}'),
);

const stylishDiff = (diffObj) => reduceList(
  stylishObj(0, diffObj),
  (acc, b) => (acc + b),
  '',
);

export default stylishDiff;
