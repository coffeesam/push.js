require('sugar');
var fs = require('fs');
var watchd = require('watch');
var scp = require('scp');

var push = module.exports = {
    config : {},
    timer  : {},
    init: function() {
        var configJSON = fs.readFileSync(APP_ROOT + "/config/settings.json");
        push.config    = JSON.parse(configJSON.toString());
    },
    start: function() {
        push.init();
        push.run();
    },
    run: function() {
        watchd.createMonitor(push.config.path, {interval: push.config.interval}, function(monitor) {
          monitor.on('created', function(f, stat) {
            clearTimeout(push.timer);
            push.timer = setTimeout(push.checkDates, push.config.delay);
          });
          monitor.on('changed', function(f, stat) {
            clearTimeout(push.timer);
            push.timer = setTimeout(push.checkDates, push.config.delay);
          });
          monitor.on('removed', function(f, stat) {
          });
        });
    },
    checkDates: function() {
        fs.readdir(push.config.path, function(err, files) {
            var dates = [];
            files.each(function(file) {
                stat = fs.statSync(push.config.path + file);
                dates.add(Date.create(stat.mtime).format());
            });
            if(dates.unique().count() == 1) {
                push.send();
            }
        });
    },
    send: function() {
        var options = {
          file: push.config.path + "*";
          host: push.config.host,
          path: push.config.destination
        }
        scp.send(options, function (err) {
        });
    }
};
