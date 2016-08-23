var app = angular.module('articleApp', ['ngRoute','ngResource']); 

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		.when('/about', {
			templateUrl: 'about.html',
		})
		.when('/signin', {
			templateUrl: 'signin.html',
			controller: 'authController'
		})
		.when('/signup', {
			templateUrl: 'signup.html',
			controller: 'authController'
		})		
		.when('/about', {
			templateUrl: 'about.html',
		});				
});

app.factory('articleService', function($resource) {  
	return $resource('/api/articles'); 
});

app.controller('mainController', function($scope, $http, articleService){ 
	$scope.articles = [];
	$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};

	$scope.articles = articleService.query(); 

	$scope.post = function(){
		$scope.newArticle.timestamp = Date.now();

	articleService.save($scope.newArticle, function(){
		$scope.articles.push($scope.newArticle);
		$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};

	});

	}
});

app.controller('authController',function($scope){
	$scope.user = {username: '', password: ''}; // stores details of user
	$scope.msg = ''; // stores message 

	$scope.signin = function(){ // handle sign-in requests w/ response
		$scope.msg = 'Sign in request received for user: ' + $scope.user.username;
	};

	$scope.signup = function(){ // handle sign-up requests w/ response
		$scope.msg = 'Sign up request received for user: ' + $scope.user.username;
	};	
});
