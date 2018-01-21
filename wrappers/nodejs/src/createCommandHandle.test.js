const createCommandHandle = require('./createCommandHandle.js');
const t = require('tap');

t.test('createCommandHandle generates a sequence', (test) => {
  for (let i = 0; i < 10; i++) {
    test.equal(createCommandHandle(), i);
  }
  test.end();
});
