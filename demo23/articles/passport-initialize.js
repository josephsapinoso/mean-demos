var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

// boilerplate code for initializing passport
module.exports = function(passport){
	passport.serializeUser(function(user, done) { // accepts a user object
		done(null, user._id); // returns id of object
	});
	passport.deserializeUser(function(id, done) { // accepts an id
		User.findById(id, function(err, user) { // looks up user in database
			done(err, user); // returns associated user
		});
	});
	passport.use('signup', new LocalStrategy({ // implement sign-up functionality 
		passReqToCallback : true // helps us to process entire request to callback
	},
	function(req, username, password, done) {
		findOrCreateUser = function(){ // first check whether user exists
			User.findOne({ 'username' : username}, function(err, user) {
				if(err){ // if there is an error in fetching the user details
					return done(err); // we invoke the done function with an error
				}
				if(user) { // if the user already exists
					return done(null, false); // we invoke the done() function with the null and with the value false
				} else { // if there is no error and the user does not already exist..
					var newUser = new User(); // we create a newUser object and initialize the username and password properties
					newUser.username = username;
					newUser.password = createHash(password); // before storing the password, we hash the password by using the createHash() function defined below
					newUser.save(function(err) { // we then save the user to the database
						if (err){
							throw err;
						}
						return done(null, newUser); // and then invoke the done function with a null value and user object
					});
				}
				});
		};
		process.nextTick(findOrCreateUser);
	})
	);
	passport.use('signin', new LocalStrategy({ // after this we implement the sign-in functionality 
		passReqToCallback : true
	},
			function(req, username, password, done) {
		User.findOne({ 'username' : username }, // check if user exists in db or not
			function(err, user) {
				if(err)
					return done(err);
				if (!user){ 
					return done(null, false); // redirects user to sign-in page 
				}
				if (!isPasswordValid(user, password)){
					return done(null, false);
				}
				return done(null, user);
			}
		);
	}
	));
	var isPasswordValid = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
}; 