var express = require('express');
var router = express.Router();

// GET users listing. This will not stay here once we figure out how we're doing this with the API team.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
