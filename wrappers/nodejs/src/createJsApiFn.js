const createCommandHandle = require('./createCommandHandle.js');
const debug = require('debug')('indy-sdk:createJsApiFn');
const callbackDebug = require('debug')('indy-sdk:ffi');
const ffi = require('ffi');
const { isFailure, getErrorMessage } = require('./errors.js');
const { allowGarbageCollection, preventGarbageCollection } = require('./garbageCollectionPrevention.js');

const createFfiCallback = (libFnName, jsCallback) => (commandHandle, errorCode) => {
  allowGarbageCollection(commandHandle);
  if (isFailure(errorCode)) {
    const error = new Error(getErrorMessage(errorCode));
    callbackDebug(libFnName, 'called back with errorCode', errorCode, error.message);
    jsCallback(error);
  } else {
    callbackDebug(libFnName, 'called back successfully');
    jsCallback();
  }
};

const createLibraryCallback = (ffiCallback) => ffi.Callback(
  'void',
  ['int', 'int'],
  ffiCallback
);

const callLibrary = (libFnName, libFn, jsCallback, args) => {
  // generate new command handle
  const commandHandle = createCommandHandle();
  args.unshift(commandHandle);

  // add library callback
  const ffiCallback = createFfiCallback(libFnName, jsCallback);
  const libCb = createLibraryCallback(ffiCallback);
  args.push(libCb);
  preventGarbageCollection(commandHandle, libCb);

  // call library function
  try {
    debug(libFnName, 'call with args', args);
    const errorCode = libFn(...args);
    // if a library error, lib does not call callback, so must handle error explicity
    if (isFailure(errorCode)) {
      allowGarbageCollection(commandHandle);
      const error = new Error(getErrorMessage(errorCode));
      callbackDebug(libFnName, 'returned with errorCode', errorCode, error.message);
      // jsCallback(error);
    }
  } catch (error) {
    allowGarbageCollection(commandHandle);
    callbackDebug(libFnName, 'threw an error', error.message);
    // ffi js code can also throw errors before lib code ever hit
    // jsCallback(error);
  }
};

const createJsApiFn = (libFnName, libFn) => {
  return (...args) => {
    // passed a javascript callback? - assume so if last argument a function
    if (typeof args[args.length - 1] === 'function') {
      const jsCallback = args.pop();
      callLibrary(libFnName, libFn, jsCallback, args);
    } else {
      return new Promise((resolve, reject) => {
        const jsCallback = (err) => (err) ? reject(err) : resolve();
        callLibrary(libFnName, libFn, jsCallback, args);
      });
    }
  };
};

module.exports = createJsApiFn;
