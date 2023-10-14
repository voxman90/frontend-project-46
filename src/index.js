import * as path from 'path';
import * as fs from 'fs';
import process from 'node:process';

const supportedFileTypes = ['json'];

const resolveFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileData = (resolvedFilePath) => fs.readFileSync(resolvedFilePath, 'utf8');

const parse = (filepath) => {
  const resolvedFilePath = resolveFilePath(filepath);
  const fileType = path.extname(resolvedFilePath);

  if (!supportedFileTypes.includes(fileType.substring(1))) {
    throw new Error('Unsupported file type -- PARSE');
  }

  let data = {};

  try {
    data = getFileData(resolvedFilePath);
  } catch (err) {
    console.log(err);
  }

  return JSON.parse(data);
};

export default parse;
export { parse };
