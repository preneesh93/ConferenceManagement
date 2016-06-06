/**
 * Created by Preneesh on 05-06-2016.
 */
var User   = require('../schemas/users');
var nodemailer = require('nodemailer');
var async      = require('async');
var crypto     = require('crypto');

module.exports.recovery = function(req, res) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          res.json("Incorrect EMail!");
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport('smtps://yankeecms16%40gmail.com:YankeeCMS@smtp.gmail.com');

      var mailOptions = {
        to: user.email,
        from: 'passwordreset@cms.com',
        subject: 'Password Reset for CMS',
        text: 'You are receiving this mail because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.json("Mail sent!");
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
  });
};

module.exports.reset = function (req, res) {
  console.log(req.params.token)
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      res.json('Password Token Invalid or Expired!');
    }
  });
};
