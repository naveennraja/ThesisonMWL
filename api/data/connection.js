console.log("---------Connected to Mongo--------------------");
var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/thesisDatabase';
var _connection = null;

var open = function() {
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            console.log("DB connection failed");
            return;
        } else {
            console.log('Connection established to ', dburl);
        }
        _connection = db;
        console.log("DB connection open");
    });
};

var get = function() {
    return _connection;
};

module.exports = {
    open : open,
    get : get
};