var express = require('express');
var router = express.Router();

//-----Add middleware functions of our own------------------------------------------------------------

// Designed to respond to every GET request to /api/product and responds with message 'Get product list'
router.get('/product', function(req, res, next) {
	res.end('Get product list');
});

// Designed to respond to every GET request to /api/product/:id 
router.get('/product/:id', function(req, res, next) {
	res.end('Get details of product with id: ' + req.params.id);
});

//----------------------------------------------------------------------------------------------------

module.exports = router;
