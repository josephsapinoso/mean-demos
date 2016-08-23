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

app.controller('authController',function($scope, $http, $location){
	$scope.user = {username: '', password: ''}; // stores details of user
	$scope.msg = ''; // stores message 

	$scope.signin = function(){
		$http.post('/auth/signin', $scope.user).success(function(response){
			if(response.state == 'sucess'){
				$location.path('/');
			}
			else {
				$scope.msg = response.message; 
			}
		});
	};

	$scope.signup = function(){ // handle sign-up requests w/ response
		$http.post('/auth/signup',$scope.user).success(function(response){
			if (response.state =='success'){
				$location.path('/');
			}
			else {
				$scope.msg = response.message;
			}
		});

	};	
});
