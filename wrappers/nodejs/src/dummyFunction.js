const dummyFunction = (...args) => {
  const lastArg = args[args.length - 1];
  if (typeof lastArg === 'function') {
    // assume passed a callback
    lastArg();
  } else {
    return Promise.resolve();
  }
};

module.exports = dummyFunction;
