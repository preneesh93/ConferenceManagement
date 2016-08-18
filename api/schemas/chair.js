/**
 * Created by Girish on 8/17/2016.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chairSchema = new Schema(
  {
    conference:String,
    submission_deadline: Date,
    review_deadline: Date,
    current: Date
  }
);

module.exports = mongoose.model('chair',chairSchema,'chair');