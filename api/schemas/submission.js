/**
 * Created by lokeshkumarjr on 07/06/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var submissionSchema = new Schema(
    {
        title: String,
        author: String,
        authors: {
            first_name: String,
            last_name: String,
            email: String
        },
        abstract: String,
        keywords: {
            check1: String,
            check2: String,
            check3: String,
            check4: String,
            check5: String
        },
        file: Object,
        status: String
       
    }
);

module.exports = mongoose.model('submission',submissionSchema,'submissions');
