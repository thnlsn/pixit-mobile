const mongo = require('mongodb').MongoClient;
const async = require('async');
var db = null;

exports.init = function(callback) {
    async.waterfall(
        [
            cb => {
                mongo.connect(
                    'mongodb+srv://thnlsn:JoeKerr@pixit-xoihg.gcp.mongodb.net/test?retryWrites=true&w=majority',
                    { w: 1, poolSize: 20, useUnifiedTopology: true },
                    (err, database) => {
                        db = database.db('database');
                        cb(null);
                    }
                );
            },
            cb => {
                db.collection('users', (err, user_coll) => {
                    exports.users = user_coll;
                    cb(null);
                });
            },
            cb => {
                db.collection('locations', (err, locations) => {
                    exports.locations = locations;
                    cb(null);
                });
            }
        ],
        callback
    );
};
exports.users = null;
