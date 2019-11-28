var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/realisations', function(req, res, next) {
  res.render('realisations')
})

module.exports = router;
