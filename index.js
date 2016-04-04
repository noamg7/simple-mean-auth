// dependencies
var express = require('express');
    logger = require('morgan')('dev'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy;

// mongoose
mongoose.connect('mongodb://admin:admin@ds015750.mlab.com:15750/mean-auth');
//mongoose.connect('mongodb://localhost/mean-auth');

// user schema/model
var User = require('./server/models/user.model.js');

// create instance of express
var server = express();

// require routes
var routes = require('./server/routes/auth.routes.js');

server.set('port', process.env.PORT || 3000);
// define middleware
server.use(logger);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(express.static(path.join(__dirname, 'public')));

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
server.use('/user/', routes);

server.get('/', function(req, res) {
  res.sendFile('public/html/index.html', {root: __dirname});
});

// error hndlers
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

server.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

server.listen(server.get('port'), function() {
  console.log('Express server listening on port ' + server.get('port'));
});
