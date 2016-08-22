var mongoose = require ('mongoose');

var EventSchema = new mongoose.Schema({
	title: String,
	venue: String, 
	date: Date
});

mongoose.model ('Event', EventSchema);