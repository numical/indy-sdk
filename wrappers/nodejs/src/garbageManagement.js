const gcSafe = Symbol('gcSafe');
process[gcSafe] = new Map();

const allowGarbageCollection = (key) => process[gcSafe].delete(key);

const preventGarbageCollection = (key, obj) => process[gcSafe].set(key, obj);

module.exports = {
  allowGarbageCollection,
  preventGarbageCollection
};
