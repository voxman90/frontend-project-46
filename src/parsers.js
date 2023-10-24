import yaml from 'js-yaml';

const parseRawData = (fileExtension, rawData) => {
  switch (fileExtension) {
    case 'yaml':
    case 'yml': {
      return yaml.load(rawData);
    }
    case 'json': {
      return JSON.parse(rawData);
    }
    default: {
      throw new Error(`Unsupported type: ${fileExtension}`);
    }
  }
};

export default parseRawData;
