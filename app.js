var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var contactus = require('./routes/contactus');
var users = require('./routes/users');
var documentation = require('./routes/documentation');
var visualization = require('./routes/visualization');
var turtleEditorLink = require('./routes/turtleEditor');
//var config = require('./routes/config');
var fs = require('fs');
var  jsonfile  =  require('jsonfile');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routing to the available routes on the app
app.use('/', routes);
app.use('/contactus', contactus);
app.use('/users', users);
app.use('/documentation', documentation);
app.use('/visualization', visualization);
app.use('/webvowlLink', express.static("views/webvowl"));
app.use('/turtleEditorLink', express.static("views/turtleEditor"));
app.use('/turtleEditor', turtleEditorLink);

app.get('/config', function(req, res) {
  res.render('config.ejs', {
    title: 'Configuration App'
  });
});

app.get('/querying', function(req, res) {
  res.render('querying.ejs', {
    title: 'Make a query'
  });
});

// http post when  a user configurations is submitted
app.post('/config', function(req, res) {
  var filepath = 'jsonDataFiles/userConfigurations.json';
  // Read the userConfigurations file if exsit to append new data
  jsonfile.readFile(filepath, function(err, obj)  {
    if (err)
      console.log(err);  
    jsonfile.writeFile(filepath, req.body, {
      spaces:  2,
       EOL:   '\r\n'
    },  function(err)  {  
      if (err)
        throw err;

    })
  });
  res.render('userConfigurationsUpdated', {
    title: 'System is making ready'
  });
});


// check if the userConfigurations file is exist
// for the first time of app running
var path = "jsonDataFiles/userConfigurations.json";
fs.exists(path, function(exists) {
  if (exists) {
    jsonfile.readFile(path, function(err, obj)  {
      console.log(obj);
      var menu = Array(7).fill('false');
      Object.keys(obj).forEach(function(k) {
        console.log(k + "" + obj[k]);
        if (k === "vocabularyName") {
          // store projectTitle to be used by header.ejs
          app.locals.projectTitle = obj[k];
        } else if (k === "turtleEditor") { //menu[0]
          menu[0] = 'ture';
          // do more stuff
        } else if (k === "documentationGeneration") { //menu[1]
          menu[1] = 'ture';
        } else if (k === "visualization") { //menu[2]
          menu[2] = 'ture';
        } else if (k === "sparqlEndPoint") { //menu[3]
          menu[3] = 'ture';
        } else if (k === "evolutionReport") { //menu[4]
          menu[4] = 'ture';
        } else if (k === "predefinedQueries") { //menu[5]
          menu[5] = 'ture';
        } else if (k === "syntaxValidation") { //menu[6]
          menu[6] = 'ture';
        }
      });
      // store menu to be used by header.ejs
      app.locals.userConfigurations = menu;
      console.log(menu);
    })
  }
});

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

//  catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req.url);
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
      error: err,
      title: 'error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});


module.exports = app;
