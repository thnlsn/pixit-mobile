const app = require('./app.js').app;
const users = require('./user.js');
const bcrypt = require('bcryptjs');
let db = require('./db.js');
app.get('/login', (req, res) => {
    res.sendFile('./login.html');
});
app.get('/signup', (req, res) => {
    res.sendFile('./signup.html');
});

app.get('/', (req, res) => {
    res.redirect('/welcome');
});

app.get('/welcome', (req, res) => {
    res.sendFile('./welcome.html');
});

app.get('/home', (req, res) => {
    res.sendFile('./home.html');
});

app.post('/signup', (req, res) => {
    users.createUser(req.body, (err, userobj) => {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ error: err }));
            return;
        } else {
            console.log(
                'account successfully created: ' + JSON.stringify(userobj)
            );
            res.end(JSON.stringify({ login: true }));
        }
    });
});

app.post('/login', (req, res) => {
    console.log('Hi');
    db.users.find({ email: req.body.email }).toArray((err, userObjArr) => {
        if (err) {
            console.log('data base error when logging in passport js line 10');
            res.end(JSON.stringify({ error: 'database error' }));
            return;
        } else if (userObjArr.length == 0) {
            console.log('no user with that username');
            res.end(JSON.stringify({ error: 'no user with that username' }));
            return;
        } else {
            if (userObjArr.length > 1) {
                console.log(
                    'error user with more than one database entry loggin in anyway'
                );
            }
            bcrypt.compare(req.body.password, userObjArr[0].password, function(
                err,
                sum
            ) {
                if (sum) {
                    console.log('done');
                    userObjArr[0].login = true;
                    res.end(JSON.stringify(userObjArr[0]));
                } else {
                    console.log('incorrect password');
                    res.end(JSON.stringify({ error: 'incorrect password' }));
                }
            });
        }
    });
});

app.get('/api', (req, res) => {
    db.users
        .find()
        .sort({ pixPoints: -1 })
        .toArray((err, user) => {
            if (err) {
                res.end(err);
            } else if (user[0]) {
                res.end(JSON.stringify(user[0]));
            } else {
                res.end(JSON.stringify(user));
            }
        });
});

app.get('/api_location', (req, res) => {
    db.locations.find().toArray((err, locations) => {
        if (err) {
            res.end(JSON.stringify({ error: 'database error' }));
        } else {
            res.end(JSON.stringify(locations));
        }
    });
});
app.post('/coords', (req, res) => {
    db.users.find({ email: req.body.email }).toArray((err, user) => {
        db.locations.insertOne(
            { long: req.body.long, latt: req.body.latt },
            { safe: true },
            (err, sum) => {
                var cleantimer = user[0].lastTimedCleaned;
                var actual_integral_time =
                    (Date.now - user[0].lastTimedCleaned) / 86400000;
                if (actual_integral_time >= 1 || user[0].daysCleaned == 0) {
                    actual_integral_time = 1;
                    cleantimer = Date.now;
                } else {
                    actual_integral_time = 0;
                }

                var days =
                    (Date.now - user[0].daysActive * 86400000) / 86400000;
                if (user[0].daysActive == 0) {
                    days = 1;
                }

                let pix =
                    Math.floor(Math.random() * Math.floor(10) + 1) *
                    req.body.lbs;

                db.users.updateOne(
                    { email: req.body.email },
                    {
                        $set: {
                            lbs: Number(req.body.lbs) + Number(user[0].lbs),
                            pixPoints: pix + Number(user[0].pixPoints),
                            placesCleaned: Number(user[0].placesCleaned) + 1
                        }
                    },
                    (err, sum) => {
                        db.users
                            .find({ email: req.body.email })
                            .toArray((err, user) => {
                                res.end(JSON.stringify(user[0]));
                            });
                    }
                );
            }
        );
    });
});
