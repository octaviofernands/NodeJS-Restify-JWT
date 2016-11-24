var restify   = require('restify');
var mongoose  = require('mongoose');
var config    = require('./app/config/main');
var jwt       = require('jsonwebtoken');
var passport = require('passport');
var morgan      = require('morgan');

require('./app/config/passport')(passport);

var app = restify.createServer({
  name: 'example'
});

app
  //.use(restify.fullResponse())
  .use(restify.queryParser())
  .use(restify.bodyParser());

app.use(morgan('dev'));
app.use(passport.initialize());

mongoose.connect(config.db);

var routes = require('./app/routes/index')(app);

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('UHUL! 8080');
});