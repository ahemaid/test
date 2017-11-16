
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
//var visualization = require('./routes/visualization');
//var turtleEditorLink = require('./routes/turtleEditor');
var analyticsLink = require('./routes/analytics');
var evolution = require('./routes/evolution');
var startup = require('./routes/startup');
var validation = require('./routes/validation');
var client =  require('./routes/clientServices');
var listener =  require('./routes/listener');
var fs = require('fs');
var jsonfile  =  require('jsonfile');
var app = express();
var watch = require('node-watch');
var shell = require('shelljs');
var router = express.Router();
var proxy = require('express-http-proxy');

//console.log(path.basename());
//app.base = "/test"

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
app.use('\/\/', routes);
app.use('\/\/contactus', contactus);
app.use('\/\/users', users);
app.use('\/\/documentation', documentation);
//app.use('\/\/visualization', visualization);
app.use('\/\/webvowlLink', express.static(path.join(__dirname,"views/webvowl")));
//app.use('\/\/turtleEditorLink', express.static("views/turtleEditor"));
app.use('\/\/turtleEditorLink', express.static(path.join(__dirname,"views/turtleEditor")));
app.use('./analyticsLink', express.static("views/d3sparql"));
app.use('./analytics', analyticsLink);
//app.use('\/\/turtleEditor', turtleEditorLink);
app.use('\/\/evolution', evolution);
app.use('\/\/startup', startup);
app.use('\/\/validation', validation);
app.use('\/\/client', client);
app.use('\/\/listener', listener);
//app.use('\/',router)

//app.get('\/\/turtleEditorLink', function (req, res){
//res.send('hallo'); 
//res.render('config.ejs', {
 //   title: 'Configuration App'
 // });
//});
app.use('\/\/fuseki', proxy('localhost:3030', {
  proxyReqPathResolver: function(req) {
    return require('url').parse(req.url).path;
  }
}));

app.get('\/\/turtleEditor',function(req, res){
 res.render('turtleEditor', {
    title: 'Editing'
  });
})

app.get('\/\/visualization',function(req, res){
 res.render('visualization', {
    title: 'visualization'
  });
})


app.get('\/\/config', function(req, res) {
  res.render('config.ejs', {
    title: 'Configuration App'
  });
});


app.get('\/\/querying', function(req, res) {
  res.render('querying.ejs', {
    title: 'Make a query'
  });
});

// http post when  a user configurations is submitted
app.post('\/\/config', function(req, res) {
  var filepath = __dirname + '/jsonDataFiles/userConfigurations.json';
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
    title: 'System Preparation'
  });
});

app.locals.isExistSyntaxError = false;
var ErrorsFilePath = __dirname + '/jsonDataFiles/syntaxErrors.json';
function readSyntaxErrorsFile() {
  fs.exists(ErrorsFilePath, function(exists) {
    if (exists) {
      var data = fs.readFileSync(ErrorsFilePath);
      if (data.toString().includes('Error')) {
        app.locals.isExistSyntaxError = true;
      }
      else
      {
        app.locals.isExistSyntaxError = false;
      }
    }
  });
}
watch(ErrorsFilePath, {
  recursive: true
}, function(evt, name) {
  // call if SyntaxErrors file was changed
  readSyntaxErrorsFile();
});
// call at the first time
readSyntaxErrorsFile();



// check if the userConfigurations file is exist
// for the first time of app running
var path2 = __dirname + '/jsonDataFiles/userConfigurations.json';
function readUserConfigurationFile() {
  fs.exists(path2, function(exists) {
    if (exists) {
      var data = fs.readFileSync(path2);
      if (data.includes('vocabularyName')) {
        jsonfile.readFile(path2, function(err, obj)  {
          var menu = Array(7).fill(false);


          Object.keys(obj).forEach(function(k) {
            if (k === "vocabularyName") {
              // store projectTitle to be used by header.ejs
              app.locals.projectTitle = obj[k];
            } else if (k === "turtleEditor") { //menu[0]
              menu[0] = true;
              // do more stuff
            } else if (k === "documentationGeneration") { //menu[1]
              menu[1] = true;
            } else if (k === "visualization") { //menu[2]
              menu[2] = true;
            } else if (k === "sparqlEndPoint") { //menu[3]
              menu[3] = true;
            } else if (k === "evolutionReport") { //menu[4]
              menu[4] = true;
            } else if (k === "analytics") { //menu[5]
              menu[5] = true;
            } else if (k === "syntaxValidation") { //menu[6]
              menu[6] = true;
            }
          });
          app.locals.userConfigurations = menu;
        });
      }
    }
  });
}
watch(path2, {
  recursive: true
}, function(evt, name) {
  // call if userConfigurations file was changed
  readUserConfigurationFile();
});
// call at the first time
readUserConfigurationFile();


function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

//  catch 404 and forward to error handler

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
