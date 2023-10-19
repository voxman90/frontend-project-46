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
    default: {
      throw new Error('Unknown format type');
    }
  }
};

export default getFormatter;
