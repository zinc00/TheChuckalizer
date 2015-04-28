//Load config files as globals
var fs = require('fs');
var _ = require('underscore');

global.config = {};
var configFiles = fs.readdirSync(__dirname + '/config/');
configFiles.forEach(function(file) {
    var config = fs.readFileSync(__dirname + '/config/' + file);
    try {
        config = JSON.parse(config);
    } catch (e) {
        throw 'Config file ' + file + '.config is not a legit JSON';
    }
    var configName = file.replace('.json', '');
    if (!global.config[configName]) global.config[configName] = {};
    _.extend(global.config[configName], config);
});