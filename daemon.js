function list (str) {
  return str.split(/ *, */).map(function (val) {
    return val.match(/^\d+$/) ? parseInt(val, 10) : val;
  });
}

var program = require('commander')
  .version(require('./package').version)
  .option('-r, --redis <port/host/host:port/list>', 'redis server(s) used by the service (can be comma-separated)', list)

program.parse(process.argv);

var amino = require('amino').init({redis: program.redis});

amino.subscribe('log:stdout', console.log);
amino.subscribe('log:stderr', console.error);