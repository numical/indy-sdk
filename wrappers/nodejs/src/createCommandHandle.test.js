const createCommandHandle = require('./createCommandHandle.js');
const { test } = require('tap');

test('createCommandHandle generates a sequence', (test) => {
  for (let i = 0; i < 10; i++) {
    test.equal(createCommandHandle(), i);
  }
  test.end();
});
