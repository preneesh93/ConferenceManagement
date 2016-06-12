/**
 * Created by Preneesh on 07/06/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var submissionSchema = new Schema(
  {
    title: String,
    author_id: ObjectId,
    authors: [{
      first_name: String,
      last_name: String,
      email: String
    }],
    abstract: String,
    keywords: [
      String
    ],
    path: String,
    status: String
  }
);

module.exports = mongoose.model('submission',submissionSchema,'submissions');