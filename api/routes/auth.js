/**
 * Created by Girish on 08-06-2016.
 */
var User   = require('../schemas/users');
var jwt    = require("jsonwebtoken");
var config = require('.././config');
var secret = config.secret;
var tokenLifeTime = config.tokenLifeTime;

module.exports.login = function (req, res){
  var conditions = {username:req.query.username};
  var newToken=jwt.sign({username:req.query.username}, secret, {expiresIn: tokenLifeTime});
  var update = { $set: { token : newToken }};
  User.findOneAndUpdate(conditions,update,function (err,result) {
    if(err) { throw err; }
    if(result == null){res.json("username does't exist")}
    else if(result.password === req.query.password){
      console.log(result)
      res.json({id:result._id,isAuthenticated:true,token:newToken})
    }
    else {  res.json("idiot wrong password")    }
  });
};

module.exports.register = function (req, res){
  User.find({username:req.body.username},function (err,result) {
    if(err) { throw err; }
    if(result.length>0){
      res.json(409,"user already exists")
    }
    else {
      var user = new User(req.body);
      user.token=jwt.sign({email:req.body.email}, secret, {expiresIn: tokenLifeTime});
      user.save(function (err,result) { // save user into database
        if(err) { throw err; }
        res.send(result)
      });
    }
  });
};

module.exports.authenticate = function (req,res) {
  console.log("authhhhhhhhhhhhhhhhhhhhh");
  var bearerHeader = req.headers["authorization"];
  User.findOne({username: req.body.username}, function (err, user) {
    if (err) {
      throw err;
    }
    if (user == null) {
      res.json("username does't exist")
    }
    else if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(" ");
      var token = bearer[1];
      jwt.verify(token, secret, function (err, decoded) {
        console.log(decoded)
        console.log(req.body.username)
        if (err) {
          res.json(403, {msg: "invalid token"});
        }
        else if (decoded.username == req.body.username) {
          res.json({token: token, isAuthenticated: true})
        }
        else {
          res.json(403, {msg: "invalid token"});
        }
      });
    }
  })
};

module.exports.authmiddleware = function (req,res) {
  console.log("inside auth middleware");
  var bearerHeader = req.headers["authorization"];
  var bearer = bearerHeader.split(" ");
  var token = bearer[1];
  if(token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.json(403, {msg: "invalid token"});
      }
      else {
        res.json("authenticated");
      }
    });
  }
  else {
    res.json("no token")
  }
};