import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import getDiffTree from './diff-tree.js';
import getFormatter from './formatters/index.js';
import parseFileData from './parsers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFileExtension = (filepath) => path.extname(filepath).substring(1);

const getRawData = (filepath) => {
  const resolvedFilePath = path.resolve(__dirname, filepath);
  const rawData = fs.readFileSync(resolvedFilePath, 'utf8');
  return rawData;
};

const getFileData = (filepath) => parseFileData(
  getFileExtension(filepath),
  getRawData(filepath),
);

const getFileDiff = (filepath1, filepath2, formatName = 'stylish') => (
  getFormatter(formatName)(
    getDiffTree(
      getFileData(filepath1),
      getFileData(filepath2),
    ),
  )
);

export default getFileDiff;
