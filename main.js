require('./globals.js');
var express = require('express');
var models = require('./models.js');
var http = require('http');

// Create and define express server
var app = express();
app.set('port', global.config.server.port || 80);

// Create server and listen on port
http.createServer(app)
    .listen(app.get('port'), function(){
        console.log('TheChuckalizer server is listening on port ' + app.get('port'));
    });

//make app public
app.use(express.static(__dirname+'/app'));

// Define routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/app/index.html');
});

app.get('/:model', function(req, res){
    if (!models[req.params.model]) exports.handleResponse(req, res, {message: 'Incorrect API module: '+req.params.module, error: 'CallException', code: 401});
    else {
        models[req.params.model](req.params, function(err, data){
            exports.handleResponse(req, res, null, data);
        });
    }

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