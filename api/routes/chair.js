//users

var express = require('express');
var chair = express.Router();
var mongojs = require('mongojs');
var db = mongojs('testdb',['testdb']);


chair.get('/getuser',function (req,res) {
  console.log("i recived a get req");
  db.testdb.find(function (err,docs) {
    console.log(docs);
    res.json(docs);
  })
});


module.exports = chair;