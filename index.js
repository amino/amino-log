var format = require('util').format;

exports.attach = function (options) {
  var amino = this;

  amino.log = function (message, vars, channel) {
    if (typeof vars === 'string') {
      channel = vars;
      vars = [];
    }
    if (!vars) vars = [];
    if (!channel) channel = 'stdout';
    message = format.apply(null, [message].concat(vars));
    amino.publish('log:' + channel, message);
    if (!options.quiet) {
      channel === 'stderr' ? console.error(message) : console.log(message);
    }
  };
};