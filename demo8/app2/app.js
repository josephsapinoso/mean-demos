var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
// deleted users variable 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// changing app.use('/', routes); to app.use('/api', routes);
app.use('/api', routes);
// deleted app.use variable for users

//--------------Creating Application Middleware-------------------------------

// This function is designed to respond to EVERY request that is sent to the server by displaying the message:
// "Request received" on the console, thereafter it calls the next function (next();) to pass on the control
// to the next function in sequence. 
app.use (function(req, res, next){
  console.log ('Request received');
  next();
});

// This function is designed to respond to every GET request on the application root. It responds with displaying:
// "Get request received at application root" 
app.get ('/', function (req, res, next){
  res.end ('Get request received at application root');
});

// This function is designed to respond to every POST request on the application root. It responds with displaying:
// "Post request received at application root" 
app.post ('/', function (req, res, next){
  res.end ('Post request reieved at application root');
});

// This function is designed to respond to every GET request to the path that starts with /user. It responds with displaying:
// "Get details of all the users". 
// Of course in a real application we are responding with real data, but in this case we are just responding with a message.
app.get ('/user', function (req, res, next){
  res.end ('Get details of all the users');
});

// This function is designed to respond to every GET request to the path that starts with /user, and that passes the :id parameter.
app.get ('/user/:id', function (req, res, next){
  res.end ('Get details of the user with id:' + req.params.id); 
});



//----------------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
