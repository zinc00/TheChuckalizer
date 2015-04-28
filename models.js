var icndb = require('./extApi/ICNDB.js');

exports.quote = function(params, callback){
    icndb.quote(params, callback);
};