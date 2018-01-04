const indy = require('./indy.js');
const bindings = require('./bindings.js');
const { test } = require('tap');
const { func, verify } = require('testdouble');

test('all bindings exposed in API', (test) => {
  Object.keys(bindings).forEach((fnName) => {
    test.ok(indy[fnName], `${fnName} exists on API`);
    test.type(indy[fnName], 'function', `${fnName} is a function`);
  });
  test.end();
});

test('all bindings called with no args return a resolved Promise', (test) => {
  Object.keys(bindings).forEach((fnName) => {
    test.resolves(indy[fnName]());
  });
  test.end();
});

test('all bindings passed a callback call that callback', (test) => {
  Object.keys(bindings).forEach((fnName) => {
    const callback = func();
    indy[fnName](callback);
    verify(callback());
  });
  test.end();
});
