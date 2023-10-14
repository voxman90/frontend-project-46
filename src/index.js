import path from 'path';
import fs from 'fs';
import process from 'node:process';

const supportedFileTypes = ['json'];

const resolveFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (resolvedFilePath) => fs.readFileSync(resolvedFilePath, 'utf8');

const parseFile = (filepath) => {
  const resolvedFilePath = resolveFilePath(filepath);
  const fileType = path.extname(resolvedFilePath);

  if (!supportedFileTypes.includes(fileType.substring(1))) {
    throw new Error('Unsupported file type -- PARSE');
  }

  return JSON.parse(getFileData(resolvedFilePath) || {});
};

const getUniqueKeys = (obj1, obj2) => Object.keys(obj1)
  .concat(Object.keys(obj2))
  .sort()
  .filter((item, index, arr) => arr.indexOf(item) === index);

const formPropOutput = (key, obj1, obj2, indent) => {
  if (!Object.hasOwn(obj2, key)) {
    return `${indent}- ${key}: ${obj1[key]}`;
  }

  if (!Object.hasOwn(obj1, key)) {
    return `${indent}+ ${key}: ${obj2[key]}`;
  }

  const propValue1 = obj1[key];
  const propValue2 = obj2[key];
  switch (true) {
    case (Number.isNaN(propValue1) && Number.isNaN(propValue2)):
    case (propValue1 === propValue2):
      return `${indent.repeat(2)}${key}: ${propValue1}`;
    default:
      return `${indent}- ${key}: ${propValue1}\n${indent}+ ${key}: ${propValue2}`;
  }
};

const formDataDiffOutput = (uniqueKeys, data1, data2) => `{
${uniqueKeys.map((key) => formPropOutput(key, data1, data2, '  ')).join('\n')}
}`;

const getDataDiff = (data1, data2) => {
  const uniqueKeys = getUniqueKeys(data1, data2);

  return formDataDiffOutput(uniqueKeys, data1, data2);
};

const getFileDiff = (filepath1, filepath2) => getDataDiff(
  parseFile(filepath1),
  parseFile(filepath2),
);

export default getFileDiff;
