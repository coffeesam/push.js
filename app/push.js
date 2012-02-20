APP_ROOT = process.cwd();

var startStopDaemon = require('start-stop-daemon');
startStopDaemon(function() {
    require('./lib/push').start();
});
