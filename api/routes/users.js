/**
 * Created by Preneesh on 5/9/2016.
 */
var User   = require('../schemas/users');

module.exports.list = function (req, res){
  var exclude = {token: 0,password:0}
  User.find({}, exclude,function (err,result) {res.send(result)})
};

module.exports.reviewersList = function (req, res){
  var conditions = {"roles.reviewer": true};
  var exclude = {token: 0,password:0}
  User.find( conditions,exclude,function (err,result) {res.send(result)})
};

module.exports.getDetails = function (req, res) {
  var conditions = {username: req.query.username};
  var exclude = {token: 0,password:0}
  User.findOne(conditions,exclude,function (err,result) {
    if(err){throw err}
    else if(result != null){res.json(result)}
    else { res.json(404,"user not found")}
  });
};

module.exports.postDetails = function (req, res) {
  var conditions = {username: req.body.username};
  var update =  {$set: req.body};
  User.findOneAndUpdate(conditions, update, function(err,result){
    if(err) {throw err;}
    else {
      res.json(result);
    }
  });
};
module.exports.updateRoles = function (req, res) {
  var conditions = {username: req.params.username};
  var update =  {$set: {roles: req.body}};
  User.findOneAndUpdate(conditions, update, function(err,result){
    if(err) {throw err;}
    else {
      res.json("update successful");
    }
  });
};

module.exports.remove = function (req, res) {
  console.log("deleting: "+req.query.id)
  var conditions = {_id: req.query.id};
  User.remove(conditions, function(err,result){
    if(err) {throw err;}
    else {
      res.json(result);
    }
  });
};

module.exports.changePass = function (req, res) {
  var conditions = {password: req.body.pass1};
  User.findOneAndUpdate(conditions, {
    $set: {
      password: req.body.pass3
    }
  }, function(err, result){
    if(err) { throw err; }
    if(result == null){ res.json("Incorrect Password!")}
    else {
      res.json(result);
    }
  })
};
