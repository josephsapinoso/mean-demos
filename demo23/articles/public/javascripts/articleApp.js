var app = angular.module('articleApp', ['ngRoute','ngResource']).run(function($http, $rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = 'Guest';

	$rootScope.signout = function(){
		$http.get('auth/signout');
		$rootScope.authenticated =false;
		$rootScope.current_user = 'Guest';
	};
}); 

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

app.controller('authController',function($scope, $http, $location,$rootScope){
	$scope.user = {username: '', password: ''}; 
	$scope.msg = ''; 

	$scope.signin = function(){
		$http.post('/auth/signin', $scope.user).success(function(response){
			if(response.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = response.user.username; // username of logged in user
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
				$rootScope.authenticated = true;
				$rootScope.current_user = response.user.username; // username of logged in user
				$location.path('/');
			}
			else {
				$scope.msg = response.message;
			}
		});

	};	
});
