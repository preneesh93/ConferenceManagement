/**
 * Created by bvvis on 1-Aug-16.
 */

var Review   = require('../schemas/reviews');

var Sub =  require('../schemas/submissions');

module.exports.postDetails = function (req, res) { 
    var conditions = {submission_id: req.query.submissionId};
    var options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Review.findOneAndUpdate(conditions, req.body, options, function(err, result) {
        if(err){throw err}
        res.json(result);
    });
};
module.exports.getDetails = function (req, res) { 
    console.log(req.query);
    var conditions = {submission_id: req.query.submissionId};
    Review.findOne(conditions, function (err,result) {
        if(err){throw err}
        res.json(result);
    });
};

module.exports.list = function (req, res){
    Review.find(function (err,result) { if(err){throw err} res.send(result)})
};