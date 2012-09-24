describe('basic test', function () {
  var daemon;
  before(function () {
    amino
      .use(plugin)
      .init();
    daemon = child_process.spawn(path.resolve(__dirname, '../bin/amino-log'));
    process.once('exit', function () {
      daemon.kill();
    });
  });

  it('stdout', function (done) {
    daemon.stdout.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'something!\n');
      done();
    });
    setTimeout(function () {
      amino.log('something!');
    }, 200);
  });

  it('stderr', function (done) {
    daemon.stderr.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'dude!\n');
      done();
    });
    setTimeout(function () {
      amino.log('dude!', 'stderr');
    }, 200);
  });

  it('vars', function (done) {
    daemon.stderr.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'hello stupid\n');
      done();
    });
    setTimeout(function () {
      amino.log('hello %s', ['stupid'], 'stderr');
    }, 200);
  });
});