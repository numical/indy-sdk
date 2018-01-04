//  complete okerkill for an integer incrementer but I suspect
//  this will have to get much cleverer.

function * generator () {
  var handle = 0;
  while (true) {
    yield handle++;
  }
}

const iterator = generator();

const mapper = () => iterator.next().value;

module.exports = mapper;
