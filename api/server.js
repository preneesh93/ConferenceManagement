/**
 * Created by Girish on 5/9/2016.
 */
// MEAN Stack RESTful API Tutorial - Contact List App
var express    = require('express');
var mongojs    = require('mongojs');
var jwt        = require("jsonwebtoken");

var users      = require('../api/routes/users');
var authors    = require('../api/routes/authors');
var chair      = require('../api/routes/chair');
var config     = require('./config');
var bodyParser = require('body-parser');

var app = express();

var user    = express();
var databaseUrl = "cms";
var collections = ["users", "publications"];
var db = mongojs(databaseUrl, collections);

var secret = config.secret

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.post('/api/auth',function (req,res,next) {
  console.log("authhhhhhhhhhhhhhhhhhhhh")
  console.log(req.body)
  console.log(req.body.username)
  var bearerToken;
  var bearerHeader = req.headers["authorization"];

  db.users.findOne({username:req.body.username},function (err,user) {
    if(err) { throw err; }
    if(user == null){res.json("username does't exist")}
    else if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
      console.log(bearerToken)
      jwt.verify(bearerToken,secret, function(err, decoded) {
        console.log(decoded.email)
        if(err){
          res.json(403,{msg:err.message});
        }
        else if (user.token == bearerToken && decoded.email== user.email){
          res.json({token:user.token,isAuthenticated:true})
        }
      });
    }
  });

})
//server routes
app.use('/api/user',users);
app.use('/api/author',authors);
app.use('/api/chair',chair);


app.use(express.static('../app'));
var path = require('path');




app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
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
