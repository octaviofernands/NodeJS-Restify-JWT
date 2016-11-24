var User = require('../models/User');
var config = require('./main');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(null, user);
    });

  });

  passport.use('local', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
    },
    function(email, password, done) { // callback with email and password from our form
      User.findOne({ 'email' :  email }, function(err, user) {

        if (err)
          return done(err);

        if (!user)
          return done(null, false, {msg: 'User not found.'});

        if (!user.validPassword(password))
          return done(null, false, {msg: 'Wrong login data.'});

        return done(null, user);
      });
    })
  );
}