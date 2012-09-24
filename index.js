exports.attach = function (options) {
  var amino = this;
  options || (options = {});

  amino.log = function () {
    var args = [].slice.call(arguments);
    amino.publish('log:stdout', args);
    if (!options.quiet) {
      console.log.apply(console, args);
    }
  };

  amino.warn = amino.log;

  amino.error = function () {
    var args = [].slice.call(arguments);
    amino.publish('log:stderr', args);
    if (!options.quiet) {
      console.error.apply(console, args);
    }
  };
};