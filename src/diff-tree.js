/* eslint-disable no-use-before-define */

import _ from 'lodash';

import { isObjectAndNotArray } from './utils.js';

const nodeWeight = {
  removed: -1,
  unchanged: 0,
  added: 1,
  updated: 2,
  inode: 3,
};

const getUniqueOwnKeys = (obj1, obj2) => _.sortBy(Object.keys(obj1).concat(Object.keys(obj2)))
  .filter((item, index, arr) => arr.indexOf(item) === index);

const getPropDiff = (key, obj1, obj2) => {
  if (!Object.hasOwn(obj2, key)) {
    return makeLeaf(nodeWeight.removed, key, obj1[key]);
  }

  if (!Object.hasOwn(obj1, key)) {
    return makeLeaf(nodeWeight.added, key, obj2[key]);
  }

  const propValue1 = obj1[key];
  const propValue2 = obj2[key];
  if (_.isEqual(propValue1, propValue2)) {
    return makeLeaf(nodeWeight.unchanged, key, propValue1);
  }

  if (
    isObjectAndNotArray(propValue1)
    && isObjectAndNotArray(propValue2)
  ) {
    return makeDiffTree(key, propValue1, propValue2);
  }

  return makeLeaf(nodeWeight.updated, key, { old: propValue1, new: propValue2 });
};

const getObjDiff = (obj1, obj2) => getUniqueOwnKeys(obj1, obj2)
  .map((key) => getPropDiff(key, obj1, obj2));

const makeDiffTree = (key, obj1, obj2) => ({
  weight: nodeWeight.inode,
  key,
  value: getObjDiff(obj1, obj2),
});

const makeLeaf = (weight, key, value) => ({ weight, key, value });

const getDiffTree = (obj1, obj2) => makeDiffTree('root', obj1, obj2);

export default getDiffTree;
export {
  nodeWeight,
  makeLeaf,
};
