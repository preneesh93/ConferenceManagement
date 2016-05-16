/**
 * Created by Girish on 5/9/2016.
 */

var express    = require('express');
var path       = require('path');
var mongojs    = require('mongojs');
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var users      = require('../api/routes/users');
var authors    = require('../api/routes/authors');
var chair      = require('../api/routes/chair');
var authenticate = require('../api/routes/authenticate')(passport);

var app = express();
var db = mongojs('testdb',['testdb']);

app.use(session({
  secret: 'secret yankee'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'D:/CMS_Yankee/CMS/app')));
app.use(passport.initialize());
app.use(passport.session());

//server routes
app.use('/api/user',users);
app.use('/api/author',authors);
app.use('/api/chair',chair);
app.use('/api/auth',authenticate);

/*app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendfile(path.resolve('D:/CMS_Yankee/CMS/app/index.html'));
});
*/

//Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

app.listen(3000);
console.log("Server running on port 3000");


module.exports = app;


/* --- to start mongodb from nodejs server ---
 var child_process = require('child_process');
 child_process.exec('start mongod', function (err, stdout, stderr) {
 if (err) {
 console.log(err);
 return;
 }
 });*/
