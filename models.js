var icndb = require('./extApi/ICNDB.js');

exports.cnQuote = function(params, callback){
    icndb.quote(params, callback)
};