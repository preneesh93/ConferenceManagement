/**
 * Created by bvvis on 1-Aug-16.
 */

var Review   = require('../schemas/reviews');

var Sub =  require('../schemas/submissions');

module.exports.postDetails = function (req, res) {
    console.log("Received a post req...");
    var review = new Review(req.body);
    review.save(req.body, function (err,result) {
        if (err) {
            throw err
        }
        else {
            res.json(result)
        }
    }
)};
module.exports.getDetails = function (req, res) {
    console.log("Received a get req...");
    console.log(req.query);
    var conditions = {submission_id: req.query.submissionId};
    Review.findOne(conditions, function (err,result) {
        if(err){throw err}
        res.json(result);
    });
};
