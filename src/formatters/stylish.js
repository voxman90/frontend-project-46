/* eslint-disable no-use-before-define */

import { nodeWeight, makeLeaf } from '../diff-tree.js';
import { isObjectAndNotArray } from '../utils.js';

const thisIsNodeList = true;

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
    return formatObject(depth + 1, value, thisIsNodeList);
  }

  if (isObjectAndNotArray(value)) {
    return formatObject(depth + 1, value);
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

const formatObject = (depth, obj, isThisNodes = false) => {
  const formattedProperties = (isThisNodes)
    ? splitUpdatedNodes(obj)
      .map((node) => formatNode(depth, node))
      .join('\n')
    : Object.keys(obj)
      .toSorted()
      .map((key) => formatNode(depth, makeLeaf(null, key, obj[key])))
      .join('\n');
  const parenthesisIndent = indent.repeat(depth);

  return `{\n${formattedProperties}\n${parenthesisIndent}}`;
};

const formatDiffTree = (root) => formatObject(0, root.value, thisIsNodeList);

export default formatDiffTree;
