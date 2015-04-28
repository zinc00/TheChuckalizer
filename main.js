var express = require('express');
var _ = require('underscore');
var models = require('./models.js');
var http = require('http');
var fs = require('fs');

//Load config files as globals
global.config = {};
var configFiles = fs.readdirSync(__dirname + '/config/');
configFiles.forEach(function(file) {
    var config = fs.readFileSync(__dirname + '/config/' + file);
    try {
        config = JSON.parse(config);
    } catch (e) {
        throw 'Config file ' + file + '.config is not a legit JSON';
    }
    var configName = file.replace('.config', '');
    if (!global.config[configName]) global.config[configName] = {};
    _.extend(global.config[configName], config);
});

// Create and define express server
var app = express();
app.set('port', global.config.server.port || 8080);

// Create server and listen on port
http.createServer(app)
    .listen(app.get('port'), function(){
        console.log('TheChuckalizer server is listening on port ' + app.get('port'));
    });

// Define routes
app.get('/:model', function(req, res){
    if (!models[req.params.model]) exports.handleResponse(req, res, {message: 'Incorrect API module '+req.params.module, error: 'CallException', code: 401});
    else
        models[req.params.model](req.params, function(err, data){

        });
});


// Handle responses
exports.handleResponse = function(req, res, err, data) {
    var result = {};
    if (err) {
        if (!err.code) err = {message: err, code: 'GeneralError'};
        result.error = err;
        result.status = 'failed';
    }
    else result.status = 'success';
    res.status(200);
    if (data) result.data = data;
    res.jsonp(result);
};