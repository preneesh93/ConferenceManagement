/**
 * Created by lokeshkumarjr on 07/06/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var submissionSchema = new Schema(
    {
        title: String,
        author_details{
            first_name: String,
            last_name: String,
            email: String,
        },
        abstract: String,
        keywords{
            check1: Boolean,
            check2: Boolean,
            check3: Boolean,
            check4: Boolean,
            check5: Boolean,
        },
        file_upload: Boolean,
        /* submissions : [{id:ObjectId}],
         assigned_submissions: [{id:ObjectId}]*/
    }
);

module.exports = mongoose.model('submission',submissionSchema,'submissions')