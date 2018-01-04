const createCommandHandle = require('./createCommandHandle.js');
const createError = require('./createError.js');
const debug = require('debug')('indy-sdk:createJsApiFn');
const ffi = require('ffi');

const gcSafe = new Map();
const preventGarbageCollection = (commandHandle, obj) => gcSafe.set(commandHandle, obj);
const allowGarbageCollection = (commandHandle) => gcSafe.delete(commandHandle);

const createFfiCallback = (errorHandler) => (commandHandle, errorCode) => {
  allowGarbageCollection(commandHandle);
  const error = createError(errorCode);
  errorHandler(error);
};

const createLibraryCallback = (ffiCallback) => ffi.Callback(
  'void',
  ['int', 'int'],
  ffiCallback
);

const callLibrary = (libFn, errorHandler, ...args) => {
  // generate new command handle
  const commandHandle = createCommandHandle();
  args.unshift(commandHandle);

  // add library callback
  const ffiCallback = createFfiCallback(errorHandler);
  const libCb = createLibraryCallback(ffiCallback);
  preventGarbageCollection(commandHandle, libCb);
  args.push(libCb);

  // call library function
  try {
    const errorCode = libFn(args);
    // if a library error, lib does not call callback, so must do explicity
    allowGarbageCollection(commandHandle);
    errorHandler(error);
  } catch (error) {
    allowGarbageCollection(commandHandle);
    errorHandler(error);
  }
};

// TODO : fail vs success handlers...

const createJsApiFn = (libFn) => {
  return (...args) => {
    debug('api call', libFn.name);

    // passed a javascript callback?
    // assume so if last argument a function - pop off the arguments list and store
    const jsCallback = (typeof args[args.length - 1] === 'function') ? args.pop() : undefined;

    // callback or promise-based processing
    if (jsCallback) {
      const errorHandler = (error) => error ? jsCallback(error) : jsCallback(); 
      callLibrary(libFn, errorHandler, args);
    } else {
      return new Promise((resolve, reject) => {
        const errorHandler = (error) => error ? reject(error) : resolve();
        callLibrary(libFn, errorHandler, args);
      });
    }
  };
};

module.exports = createJsApiFn;
