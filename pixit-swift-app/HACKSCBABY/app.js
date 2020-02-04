const express = require('express');
const db = require('./db.js');
const mongo = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
module.exports.app = app;

app.use('/files', express.static(__dirname + '/files/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false }));
console.log('ahhhhhhh');
require('./passport.js');
require('./routes.js');

db.init(err => {
    if (err) {
        console.log('fatal database error' + err);
        return;
    }
    app.listen(8080, () => {
        console.log('Running');
    });
});
