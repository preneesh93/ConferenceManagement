/**
 * Created by Girish on 5/9/2016.
 */
// MEAN Stack RESTful API Tutorial - Contact List App
var express    = require('express');
var mongoose   = require('mongoose');
var multer     = require('multer');
var fs         = require('fs');
var auth       = require('../api/routes/auth');
var users      = require('../api/routes/users');
var submissions = require('../api/routes/submissions');
var chair      = require('../api/routes/chair');
var reviews = require('../api/routes/reviews');
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
app.use('/api/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});


// connect to db
mongoose.connect('mongodb://localhost/cms');
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function(){console.log("Mongoose is Connected!")});

//protecting api routes
//app.all("/api/*", requireLogin);

function requireLogin(req, res, next) {
  console.log("inside auth middleware");
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
app.get('/api/user/sub-list', submissions.list);
app.get('/api/user/submissions', submissions.getSub);
app.get('/api/user/list-sub', submissions.getSublist);
app.post('/api/user/submissions', submissions.postSub);
app.post('/api/user/update-sub', submissions.updateSub);
app.post('/api/user/uploads', submissions.uploadSub);

// authentication
app.get('/user/login', auth.login);
app.post('/user/register', auth.register);
app.post('/api/auth',auth.authenticate);

//User Details
app.get('/api/user/list', users.list);
app.get('/api/reviewers/list', users.reviewersList);
app.get('/api/user/user-details', users.getDetails);
app.post('/api/user/user-details', users.postDetails);
app.post('/api/user/:username/roles', users.updateRoles);
app.post('/api/user/privacy', users.changePass);

//chair
app.get('/api/chair/deadlines',chair.getDeadlines)
app.put('/api/chair/deadlines',chair.putDeadlines)
app.post('/api/chair/assign',chair.assignPapers)
//Reviews
app.post('/review/submit', reviews.postDetails);

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
