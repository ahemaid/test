var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.render('evolution', {
        title: 'Evolution Report'
          });
});

module.exports = router;
