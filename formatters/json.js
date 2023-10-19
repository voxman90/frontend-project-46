/* eslint-disable no-use-before-define */

import {
  weighted,
  getPropWeight,
  getPropKey,
  getPropValue,
  mapDiff,
} from '../src/parsers.js';

const formatWeight = (prop) => `"weight":${formatValue(getPropWeight(prop))}`;

const formatKey = (prop) => `"key":${formatValue(getPropKey(prop))}`;

const formatPropValue = (prop) => `"value":${formatValue(getPropValue(prop))}`;

const formatArray = (array) => `[\
${array.map((value) => formatValue(value)).join(',')}\
]`;

const formatObj = (obj) => `{\
${Object.entries(obj).map(([key, value]) => `${formatValue(key)}:${formatValue(value)}`).join(',')}\
}`;

const formatValue = (value) => {
  switch (true) {
    case (value === null): {
      return 'null';
    }
    case (Array.isArray(value)): {
      return formatArray(value);
    }
    case (typeof value === 'object'): {
      return formatObj(value);
    }
    case (typeof value === 'string'): {
      return `"${value}"`;
    }
    default:
      return `${value}`;
  }
};

const isPropValueDiffObj = (prop) => formatWeight(prop) === weighted;

const formatWeightedProp = (prop) => `{\
${formatWeight(prop)},\
${formatKey(prop)},\
${(isPropValueDiffObj(prop)) ? formatDiffObj(getPropValue(prop)) : formatPropValue(prop)}}`;

const formatDiffObj = (diffObj) => `[\
${mapDiff(diffObj, (prop) => formatWeightedProp(prop)).join(',')}\
]`;

const formatDiff = (diffObj) => formatDiffObj(diffObj);

export default formatDiff;
