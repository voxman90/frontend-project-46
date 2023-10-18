import { expect, describe, test } from '@jest/globals';

import {
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
} from '../src/utils.js';

describe('Test pairs', () => {
  test('test makePair, car, cdr', () => {
    const a = 'a';
    const b = 'b';
    const pair1 = makePair(a, b);
    const pair2 = makePair(pair1, pair1);
    const pair3 = makePair(a, b);

    expect(car(pair1)).toEqual(a);
    expect(cdr(pair1)).toEqual(b);
    expect(car(pair2)).toEqual(cdr(pair2));
    expect(car(pair1)).not.toEqual(pair3);
  });
});

describe('Test lists', () => {
  test('test makeList', () => {
    const list1 = makeList(1, 2, 3);

    expect(car(list1)).toEqual(1);
    expect(car(cdr(list1))).toEqual(2);
    expect(car(cdr(cdr(list1)))).toEqual(3);
    expect(cdr(cdr(cdr(list1)))).toEqual(nil);
  });

  test('test getItemRef', () => {
    const list1 = makeList(1, 2, 3);

    expect(getItemRef(list1, 0)).toEqual(1);
    expect(getItemRef(list1, 1)).toEqual(2);
    expect(getItemRef(list1, 2)).toEqual(3);
    expect(getItemRef(list1, 3)).toEqual(nil);
    expect(getItemRef(list1, -1)).toEqual(nil);
  });

  test('test listLength', () => {
    const list1 = makeList();
    const list2 = makeList(1);
    const list3 = makeList(1, 2, list2);

    expect(listLength(list1)).toEqual(0);
    expect(listLength(list2)).toEqual(1);
    expect(listLength(list3)).toEqual(3);
  });

  test('test isEmptyList', () => {
    const list1 = makeList();

    expect(isEmptyList(nil)).toBeTruthy();
    expect(isEmptyList(list1)).toBeTruthy();
  });

  test('test appendList', () => {
    const listE = makeList();
    const list1 = makeList(1);
    const list2 = makeList(2, list1);
    const append1 = appendList(listE, list1);
    const append2 = appendList(list1, listE);
    const append3 = appendList(list1, list2);

    expect(car(append1)).toEqual(1);
    expect(listLength(append1)).toEqual(1);
    expect(car(append2)).toEqual(1);
    expect(listLength(append2)).toEqual(1);
    expect(car(append3)).toEqual(1);
    expect(car(cdr(append3))).toEqual(2);
    expect(car(cdr(cdr(append3)))).toEqual(list1);
    expect(listLength(append3)).toEqual(3);

    const list3 = makeList(3, 4);
    const append4 = appendList(listE, list1, list2, list3);

    expect(getItemRef(append4, 0)).toEqual(1);
    expect(getItemRef(append4, 1)).toEqual(2);
    expect(getItemRef(append4, 2)).toEqual(list1);
    expect(getItemRef(append4, 3)).toEqual(3);
    expect(getItemRef(append4, 4)).toEqual(4);
    expect(getItemRef(append4, 5)).toEqual(nil);
  });

  test('test reduceList', () => {
    const listE = makeList();
    const list1 = makeList(1, 2, 3, 4, 5);

    expect(reduceList(listE, (a, b) => (a + b), 0)).toEqual(0);
    expect(reduceList(list1, (a, b) => (a + b), 0)).toEqual(15);
    expect(reduceList(list1, (a, b) => (a + b), '')).toEqual('12345');
  });
});

describe('Test isObjectAndNotArray', () => {
  test('test array, obj, func and so on', () => {
    expect(isObjectAndNotArray({})).toBeTruthy();
    expect(isObjectAndNotArray({ prop1: 'val1', prop2: { prop3: 2 } })).toBeTruthy();

    expect(isObjectAndNotArray([])).toBeFalsy();
    expect(isObjectAndNotArray(1)).toBeFalsy();
    expect(isObjectAndNotArray('')).toBeFalsy();
    expect(isObjectAndNotArray(null)).toBeFalsy();
  });
});
