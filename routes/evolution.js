var express = require('express');
var router = express.Router();
var fs = require('fs');
var escapeHtml = require('escape-html');


/* GET users listing. */
router.get('/', function(req, res) {

  var path = "helper/tools/evolution/evolutionReport.txt";
  var object = {};
  var key1 = 'add';
  var key2 = 'del';
  object[key1] = [];
  object[key2] = [];
  var  history = [{
      id: 1,
      content: '<a href"www.google.com"><h1>item 1</h1></a>',
      start: '2014-04-20'
    },
    {
      id: 2,
      content: 'item 2',
      start: '2014-04-14'
    },
    {
      id: 3,
      content: 'item 3',
      start: '2014-04-18'
    },
    {
      id: 4,
      content: 'item 4',
      start: '2014-04-16',
      end: '2014-04-19'
    },
    {
      id: 5,
      content: 'item 5',
      start: '2014-04-25'
    },
    {
      id: 6,
      content: 'item 6',
      start: '2014-04-27',
      type: 'point'
    }
  ];

  fs.exists(path, function(exists) {
    if (exists) {
      //var arrayLines =
      var evolutionReport = fs.readFileSync(path).toString();
      var arrayLines = evolutionReport.split("\n");
      arrayLines.shift();
      arrayLines.pop();
      arrayLines.forEach(function(element) {
        console.log(element);
        //console.log("item"+element);
        if (element.charAt(0) == '+') {
          element = element.substr(2);
          //element = element.split(" ");
          //element = element[1];

          object['add'].push(JSON.stringify(escapeHtml(element)));

        } else if (element.charAt(0) == '-') {
          element = element.substr(2);
          object['del'].push(JSON.stringify(element));

        }
      });
      //console.log(object);
      //evolutionReport = escapeHtml(evolutionReport)
      //console.log('arrayLines' + evolutionReport);


      // evolutionReport = evolutionReport.toString();
      // evolutionReport = evolutionReport.split("<").join("&lt;");
      // evolutionReport = evolutionReport.split(">").join("&gt;");
      // evolutionReport = evolutionReport.split("\n("<");").join("<br />");
      // evolutionReport = evolutionReport.split("+ ").join("</br>+");
      // evolutionReport = evolutionReport.split("- ").join("</br>-");
      //console.log(evolutionReport);
    }
  });

  res.render('evolution', {
    title: 'Evolution Report',
    evolutionReport: object,
    history:history
  });
});

module.exports = router;
