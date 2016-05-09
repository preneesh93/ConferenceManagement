/**
 * Created by Girish on 5/9/2016.
 */

var express = require('express');
var author = express.Router();
var mongojs = require('mongojs');
var db = mongojs('testdb',['testdb']);


author.get('/getuser',function (req,res) {
  console.log("i recived a get req");
  db.testdb.find(function (err,docs) {
    console.log(docs);
    res.json(docs);
  })
});


module.exports = author;