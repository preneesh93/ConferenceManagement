/**
 * Created by Girish on 5/9/2016.
 */

var mongojs = require('mongojs');
var express = require('express');
var user    = express.Router();
var db = mongojs('testdb', ['testdb']);

user.get('/getuser',function (req,res) {
  console.log("i recived a get req");
  db.testdb.find(function (err,docs) {
    console.log(docs);
    res.json(docs);
  })
});

module.exports = user;