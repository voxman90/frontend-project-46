/* eslint-disable no-use-before-define */

import yaml from 'js-yaml';

const getParser = (fileExtension) => {
  switch (fileExtension) {
    case 'yaml':
    case 'yml': {
      return yaml.load;
    }
    case 'json': {
      return JSON.parse;
    }
    default: {
      throw new Error(`Unsupported file type: ${fileExtension}`);
    }
  }
};

export default getParser;
