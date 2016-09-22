var express = require('express');
var router = express.Router();

//This will let us use HTML as our templates instead of EJS.
exports.index = function(req, res){
	res.render('index', { title: 'ejs' });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
