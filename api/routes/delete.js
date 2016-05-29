/**
 * Created by Girish on 5/9/2016.
 */

var User   = require('../schemas/users');
var jwt    = require("jsonwebtoken");
var config = require('.././config');
var secret = config.secret;
var tokenLifeTime = config.tokenLifeTime;

module.exports.list = function (req, res){
  User.find(function (err,result) {res.send(result)})
};

module.exports.login = function (req, res){
  User.findOne({username:req.query.username},function (err,result) {
    if(err) { throw err; }
    if(result == null){res.json("username does't exist")}
    else if(result.password === req.query.password){
      refreshToken(result.email);
      res.json({id:result._id,isAuthenticated:true,token:result.token})
    }
    else {
      res.json("idiot wrong password")
    }
  });
};

module.exports.register = function (req, res){
  User.find({username:req.body.username},function (err,result) {
    if(err) { throw err; }
    if(result.length>0){
      res.send(409,"user already exists")
    }
    else {
      var user = new User(req.body);
      console.log(createToken(user));
      res.send(result)
    }
  });
};

var createToken = function (user) {
  user.token=getToken(user.email);
  user.save(function (err,result) { // save user into database
    if(err) { throw err; }
    else{res.send(result)}
  });
  return true
};

var getToken = function (email) {
  console.log(" refreshing token")
  console.log(email)
  var token=jwt.sign({email:req.body.email}, secret, {expiresIn: tokenLifeTime});
  return token
};
module.exports.authenticate = function (req,res) {
  console.log("authhhhhhhhhhhhhhhhhhhhh");
  var bearerHeader = req.headers["authorization"];
  User.findOne({username:req.body.username},function (err,user) {
    if(err) { throw err; }
    if(user == null){res.json("username does't exist")}
    else if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(" ");
      var bearerToken = bearer[1];
      verifyToken(bearerToken,user.email)
    }
  });
  var verifyToken=function (token,email,user) {
    jwt.verify(token,secret, function(err, decoded) {
      console.log(decoded)
      console.log(email)
      if(err){ res.json(403,{msg:"invalid token"}); }
      else if (decoded.email== email){
        res.json({token:token,isAuthenticated:true})
      }
    });
  }
};