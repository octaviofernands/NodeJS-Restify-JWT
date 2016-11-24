var passport = require('passport');
var user = require('../controllers/user');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/main');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    return res.send({hello: 'world'});
  });

  app.get('/setup', function (req, res) {

  });

  app.post('/signup', function (req, res) {
    user.postSignup(req, res, function (response) {
      res.send(response);
    })
  });

  app.post('/login', function(req, res) {
    req.body = req.params; //Passport reads req.body from Express
    passport.authenticate('local', function(err, user, info) {
      if(err) {
        res.send({ok: err});
      }

      if(!user) {
        res.send({ok: false});
      }

      var token = jwt.sign(user, config.secret, {
        expiresIn: '1y' // expires in 1 year
      });

      res.send({
        ok:true,
        user: {
          name: user.name,
          email: user.email
        },
        token: token
      })
    })(req, res);
  });

  app.use(function (req, res, next) {
    //get token from GET, POST or HEADER
    var token = req.params.token || req.headers['x-access-token'];

    if(token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          res.send({ ok: false, msg: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send(403, {
        ok: false,
        msg: 'No token provided.'
      });
    }
  });

  app.get('list', function (req, res) {
    user.getUserList(function (users) {
      res.send(users);
    })
  });


};