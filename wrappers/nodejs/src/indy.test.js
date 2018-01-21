const indy = require('./indy.js');
const bindings = require('./bindings.js');
const t = require('tap');
const { func, matchers, verify } = require('testdouble');
const { bail, only, skip } = require('./testOptions.js'); // eslint-disable-line no-unused-vars

t.test('all bindings exposed in API', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFnName } = bindingSpec;
    test.ok(indy[jsFnName], `${jsFnName} exists on API`);
    test.type(indy[jsFnName], 'function', `${jsFnName} is a function`);
  });
  test.end();
});

t.test('all bindings called with no args return a rejected Promise', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFnName } = bindingSpec;
    test.rejects(indy[jsFnName]());
  });
  test.end();
});

t.test('all bindings called with only a callback, callback an error', (test) => {
  bindings.forEach((bindingSpec) => {
    const { jsFnName } = bindingSpec;
    const callback = func();
    indy[jsFnName](callback);
    verify(callback(matchers.isA(Error)));
  });
  test.end();
});

t.test('all bindings passed correct args, return a rejected Promise', async (test) => {
  await Promise.all(bindings.map(async (bindingSpec) => {
    const { jsFnName, jsApi } = bindingSpec;
    const args = jsApi.slice(0, -1).map((name, index) => `arg${index}`);
    await test.rejects(indy[jsFnName](...args));
  }));
  test.end();
});

t.test('focus on single test', only, async (test) => {
  const { jsFnName, jsApi } = bindings[0];
  const args = jsApi.slice(0, -1).map((name, index) => `arg${index}`);
  await test.rejects(indy[jsFnName](...args));
  test.end();
});

t.test('all bindings passed correct args with a callback, callback an error', (test) => {
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
