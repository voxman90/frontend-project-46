import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

import stylishDiff from './stylish.js';
import getDataDiff from './parsers.js';

const supportedFileTypes = ['json', 'yaml', 'yml'];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resolveFilePath = (filepath) => path.resolve(__dirname, filepath);

const getFileData = (resolvedFilePath) => fs.readFileSync(resolvedFilePath, 'utf8');

const getFileDataParser = (fileType) => {
  if ((fileType === 'yml') || (fileType === 'yaml')) {
    return yaml.load;
  }

  return JSON.parse;
};

const parseFile = (filepath) => {
  const resolvedFilePath = resolveFilePath(filepath);
  const fileType = path.extname(resolvedFilePath).substring(1);

  if (!supportedFileTypes.includes(fileType)) {
    throw new Error(`Unsupported file type: ${fileType}`);
  }

  return getFileDataParser(fileType)
    .call(null, getFileData(resolvedFilePath));
};

const getFileDiff = (filepath1, filepath2, formater) => formater(getDataDiff(
  parseFile(filepath1) || {},
  parseFile(filepath2) || {},
));

export default getFileDiff;
