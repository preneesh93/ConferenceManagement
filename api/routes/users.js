/**
 * Created by Girish on 5/9/2016.
 */

var mongojs = require('mongojs');
var express = require('express');
var user    = express();

var databaseUrl = "cms";
var collections = ["users", "publications"];
var db = mongojs(databaseUrl, collections);

user.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
user.get('/list',function (req,res) {
    console.log("i recived a get req");
    db.users.find(function (err,docs) {
    console.log(docs);
    res.json(docs);
    })
});
user.get('/login',function (req,res) {
    console.log("i recived a login get req");
    console.log(req.query);
    db.users.findOne({username:req.query.username},function (err,result) {
      if(err) { throw err; }
      if(result == null){res.send("username does't exist")}
      else if(result.password === req.query.password){
        res.send({id:result._id,isAuthenticated:true})
      }
      else {
        res.send("idiot wrong password")
      }
    });
});

user.post('/register',function (req,res) {
    console.log("i recived a post req");
    console.log(req.body);
    db.users.insert(req.body, function(err, result) {
      if(err) { throw err; }
      console.log(result)
      res.send(result)
    });
});




module.exports = user;