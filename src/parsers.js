/* eslint-disable no-use-before-define */

import _ from 'lodash';

import { isObjectAndNotArray } from './utils.js';

const removed = -1;
const unchanged = 0;
const added = 1;
const updated = 2;
const weighted = 3;

const getUniqueOwnKeys = (obj1, obj2) => Object.keys(obj1)
  .concat(Object.keys(obj2))
  .sort()
  .filter((item, index, arr) => arr.indexOf(item) === index);

const makeWeightedProp = (weight, key, value) => ({ weight, key, value });

const processPropDiff = (key, obj1, obj2) => {
  if (!Object.hasOwn(obj2, key)) {
    return makeWeightedProp(removed, key, obj1[key]);
  }

  if (!Object.hasOwn(obj1, key)) {
    return makeWeightedProp(added, key, obj2[key]);
  }

  const propValue1 = obj1[key];
  const propValue2 = obj2[key];
  if (_.isEqual(propValue1, propValue2)) {
    return makeWeightedProp(unchanged, key, propValue1);
  }

  if (
    isObjectAndNotArray(propValue1)
    && isObjectAndNotArray(propValue2)
  ) {
    return makeWeightedProp(weighted, key, processObjDiff(propValue1, propValue2));
  }

  return makeWeightedProp(updated, key, { oldValue: propValue1, newValue: propValue2 });
};

const processObjDiff = (obj1, obj2) => getUniqueOwnKeys(obj1, obj2)
  .map((key) => processPropDiff(key, obj1, obj2));

const getDiff = (obj1, obj2) => processObjDiff(obj1, obj2);

const getPropKey = (prop) => prop.key;

const getPropValue = (prop) => prop.value;

const getUpdatedPropOldValue = (prop) => prop.value.oldValue;

const getUpdatedPropNewValue = (prop) => prop.value.newValue;

const getPropWeight = (prop) => prop.weight;

const mapDiff = (diffObj, callback) => diffObj.map(callback);

const flatMapDiff = (diffObj, callback) => diffObj.flatMap(callback);

const filterDiff = (diffObj, pred) => diffObj.filter(pred);

const reduceDiff = (diffObj, callback, acc) => diffObj.reduce(callback, acc);

const makeDiffObj = (...weightedProperties) => weightedProperties;

export default getDiff;
export {
  removed,
  unchanged,
  added,
  updated,
  weighted,
  mapDiff,
  flatMapDiff,
  filterDiff,
  reduceDiff,
  getUpdatedPropOldValue,
  getUpdatedPropNewValue,
  getPropValue,
  getPropKey,
  getPropWeight,
  makeWeightedProp,
  makeDiffObj,
};
