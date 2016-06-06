/**
 * Created by Girish on 5/9/2016.
 */

var User   = require('../schemas/users');

module.exports.list = function (req, res){
  User.find(function (err,result) {res.send(result)})
};

module.exports.getDetails = function (req, res) {
  console.log("getting user details")
  var conditions = {username: req.query.username};
  User.findOne(conditions,function (err,result) {
    if(err){throw err}
    var userDetail=result;
    delete userDetail.password;
    delete userDetail.token;
    res.json(result)
  });
};

module.exports.postDetails = function (req, res) {
  console.log("Received a post req...");
  var conditions = {username: req.body.username};
  var update =  {$set: req.body};
  User.findOneAndUpdate(conditions, update, function(err,result){
    if(err) {throw err;}
    else {
      res.json(result);
    }
  });
};

module.exports.changePass = function (req, res) {
  console.log("Received Password Change Request..");
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
