let db = require('./db.js');
let bcrypt = require('bcrypt');

function check(obj) {
    console.log(obj);
    var s = obj.name.search(/\W/);
    var plen = obj.password.length;
    var pdig = obj.password.search(/\d/);
    var ziplen = (obj.zip + '').length;
    var zipdig = (obj.zip + '').search(/\D/);
    console.log('zip ' + ziplen);

    if (s != -1) {
        return 'name cannot contain special characters';
    } else if (plen < 6 || pdig == -1) {
        return 'password must be atleast 6 characters and contain one number';
    } else if (ziplen != 5 || zipdig != -1) {
        return 'didnt enter a proper zip code';
    } else {
        return false;
    }
}

exports.createUser = function(userobj, callback) {
    console.log('input checkity check');
    console.log(userobj);
    var varify_input = check(userobj);
    if (varify_input) {
        console.log('bad input');
        console.log(varify_input);
        callback(varify_input, null);
    } else {
        console.log('input looks good');
        db.users.find({ email: userobj.email }).toArray((err, user) => {
            console.log('database done');
            if (err) {
                console.log('nani');
                callback(err, null);
                return;
            } else if (user[0]) {
                callback(
                    'the data you entered matches the data of another account',
                    null
                );
            } else {
                console.log('no users detected');
                userobj.lbs = 0;
                userobj.placesCleaned;
                userobj.pixPoints = 0;
                db.users.insertOne(userobj, { safe: true }, (err, sum) => {
                    if (err) {
                        callback(err);
                        return;
                    } else {
                        bcrypt.hash(userobj.password, 10, (err, hash) => {
                            db.users.updateOne(
                                userobj,
                                {
                                    $set: {
                                        password: hash
                                    }
                                },
                                (err, succ) => {
                                    if (err) {
                                        //database err
                                        callback(err, null);
                                        return;
                                    } else {
                                        callback(null, {
                                            username: userobj.username,
                                            password: hash
                                        });
                                    }
                                }
                            );
                        });
                    }
                });
            }
        });
    }
};
