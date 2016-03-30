var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.model.js');


router.post('/register', function(req, res) {
  //registration route for signing up users
  User.register(new User({username: req.body.username}),
    req.body.password, function(err, account){
      if(err){
        return res.status(500).json({
          err: err
        });
      }
      passport.authenticate('local')(req, res, function(){
        return res.status(200).json({
          status: 'Registration successful!'
        });
      });
    });
});

router.post('/login', function(req, res, next) {
  //login route for logging in existing users
  // What do you notice about this function?
});

router.get('/logout', function(req, res) {
  //Logout route
});

router.get('/status', function(req, res) {
  //Why do we need a status route?
});


module.exports = router;
