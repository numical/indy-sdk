const indy = require('./indy.js');
const bindings = require('./bindings.js');
const { test } = require('tap');
const { func, matchers, verify } = require('testdouble');

test('all bindings exposed in API', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFnName } = bindingSpec;
    test.ok(indy[jsFnName], `${jsFnName} exists on API`);
    test.type(indy[jsFnName], 'function', `${jsFnName} is a function`);
  });
  test.end();
});

test('all bindings called with no args return a rejected Promise', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFnName } = bindingSpec;
    test.rejects(indy[jsFnName]());
  });
  test.end();
});

test('all bindings passed a callback only, callback an error', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFnName } = bindingSpec;
    const callback = func();
    indy[jsFnName](callback);
    verify(callback(matchers.isA(Error)));
  });
  test.end();
});

test('all bindings passed correct args, return a rejected Promise', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFnName, jsApi } = bindingSpec;
    const args = jsApi.slice(0, -1).map((name, index) => `arg${index}`);
    test.rejects(indy[jsFnName](...args));
  });
  test.end();
});

test('all bindings passed correct args with a callback, callback an error', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFnName, jsApi } = bindingSpec;
    const args = jsApi.slice(0, -1).map((name, index) => `arg${index}`);
    const callback = func();
    args.push(callback);
    indy[jsFnName](...args);
    verify(callback(matchers.isA(Error)));
  });
  test.end();
});
