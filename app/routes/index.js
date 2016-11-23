module.exports = function(app) {
  var userController = require('../controllers/user');
  app.get('/', function(req, res, next) {
    return res.send({hello: 'world'});
  });

  app.get('/setup', function (req, res) {

  });
};