/* eslint-disable no-use-before-define */

import {
  removed,
  added,
  updated,
  weighted,
  makeDiffObj,
  makeWeightedProp,
  getPropWeight,
  getPropKey,
  getPropValue,
  getUpdatedPropOldValue,
  getUpdatedPropNewValue,
  mapDiff,
  flatMapDiff,
} from '../src/parsers.js';

import {
  makeList,
  appendList,
  reduceList,
  isObjectAndNotArray,
} from '../src/utils.js';

const halfIndent = ' '.repeat(2);
const indent = halfIndent.repeat(2);
const addedPropPrefix = '+ ';
const removedPropPrefix = '- ';

const isDiffObj = (prop) => getPropWeight(prop) === weighted;

const sortedOwnKeys = (obj) => Object.keys(obj).sort();

const formatWeight = (prop) => {
  switch (getPropWeight(prop)) {
    case added:
      return addedPropPrefix;
    case removed:
      return removedPropPrefix;
    default:
      return halfIndent;
  }
};

const formatKey = (prop) => `${getPropKey(prop)}: `;

const formatValue = (depth, prop) => {
  const value = getPropValue(prop);

  if (isDiffObj(prop)) {
    return formatObj(depth + 1, value, thisIsDiffObj);
  }

  if (isObjectAndNotArray(value)) {
    return formatObj(depth + 1, value);
  }

  return makeList(`${value}`);
};

const formatProp = (depth, prop) => appendList(
  makeList(
    '\n',
    halfIndent.repeat(2 * depth + 1),
    formatWeight(prop),
    formatKey(prop),
  ),
  formatValue(depth, prop),
);

const splitUpdatedProperties = (diffObj) => flatMapDiff(diffObj, (prop) => {
  if (getPropWeight(prop) === updated) {
    const key = getPropKey(prop);

    return makeDiffObj(
      makeWeightedProp(-1, key, getUpdatedPropOldValue(prop)),
      makeWeightedProp(1, key, getUpdatedPropNewValue(prop)),
    );
  }

  return prop;
});

const formatObj = (depth, obj, isDiff = false) => appendList(
  makeList('{'),
  ...(
    (isDiff)
      ? mapDiff(
        splitUpdatedProperties(obj),
        (prop) => formatProp(depth, prop),
      )
      : sortedOwnKeys(obj).map(
        (key) => formatProp(depth, makeWeightedProp(null, key, obj[key])),
      )
  ),
  makeList('\n', indent.repeat(depth), '}'),
);

const thisIsDiffObj = true;

const formatDiff = (diffObj) => reduceList(
  formatObj(0, diffObj, thisIsDiffObj),
  (acc, b) => (acc + b),
  '',
);

export default formatDiff;
