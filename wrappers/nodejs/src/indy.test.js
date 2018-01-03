const indy = require('./indy.js');
const { test } = require('tap');

test('echo function', (test) => {
  test.type(indy.echo, 'function', 'indy has an echo function');

  const foo = 'foo';
  test.equal(indy.echo(foo), foo, 'echo function echoes passed string');

  const bar = { foo };
  test.equal(indy.echo(bar), bar, 'echo function echoes passed object');

  test.end();
});
