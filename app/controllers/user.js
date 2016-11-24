var User = require('../models/User');
var passport = require('passport');

exports.postSignup = function (req, res, cb) {
  var form = req.params;
  var userObj = {
    name: form.name,
    email: form.email,
    password: form.password
  }

  var user = new User(userObj);
  user.password = user.generateHash(user.password);

  console.log(user);

  user.save(function (err) {
    if(err) {
      returnData = {
        ok: false,
        msg: req.__('Error ocurred while saving user.') + ' - ' + err
      }
    } else {
      userObj = {
        name: userObj.name,
        email: userObj.email
      }

      returnData = {
        ok:true,
        data: userObj
      }
    }

    cb(returnData);
  });
}

exports.getUserList = function (cb) {
  User.find(function (err, users) {
    if (err) { console.log(err); }
    cb(users);
  });
};