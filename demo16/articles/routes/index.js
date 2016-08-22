//define some more routing

var express = require('express');

// router for application root
var router = express.Router();
	router.get('/', function(req,res,next) {
		res.render ('index', {title:'Articles'});
});

	module.exports = router; 