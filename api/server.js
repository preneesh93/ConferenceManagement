/**
 * Created by Girish on 5/9/2016.
 */
// MEAN Stack RESTful API Tutorial - Contact List App
var express    = require('express');
var mongoose   = require('mongoose');
var users      = require('../api/routes/users');
var submissions = require('../api/routes/submissions');
var authors    = require('../api/routes/authors');
var chair      = require('../api/routes/chair');
var config     = require('./config');
var bodyParser = require('body-parser');
var path       = require('path');
var jwt        = require("jsonwebtoken");

var secret = config.secret;
var app = express();
var apiRoutes = express.Router();
var db = mongoose.connection;
// accept CORS
app.use(express.static('../app'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// connect to db
mongoose.connect('mongodb://localhost/cms');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){console.log("mongoose is connected")});

//protecting api routes
app.all("/api/*", requireLogin);

function requireLogin(req, res, next) {
  console.log("inside authmiddleware");
  var bearerHeader = req.headers["authorization"];
  if (bearerHeader){
    var token  = bearerHeader.split(" ")[1];
    jwt.verify(token, secret, function (err, decoded) {
      if (err) { res.redirect("/login"); }
      else next();
    });
  }
  else { res.redirect("/login");}
}
/*
if (decoded.exp <= Date.now()) {
  res.end('Access token has expired', 400);
}
*/

//submissions
app.get('/user/submissions', submissions.listSub);
app.post('/user/add-submission', submissions.postSub);

// authentication
app.get('/api/user/list', users.list);
app.get('/user/login', users.login);
app.post('/user/register', users.register);
app.post('/api/auth',users.authenticate);

// sending index file to handle angular routes
app.all('/*', function(req, res) {
  res.sendfile(path.resolve('../app/index.html'));
});

app.listen(3000);
console.log("Server running on port 3000");

/* --- to start mongodb from nodejs server ---
 var child_process = require('child_process');
 child_process.exec('start mongod', function (err, stdout, stderr) {
 if (err) {
 console.log(err);
 return;
 }
 });*/
