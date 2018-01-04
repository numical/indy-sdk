const indy = require('./indy.js');
const bindings = require('./bindings.js');
const { test, only } = require('tap');
const { func, verify, when } = require('testdouble');

test('all bindings exposed in API', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFn } = bindingSpec;
    test.ok(indy[jsFn], `${jsFn} exists on API`);
    test.type(indy[jsFn], 'function', `${jsFn} is a function`);
  });
  test.end();
});

test('all bindings called with no args return a rejected Promise', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFn } = bindingSpec;
    test.rejects(indy[jsFn]());
  });
  test.end();
});

test('all bindings passed a callback call it', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFn } = bindingSpec;
    const callback = func();
    when(indy[jsFn]()).thenCallback(err);
    // verify(callback());
  });
  test.end();
});
/*
test('all bindings called with only a callback, callback an error', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFn } = bindingSpec;
    const callback = func();
    indy[jsFn](callback);
    verify(callback());
  });
  test.end();
});
*/
