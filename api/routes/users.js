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
      user.token=jwt.sign({username:req.body.username}, secret, {expiresIn: tokenLifeTime});
      user.save(function (err,result) { // save user into database
        if(err) { throw err; }
        res.send(result)
      });
    }
  });
};

var refreshToken = function (email) {

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
      console.log(bearerToken)
      jwt.verify(bearerToken,secret, function(err, decoded) {
        console.log(decoded)
        console.log(user.username)
        if(err){ res.json(403,{msg:"invalid token"}); }
        else if (decoded.username== user.username){
          res.json({token:bearerToken,isAuthenticated:true})
        }
      });
    }
  });
};