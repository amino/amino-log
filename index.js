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
    amino.publish('log:' + channel, format.apply(null, [message].concat(vars)));
  };
};