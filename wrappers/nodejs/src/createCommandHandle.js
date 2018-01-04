function* createCommandHandle () {
  var handle = 0;
  while (true) {
    yield handle++;
  }
}

module.exports = createCommandHandle;
