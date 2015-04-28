var calls = require('./../extCalls.js').httpCall
var path = 'http://api.icndb.com/jokes/random?';

exports.quote = function(params, cb){
    var query = 'firstName='+(params.firstName || 'Chuck') +'&lastName='+(params.lastName || 'Norris');


};
