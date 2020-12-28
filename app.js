var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const session = require('cookie-session');
const flash = require('connect-flash');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var sampleRouter = require('./routes/sample/sample');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({keys: ['secretkey1', 'secretkey2']}));
app.use(flash());

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/auth',loginRouter);
app.use('/sample',sampleRouter);

// 몽고DB 설정 파트
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true ,useUnifiedTopology: true})
    .then(() => console.log("몽고 DB가 연결되었습니다."))
    .catch(err => console.log(err));

mongoose.set('useCreateIndex', true);


const Account = require('./models/User');

passport.use(Account.createStrategy()); 
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
