var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');

//--middleware for authorization----------------------------------------//

router.use('/articles', function(req, res, next) {  // intercepts all requests to the /api/articles endpoint
	if (req.method == 'GET') // if the request is a GET request,
		return next(); // it will call the next middleware function in sequence 
	else if (req.isAuthenticated()) // otherwise it checks whether the request is authenticated or not
		return next(); // if authenticated, it will call the next middleware function in sequence 
	else 
		res.send ({status: 'Authentication Failure'}); // otherwise it will send this response to the client 
});

//----------------------------------------------------------------------//

//--middleware for delete and put requests  ---------------------------//

router.delete('/articles/:id', function(req, res, next){
	Article.remove({_id: req.params.id}, function(err, article) {
		if(err) {
			return res.send(err);
		}
		res.json({ message: 'Successfully deleted' });
	});
});

router.put('/articles', function(req,res, next){
	Article.findOne({_id: req.body._id}, function (err, article) {
		if (err) {
			return res.send(err);
		}
		article.username = req.body.username;
		article.title = req.body.title;
		article.text = req.body.text;
		article.timestamp = req.body.timestamp;
		article.save(function(err) {
			if (err) {
				return res.send(err);
			}
			res.json({ message: 'Article updated!' });
		});
	});
});

//----------------------------------------------------------------------//


router.get('/articles', function(req, res, next) {
	Article.find (function(err, articles){
		if(err) {
			return res.send(500, err);
		}
		return res.send(articles);
	});
});

router.get('/articles/:id', function(req, res, next) {
	Article.findById(req.params.id, function (err, article){
		if(err)
			res.send(err);
		res.json(article);
	});
});


router.post('/articles', function(req, res, next) {
	var article = new Article();
	article.username = req.body.username;
	article.title = req.body.title;
	article.text = req.body.text;
	article.save(function(err, article) {
		if (err){
			return res.send(500, err);
		}
		return res.json(article);
	});
});

module.exports = router;
