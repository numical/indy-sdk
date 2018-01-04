const gcSafe = Symbol('gcSafe');
process[gcSafe] = new Map();

const preventGarbageCollection = (key, obj) => process[gcSafe].set(key, obj);
const allowGarbageCollection = (key) => process[gcSafe].delete(key);

module.exports = {
  preventGarbageCollection,
  allowGarbageCollection
};
