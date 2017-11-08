var express = require('express');
var router = express.Router();
var fs = require('fs');
var shell = require('shelljs');
var jsonfile = require('jsonfile');
var app = express();


//  GET home page.
router.get('/', function(req, res) {

  // check if the userConfigurations file is exist
  // for the first time of app running
  var path = "jsonDataFiles/userConfigurations.json";
  fs.exists(path, function(exists) {
    if (!exists) {
      res.redirect('/config');
    } else {
      var data = fs.readFileSync(path);
      if (data.includes('vocabularyName')) {
        jsonfile.readFile(path, function(err, obj)  {
          if (err)
            console.log(err); 
          // // if  there is error page then render the config page
          // var isExistSyntaxError = false;
          // var filePath = 'jsonDataFiles/syntaxErrors.json';
          // var data = fs.readFileSync(filePath);
          // if (data.includes('Error')) {
          //   isExistSyntaxError = true;
          // }

          if (obj.hasOwnProperty('text'))
            res.render('index', {
              title: 'MobiVoc',
              homePage: obj.text
            });
        });
      } else {
        res.redirect('/config');
      }
    }
  });

});

module.exports = router;
