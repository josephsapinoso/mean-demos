// this file was renamed to api.js from index.js

var express = require('express');
var router = express.Router();

//--- Create 4 middleware functions -------------------------------------------

// Designed to respond to all GET request for paths that start with /api/articles
router.get('/articles', function(req, res, next) {
	res.end ('Get details of all articles');
});

// Designed to respond to all GET request for paths that start with /api/articles/:id
router.get('/articles/:id', function(req, res, next) {
	res.end ('Get details of articles with id: ' + req.params.id);
});

// Designed to respond to all POST request for paths that start with /api/articles/:id
router.post('/articles/:id', function(req, res, next) {
	res.end ('Store the details of article with id ' + req.params.id + ' in the database.');
});


// Designed to respond to all PUT request for paths that start with /api/articles/:id
router.put('/articles/:id', function(req, res, next) {
	res.end ('Update the details of article with id ' + req.params.id + ' in the database.');
});

//-----------------------------------------------------------------------------

module.exports = router;
