// const ffi = require('ffi');
const bindings = require('./bindings.js');
const dummyFunction = require('./dummyFunction.js');

// const libindy = ffi.Library('libindy', bindings);

const createApiFn = (fnApi) => dummyFunction;

const defineApi = (bindings) => {
  const api = {};
  Object.entries(bindings).forEach(([fnName, fnApi]) => {
    api[fnName] = createApiFn(fnApi);
  });
  return api;
};

module.exports = defineApi(bindings);
