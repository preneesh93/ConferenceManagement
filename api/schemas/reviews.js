/**
 * Created by bvvis on 1-Aug-16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var reviewSchema = new Schema(
    {
        reviewer_id:String,
        submission_id:String,
        review_expertise: String,
        overall_evaluation: String,
        summary: String,
        major_strong_points: String,
        major_weak_points: String,
        detailed_summary: String
    }
);

module.exports = mongoose.model('review',reviewSchema,'reviews');