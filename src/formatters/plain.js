/* eslint-disable no-use-before-define */

import { nodeWeight } from '../diff-tree.js';

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  const isObject = typeof value === 'object' && value !== null;
  if (isObject) {
    return '[complex value]';
  }

  return `${value}`;
};

const formatWeightAndValue = (leaf) => {
  const { weight } = leaf;

  if (weight === nodeWeight.added) {
    return `added with value: ${formatValue(leaf.value)}`;
  }

  if (weight === nodeWeight.removed) {
    return 'removed';
  }

  return `updated. From ${formatValue(leaf.value.old)} to ${formatValue(leaf.value.new)}`;
};

const formatLeaf = (leaf, parentKeys) => {
  const key = [...parentKeys, leaf.key].join('.');
  return `Property '${key}' was ${formatWeightAndValue(leaf)}`;
};

const formatNodes = (childrens, parentKeys = []) => childrens
  .filter(({ weight }) => weight !== nodeWeight.unchanged)
  .map((node) => (
    (node.weight === nodeWeight.inode)
      ? formatNodes(node.value, [...parentKeys, node.key])
      : formatLeaf(node, parentKeys)
  ))
  .join('\n');

const formatDiffTree = (root) => formatNodes(root.value);

export default formatDiffTree;
