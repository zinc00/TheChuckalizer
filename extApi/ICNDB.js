var call = require('./../extCalls.js').httpCall;
var apiHost = 'api.icndb.com';
var path = '/jokes/random?';

exports.quote = function(params, cb){
    var query = {
        firstName: (params.firstName || 'Chuck'),
        lastName: (params.lastName || 'Norris')
    };
    call(apiHost, null, path, query, function(err, result){
        if (err) return cb(err);
        try {
            result = JSON.parse(result);
        } catch(e) {
            return cb('Error parsing response from '+apiHost+', response was: '+result);
        }
        if (!result.value) return cb('No response or response is empty, from '+apiHost+', response was: '+result);
        return cb(null, result.value.joke.replace(/&quot;/g, '"'));
    });
};
