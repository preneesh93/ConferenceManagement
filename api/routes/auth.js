/**
 * Created by prane on 30-05-2016.
 */

var User   = require('../schemas/users');
var jwt    = require("jsonwebtoken");
var config = require('.././config');
var secret = config.secret;
var tokenLifeTime = config.tokenLifeTime;

module.exports.login = function (req, res){
  var conditions = {username:req.query.username};
  var newToken=jwt.sign({email:req.query.email}, secret, {expiresIn: tokenLifeTime});
  var update = { $set: { token : newToken }};
  User.findOneAndUpdate(conditions,update,function (err,result) {
    if(err) { throw err; }
    if(result == null){res.json("username does't exist")}
    else if(result.password === req.query.password){
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