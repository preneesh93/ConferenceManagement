/**
 * Created by Preneesh on 07/06/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String
},{ _id : false });

var submissionSchema = new Schema(
  {
    title: String,
    author_id: String,
    reviewer:String,
    authors: [subSchema],
    abstract: String,
    keywords: [
      String
    ],
    path: String,
    status: String
  }
);

module.exports = mongoose.model('submission',submissionSchema,'submissions');