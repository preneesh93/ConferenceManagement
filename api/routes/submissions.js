/**
 * Created by Preneesh on 12-06-2016.
 */
var multer     = require('multer');
var path       = require('path');
var fs         = require('fs');
var mkdir      = require('mkdirp');
var Sub =  require('../schemas/submissions');
var User   = require('../schemas/users');


//Multer Disk Storage Settings


//Upload Files API


module.exports.list = function (req, res){
  Sub.find(function (err,result) {res.send(result)})
};

module.exports.getSub = function (req, res) {
  console.log("getting sub details")
  var conditions = {id: req.params.id};
  Sub.findOne(conditions, function (err,result) {
    if(err){throw err}
    res.json(result)
  });
};

module.exports.uploadSub = function (req, res){
  console.log('inside file upload');
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var dir = './uploads/'+req.query.username+'/';
       if (!fs.existsSync(dir)){
         fs.mkdirSync(dir);
       }
      console.log(dir);
      cb(null, dir);
  
      var conditions = {_id: req.query.submission};
      var fileName = file.fieldname + file.originalname;
      var url = './api'+dir.toString().slice(1)+fileName.toString();
      console.log(url);
      var update = {$set: {path: url}};
      Sub.findOneAndUpdate(conditions, update, function (err1, result) {
        if (err1) {
          throw err1;
        }
        else {
          console.log('url updated..');
          console.log(result);
        }
      });
    },
    filename: function (req, file, cb) {
      //var datetimestamp = Date.now();
      var fileName = file.fieldname +  file.originalname;
      cb(null, fileName)
    }
  });
  var upload = multer({
    storage: storage
  }).single('file');
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1,err_desc:err});
      return;
    }
    //var path = './uploads/' + fileName
    res.json({error_code:0,err_desc:null});
  })
};

module.exports.postSub = function (req, res) {
  console.log("Received sub post req..");
  var add = new Sub(req.body);
  add.save(function (err,result1) {
    if(err) { throw err; }
    else {
      console.log(result1);
      res.send(result1);
      //var subid = result1.toString();
      console.log("submission was successful");
      var conditions = {username: req.query.username};
      var update = {$push: {submission: result1}};
      User.findOneAndUpdate(conditions, update, {new: true}, function (err1, result) {
        if (err1) {
          throw err1;
        }
        else {
          console.log(result);
        }
      });
    }
  });
};
