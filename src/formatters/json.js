const format = (value) => {
  switch (true) {
    case (value === null): {
      return 'null';
    }
    case (Array.isArray(value)): {
      return `[${
        value.map((item) => format(item)).join(',')
      }]`;
    }
    case (typeof value === 'object'): {
      return `{${
        Object.entries(value)
          .map(([key, val]) => `${format(key)}:${format(val)}`)
          .join(',')
      }}`;
    }
    case (typeof value === 'string'): {
      return `"${value}"`;
    }
    default:
      return `${value}`;
  }
};

const formatDiffTree = (root) => format(root);

export default formatDiffTree;
