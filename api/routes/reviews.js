/**
 * Created by bvvis on 1-Aug-16.
 */

var Review   = require('../schemas/reviews');

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