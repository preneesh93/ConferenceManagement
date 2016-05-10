/**
 * Created by Girish on 5/9/2016.
 */
// MEAN Stack RESTful API Tutorial - Contact List App
var express    = require('express');
var mongojs    = require('mongojs');

var users      = require('../api/routes/users');
var authors    = require('../api/routes/authors');
var chair      = require('../api/routes/chair');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('testdb',['testdb']);


//server routes
app.use('/api/user',users);
app.use('/api/author',authors);
app.use('/api/chair',chair);


app.use(express.static('../app'));
app.use(bodyParser.json());

app.listen(3000);
console.log("Server running on port 3000");


/* --- to start mongodb from nodejs server ---
 var child_process = require('child_process');
 child_process.exec('start mongod', function (err, stdout, stderr) {
 if (err) {
 console.log(err);
 return;
 }
 });*/
