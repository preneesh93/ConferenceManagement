/**
 * Created by Girish on 5/9/2016.
 */


var Chair   = require('../schemas/chair');
var Sub =  require('../schemas/submissions');
var User   = require('../schemas/users');

module.exports.getDeadlines = function (req, res){
  Chair.findOne(req.query, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.json(doc);
  });
};
module.exports.putDeadlines = function (req, res){
  data = req.body
  Chair.findOneAndUpdate(req.query,data, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
};

module.exports.assignPapers = function (req,res) {

}