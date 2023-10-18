/* eslint-disable no-use-before-define */

import _ from 'lodash';

import { isObjectAndNotArray } from './utils.js';

const isWeighted = Symbol('weighted');

const getUniqueOwnKeys = (obj1, obj2) => Object.keys(obj1)
  .concat(Object.keys(obj2))
  .sort()
  .filter((item, index, arr) => arr.indexOf(item) === index);

const createWeightedProp = (weight, key, value) => ({ weight, key, value });

const processPropDiff = (key, obj1, obj2) => {
  if (!Object.hasOwn(obj2, key)) {
    return createWeightedProp(-1, key, obj1[key]);
  }

  if (!Object.hasOwn(obj1, key)) {
    return createWeightedProp(1, key, obj2[key]);
  }

  const propValue1 = obj1[key];
  const propValue2 = obj2[key];
  if (_.isEqual(propValue1, propValue2)) {
    return createWeightedProp(0, key, propValue1);
  }

  if (
    isObjectAndNotArray(propValue1)
    && isObjectAndNotArray(propValue2)
  ) {
    return createWeightedProp(0, key, createDiffObj(processObjDiff(propValue1, propValue2)));
  }

  return [
    createWeightedProp(-1, key, propValue1),
    createWeightedProp(1, key, propValue2),
  ];
};

const processObjDiff = (obj1, obj2) => getUniqueOwnKeys(obj1, obj2)
  .flatMap((key) => processPropDiff(key, obj1, obj2));

const createDiffObj = (weightedProperties) => ({
  [isWeighted]: true,
  weightedProperties,
});

const getDataDiff = (obj1, obj2) => createDiffObj(processObjDiff(obj1, obj2));

const getPropKey = (prop) => prop.key;

const getPropValue = (prop) => prop.value;

const getPropWeight = (prop) => prop.weight;

const mapWeightedProperties = (diffObj, callback) => diffObj.weightedProperties.map(callback);

const isDiffObj = (prop) => !!prop[isWeighted];

export default getDataDiff;
export {
  isWeighted,
  mapWeightedProperties,
  getPropValue,
  getPropKey,
  getPropWeight,
  isDiffObj,
};
