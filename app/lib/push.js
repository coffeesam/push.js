var fs = require('fs');
var watchd = require('watch');

var push = module.exports = {
    config : {},
    changed: {},
    timer  : {},
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
        watchd.createMonitor(push.config.path, function(monitor) {
          monitor.on('created', function(f, stat) {
            push.changed[f] = true;
            clearTimeout(push.timer);
            push.timer = setTimeout(push.send, 30000);
          });
          monitor.on('changed', function(f, stat) {
            push.changed[f] = true;
            clearTimeout(push.timer);
            push.timer = setTimeout(push.send, 30000);
          });
          monitor.on('removed', function(f, stat) {
            push.changed[f] = false;
          });
        });
    },
    send: function() {

    }
};
