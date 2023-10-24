/* eslint-disable no-use-before-define */

import _ from 'lodash';

import { nodeWeight, makeLeaf } from '../diff-tree.js';

const halfIndent = ' '.repeat(2);
const indent = halfIndent.repeat(2);

const getPrefix = (node) => {
  switch (node.weight) {
    case nodeWeight.added:
      return '+ ';
    case nodeWeight.removed:
      return '- ';
    default:
      return halfIndent;
  }
};

const formatNodeValue = (depth, node) => {
  const { value, weight } = node;
  const isDiffTree = weight === nodeWeight.inode;

  if (isDiffTree) {
    return bracket(depth + 1, formatNodeList(depth + 1, value));
  }

  if (_.isPlainObject(value)) {
    return bracket(depth + 1, formatObject(depth + 1, value));
  }

  return value;
};

const formatNode = (depth, node) => {
  const indentation = halfIndent.repeat(2 * depth + 1);
  const prefix = getPrefix(node);
  const { key } = node;
  const value = formatNodeValue(depth, node);

  return `${indentation}${prefix}${key}: ${value}`;
};

const splitUpdatedNodes = (nodes) => nodes.flatMap((node) => {
  const { key } = node;

  if (node.weight === nodeWeight.updated) {
    return [
      makeLeaf(nodeWeight.removed, key, node.value.old),
      makeLeaf(nodeWeight.added, key, node.value.new),
    ];
  }

  return node;
});

const bracket = (depth, content) => `{\n${content}\n${indent.repeat(depth)}}`;

const formatNodeList = (depth, nodeList) => splitUpdatedNodes(nodeList)
  .map((node) => formatNode(depth, node))
  .join('\n');

const formatObject = (depth, obj) => _.sortBy(Object.keys(obj))
  .map((key) => formatNode(depth, makeLeaf(null, key, obj[key])))
  .join('\n');

const formatDiffTree = (root) => formatNodeValue(-1, root);

export default formatDiffTree;
