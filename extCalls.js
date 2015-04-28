var http = require('http');

exports.httpCall = function(host, port, path, params, cb){
    var query = "";
    for (var p in params)
        query += encodeURIComponent(p)+"="+encodeURIComponent(params[p])+"&";

    // Path may already contain query, therefore we add params as added parameters
    var addedChar = (path.indexOf('?')<0)? '?' : '&';
    if (query.length)
        path += addedChar+query;

    var options = {
        host: host,
        port: port || 80,
        path: path,
        headers: params.headers
    };

    var handleError = function(err){
        cb('Error on extCalls.httpCall: '+err);
    };

    http.request(options, function(res){
        var str = '';

        //another chunk of data has been received, so append it to `str`
        res.on('data', function (chunk) {
            if (chunk) str += chunk;
        });

        //the whole response has been received, so we just print it out here
        res.on('end', function (chunk) {
            if (chunk) str += chunk;
            cb(null, str);
        });
    }).on('error', handleError).end();

};
