/**
 * Created by Girish on 5/9/2016.
 */

var mongojs = require('mongojs');
var express = require('express');
var config     = require('.././config');
var user    = express();
var jwt        = require("jsonwebtoken");
var databaseUrl = "cms";
var collections = ["users", "publications"];
var db = mongojs(databaseUrl, collections);

var secret = config.secret
user.get('/list',function (req,res) {
    console.log("i recived a get req");
    console.log(req.body);
    console.log(req.params);
    db.users.find(function (err,docs) {
    console.log(docs);
    res.json(docs);
    })
});
user.get('/login',function (req,res) {

  console.log("i recived a login get req");
  console.log(req.query);
  var bearerHeader = req.headers["authorization"];
  console.log(bearerHeader)
  db.users.findOne({username:req.query.username},function (err,result) {
    if(err) { throw err; }
    if(result == null){res.json("username does't exist")}
    else if(result.password === req.query.password){
      res.json({id:result._id,isAuthenticated:true,token:result.token})
    }
    else {
      res.json("idiot wrong password")
    }
  });
});

user.post('/register',function (req,res) {
    console.log("i recived a post req");
    user=req.body;
    console.log(user);
    console.log(secret);
    db.users.findOne({email:user.email},function (err,result) {
      if(result){
        res.json(403)
      }
    });

    user.token = jwt.sign({email:user.email}, secret, {expiresIn: "2 days"});
    db.users.insert(user, function(err, result) {
      if(err) { throw err; }
      console.log(result)
      res.json(result)
    });
});




module.exports = user;