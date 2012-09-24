describe('basic test', function () {
  var daemon;
  before(function () {
    amino
      .use(plugin, {quiet: true})
      .init();
    daemon = child_process.spawn(path.resolve(__dirname, '../bin/amino-log'));
    process.once('exit', function () {
      daemon.kill();
    });
  });

  it('log', function (done) {
    daemon.stdout.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'something!\n');
      done();
    });
    setTimeout(function () {
      amino.log('something!');
    }, 200);
  });

  it('warn', function (done) {
    daemon.stdout.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'blah...\n');
      done();
    });
    setTimeout(function () {
      amino.warn('blah...');
    }, 200);
  });

  it('error', function (done) {
    daemon.stderr.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'dude!\n');
      done();
    });
    setTimeout(function () {
      amino.error('dude!');
    }, 200);
  });

  it('vars', function (done) {
    daemon.stderr.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'hello stupid\n');
      done();
    });
    setTimeout(function () {
      amino.error('hello %s', ['stupid']);
    }, 200);
  });
});