const passport = require('passport');
const Account = require('../models/User');
const router = require('express').Router();

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.post('/register', function(req, res, next) {
  console.log('registering user'); 
  Account.register(new Account({email: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login', {user: req.user, message: req.flash('error')});
});

router.get('/register',function(req,res){
  res.render('auth/register');
});

router.post('/login', passport.authenticate('local', { successRedirect:'/',failureRedirect: '/auth/login', failureFlash: true }));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;