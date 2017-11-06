var express = require('express');
var router = express.Router();
var fs = require('fs');
var shell = require('shelljs');
var jsonfile = require('jsonfile');


//  GET home page.
router.get('/', function(req, res) {

  // check if the userConfigurations file is exist
  // for the first time of app running
  var path = "jsonDataFiles/userConfigurations.json";
  fs.exists(path, function(exists) {
    if (!exists) {
      res.redirect('/config');
    } else {
      {
        jsonfile.readFile(path, function(err, obj)  {
          if (err)
            console.log(err); 
          if (obj.hasOwnProperty('text'))
            res.render('index', {
              title: 'MobiVoc',
              homePage: obj.text
            });
        });
      }
    }
  });

});

module.exports = router;
