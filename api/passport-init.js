/**
 * Created by Preneesh on 14-05-2016.
 */
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

//temp store
var users = {};

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {

        return done(null, users[username]);

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            //checking user
            if(!users[username]){
                return done('Invalid Username!', false);
            }

            //checking password
            if(!isValidPassword(users[username], password)){
                return done('Incorrect Password!', false);
            }

            //success
            console.log('Logged in successfully!', false);

            return done(null, users[username]);
        }
    ));

    passport.use('register', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            //checking user
            if(users[username]){
                return done('Username exists!', false);
            }

            //adding user
            users[username] = {
                username: username,
                password: createHash(password)
            }

            return done(null, users[username]);


        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
}