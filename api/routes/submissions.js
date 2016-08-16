/**
 * Created by Preneesh on 12-06-2016.
 */
var Sub =  require('../schemas/submissions');
var User   = require('../schemas/users');

module.exports.list = function (req, res){
  Sub.find(function (err,result) {res.send(result)})
};

module.exports.postSub = function (req, res) {
  console.log("Getting the Submission");
  var add = new Sub(req.body);
  add.save(function (err,result1) {
    if(err) { throw err; }
    else {
      console.log(result1);
      console.log("submission was successful");
      var conditions = {username: req.query.username};
      var update = {$push: {submission: result1}};
      User.findOneAndUpdate(conditions, update, {new: true}, function (err1, result) {
        if (err1) {
          throw err1;
        }
        else {
          res.json(result);
          console.log(result);
        }
      });
    }
  });
};
  