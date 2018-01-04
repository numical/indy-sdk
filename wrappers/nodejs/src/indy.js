const bindings = require('./bindings.js');
const debug = require('debug')('indy-sdk:indy');
const dummyFunction = require('./dummyFunction.js');
const ffi = require('ffi');
const path = require('path');

const getLibraryPath = () => (process.env.LIBINDY_PATH) ? 
  path.resolve(process.env.LIBINDY_PATH) :
  'libindy';

const bindToLibrary = () => {
  const libPath = getLibraryPath();
  debug('binding to library', libPath);
  try {
    const libFns = bindings.reduce(
      (funcs, bindingSpec) => {
        funcs[bindingSpec.libFn] = bindingSpec.libApi;
        return funcs;
      },
      {});
    debug('library functions defined', libFns);
    return ffi.Library(libPath, libFns);
  } catch (err) {
    err.message = err.message + ` (LIBRARY PATH : ${libPath}`;
    throw err;
  }
}

const createApiFn = (bindingSpec) => dummyFunction;

const defineApi = () => {
  bindToLibrary();
  debug('defining API');
  const api = {};
  bindings.forEach((bindingSpec) => {
    const { jsFn } = bindingSpec;
    api[jsFn] = createApiFn(bindingSpec);
  });
  return api;
};

module.exports = defineApi();
