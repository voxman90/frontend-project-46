/* eslint-disable no-use-before-define */

import {
  unchanged,
  removed,
  added,
  weighted,
  getPropWeight,
  getPropKey,
  getPropValue,
  getUpdatedPropOldValue,
  getUpdatedPropNewValue,
  reduceDiff,
  filterDiff,
} from '../src/parsers.js';

const isObject = (value) => (typeof value === 'object' && value !== null);

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (isObject(value)) {
    return '[complex value]';
  }

  return `${value}`;
};

const formatWeightAndValue = (prop) => {
  const weigth = getPropWeight(prop);

  if (weigth === added) {
    return `added with value: ${formatValue(getPropValue(prop))}`;
  }

  if (weigth === removed) {
    return 'removed';
  }

  return `updated. From \
${formatValue(getUpdatedPropOldValue(prop))}\
 to \
${formatValue(getUpdatedPropNewValue(prop))}`;
};

const formatKey = (prop, path) => [...path, getPropKey(prop)].join('.');

const formatProp = (prop, path) => `Property '${formatKey(prop, path)}' was \
${formatWeightAndValue(prop)}`;

const formatDiff = (diffObj, path = []) => reduceDiff(
  filterDiff(diffObj, (prop) => (getPropWeight(prop) !== unchanged)),
  (acc, prop) => {
    if (getPropWeight(prop) === weighted) {
      return [...acc, formatDiff(getPropValue(prop), [...path, getPropKey(prop)])];
    }

    return [...acc, formatProp(prop, path)];
  },
  [],
).join('\n');

export default formatDiff;
