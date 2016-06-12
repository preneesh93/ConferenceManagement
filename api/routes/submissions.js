/**
 * Created by Preneesh on 12-06-2016.
 */
var Sub =  require('../schemas/submissions');

module.exports.listSub = function (req,res) {
  Sub.find(function (err,result) {
    res.send(result);
  })
};

module.exports.postSub = function (req,res) {
  
}
