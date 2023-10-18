const makePair = (a, b) => (f) => f(a, b);

const car = (pair) => pair((a) => a);

const cdr = (pair) => pair((_, b) => b);

const nil = Symbol('empty');

const makeList = (...args) => {
  const rec = (index) => {
    if (args.length === index) {
      return nil;
    }

    return makePair(args[index], rec(index + 1));
  };

  return rec(0);
};

const isEmptyList = (list) => list === nil;

const getItemRef = (list, index) => {
  if (isEmptyList(list)) {
    return nil;
  }

  if (index === 0) {
    return car(list);
  }

  return getItemRef(cdr(list), index - 1);
};

const listLength = (list) => (
  (isEmptyList(list))
    ? 0
    : (1 + listLength(cdr(list)))
);

const appendList = (list, ...lists) => {
  if (lists.length === 0) {
    return list;
  }

  if (isEmptyList(list)) {
    return appendList(...lists);
  }

  return makePair(car(list), appendList(cdr(list), ...lists));
};

const reduceList = (list, callback, acc) => {
  if (isEmptyList(list)) {
    return acc;
  }

  return reduceList(cdr(list), callback, callback(acc, car(list)));
};

const isObjectAndNotArray = (data) => (
  typeof data === 'object'
  && data !== null
  && !Array.isArray(data)
);

export {
  makePair,
  car,
  cdr,
  makeList,
  isEmptyList,
  getItemRef,
  listLength,
  nil,
  appendList,
  reduceList,
  isObjectAndNotArray,
};
