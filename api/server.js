/**
 * Created by Girish on 5/9/2016.
 */
// MEAN Stack RESTful API Tutorial - Contact List App
var express    = require('express');
var mongoose   = require('mongoose');
var nodemailer = require('nodemailer');
var async      = require('async');
var crypto     = require('crypto');
var users      = require('../api/routes/users');
var auth       = require('../api/routes/auth');
var recovery   = require('../api/routes/recovery');
var authors    = require('../api/routes/authors');
var chair      = require('../api/routes/chair');
var config     = require('./config');
var bodyParser = require('body-parser');
var path       = require('path');
var app = express();
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
db.once('open', function(){console.log("yuppieee mongoose is working")});

// authentication
app.get('/api/user/login', auth.login);
app.post('/api/user/register', auth.register);
app.post('/api/auth',auth.authenticate);

//user details
app.get('/api/user/list', users.list);
app.get('/api/user/user-details', users.getDetails);
app.post('/api/user/user-details', users.postDetails);
app.post('/api/user/privacy', users.changePass);

//password recovery
app.post('/api/user/recovery', recovery.recovery);
app.get('/api/reset/:token', recovery.reset);


// sending index file to handle angular routes
app.all('/*', function(req, res, next) {
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
