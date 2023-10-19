import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

import getDiff from './parsers.js';
import getFormatter from '../formatters/index.js';

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

  return getFileDataParser(fileType)(getFileData(resolvedFilePath)) || {};
};

const getFileDiff = (filepath1, filepath2, formatName) => getFormatter(formatName)(
  getDiff(parseFile(filepath1), parseFile(filepath2)),
);

export default getFileDiff;
