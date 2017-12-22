// Express Server 

var express = require('express');
var path = require('path');
var app = express();


// Define the port to run on
app.set('port', 8000);

// Define the public static folder
// Note do not specify '/public' or it will mess up directory structure 
app.use(express.static(path.join(__dirname + '/docs')));

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


// error handlers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
    console.log('Express server started on port ' + port);
});

module.exports = app;