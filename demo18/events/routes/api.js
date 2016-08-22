var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Event = mongoose.model('Event');

router.get('/events', function(req, res, next) {
	Event.find (function(err,events){
		if(err){
			return res.send(500, err);
		}
		return res.send(events);
	});
});

router.post('/events', function(req, res, next) {
	var event = new Event();
	event.title = req.body.title;
	event.venue = req.body.venue;
	event.date = req.body.date;
	event.save(function(err, event) {
		if(err){
			return res.send(500,err);
		}
		return res.json(event);
	});
});

module.exports = router;
