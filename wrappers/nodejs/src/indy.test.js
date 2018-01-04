const indy = require('./indy.js');
const bindings = require('./bindings.js');
const { test, only } = require('tap');
const { func, verify } = require('testdouble');

test('all bindings exposed in API', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFn } = bindingSpec;
    test.ok(indy[jsFn], `${jsFn} exists on API`);
    test.type(indy[jsFn], 'function', `${jsFn} is a function`);
  });
  test.end();
});

test('all bindings called with no args return a resolved Promise', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFn } = bindingSpec;
    test.resolves(indy[jsFn]());
  });
  test.end();
});

test('all bindings call a passed callback', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFn } = bindingSpec;
    const callback = func();
    indy[jsFn](callback);
    verify(callback());
  });
  test.end();
});
