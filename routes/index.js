var express = require('express');
var router = express.Router();
var fs = require('fs');
var shell = require('shelljs');

//  GET home page.
router.get('/', function (req, res) {

  // check if the userConfigurations file is exist
  // for the first time of app running
  var path = "jsonDataFiles/userConfigurations.json";
  fs.exists(path, function(exists) {
    if(!exists){
      res.redirect('/config');
    }
    else {
      {
        shell.exec('pwd', {
          silent: false
        }).stdout;
        shell.cd('SimpleSparqlQuery/SimpleSparqlQuery/');
        shell.exec('java -jar simpleHtmlGenerator.jar', {
          silent: false
        }).stdout;
        //GET home page.
        res.render('index', {
             title: 'MobiVoc',
         });
      }
    }
  });

});

module.exports = router;
