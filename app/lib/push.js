var fs = require('fs');
var watchd = require('watch');

var push = module.exports = {
    config: {},
    init: function() {
        var configJSON = fs.readFileSync(APP_ROOT + "/config/settings.json");
        var config     = JSON.parse(configJSON.toString());
        push.config    = config;
    },
    start: function() {
        push.init();
        push.run();
    },
    run: function() {
        watchd.createMonitor
    }
};