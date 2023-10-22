import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import getDiffTree from './diff-tree.js';
import getFormatter from './formatters/index.js';
import getParser from './parsers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFileExtension = (filepath) => path.extname(filepath).substring(1);

const getRawData = (filepath) => {
  const resolvedFilePath = path.resolve(__dirname, filepath);
  const rawData = fs.readFileSync(resolvedFilePath, 'utf8');
  return rawData;
};

const getFileDiff = (filepath1, filepath2, formatName) => {
  try {
    return getFormatter(formatName)(
      getDiffTree(
        getParser(getFileExtension(filepath1))(getRawData(filepath1)) || {},
        getParser(getFileExtension(filepath2))(getRawData(filepath2)) || {},
      ),
    );
  } catch (error) {
    return error.message;
  }
};

export default getFileDiff;
