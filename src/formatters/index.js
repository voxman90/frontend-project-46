import formatDiffToJSON from './json.js';
import formatDiffToPlain from './plain.js';
import formatDiffToStylish from './stylish.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'plain': {
      return formatDiffToPlain;
    }
    case 'stylish': {
      return formatDiffToStylish;
    }
    case 'json': {
      return formatDiffToJSON;
    }
    default: {
      throw new Error('Unknown format type', formatName);
    }
  }
};

export default getFormatter;
