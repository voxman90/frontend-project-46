/* eslint-disable import/prefer-default-export */

export const isObjectAndNotArray = (data) => (
  typeof data === 'object'
  && data !== null
  && !Array.isArray(data)
);
