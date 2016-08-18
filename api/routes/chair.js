/**
 * Created by Girish on 5/9/2016.
 */


var Chair   = require('../schemas/chair');

module.exports.getDeadlines = function (req, res){
  Chair.findOne(req.query, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.json(doc);
  });
};
module.exports.putDeadlines = function (req, res){
  var date = new Date().toISOString()
  data = req.body? req.body:date
  Chair.findOneAndUpdate(req.query,data, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
};
