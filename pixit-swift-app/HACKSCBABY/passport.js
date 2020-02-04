const db = require('./db.js');
console.log('read');
const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
passport.use(
    new localStrategy(
        {
            email: 'email',
            password: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            console.log('Hi');
            db.users.find({ email: email }).toArray((err, userObjArr) => {
                if (err) {
                    console.log(
                        'data base error when logging in passport js line 10'
                    );
                    done(err, false);
                    return;
                } else if (userObjArr.length == 0) {
                    console.log('no user with that username');
                    done(null, false);
                    return;
                } else {
                    if (userObjArr.length > 1) {
                        console.log(
                            'error user with more than one database entry loggin in anyway'
                        );
                    }
                    bcrypt.compare(password, userObjArr[0].password, function(
                        err,
                        res
                    ) {
                        if (res) {
                            console.log('done');
                            return done(null, userObjArr[0]);
                        } else {
                            console.log('incorrect password');
                            return done(null, false);
                        }
                    });
                }
            });
        }
    )
);

//add secret key and time out setting                        //right here add method to check if mobile

passport.initialize();
module.exports.passport = passport;
