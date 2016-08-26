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
	return $resource('/api/articles/:articleId', {articleId: '@id'}, 
		{update: {method: 'PUT'}} 
	); 
});

app.controller('mainController', function($scope, $http, articleService, $location, $rootScope){ 
	$scope.articles = [];
	$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};

	$scope.editMode = false; 

	$scope.articles = articleService.query(); 

	$scope.post = function(){ 
		$scope.newArticle.timestamp = Date.now();
		$scope.newArticle.username = $rootScope.current_user; 
		articleService.save($scope.newArticle, function(response){ 
			if (response.status == 'Authentication Failure')
				$location.path('/signin');
			$scope.articles = articleService.query(); 
			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};

		});
	}

	$scope.edit = function(article){
		$scope.editMode = true;
		$scope.newArticle = articleService.get({articleId: article._id}); 
	};

	$scope.update = function(article){
		$scope.newArticle.timestamp = Date.now();  

		articleService.update($scope.newArticle, function(response){
			if (response.status == 'Authentication Failure')
				$location.path('/signin'); 
		else
		{
			$scope.articles = articleService.query();
			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
		}
		$scope.editMode = false;
		});
	};

	$scope.del = function(article){
		if(confirm ('Are you sure you want to delete this article?'))
		{
			articleService.delete({articleId: article._id}, function(response){
				if(response.status == 'Authentication Failure')
					$location.path('/signin');
				else
				{
					$scope.articles = articleService.query();
					$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
				}
			});
		}
	};

	$scope.isOwnUser = function(article){
		return (article.username == $rootScope.current_user);
	}


});

app.controller('authController',function($scope, $http, $location,$rootScope){
	$scope.user = {username: '', password: ''}; 
	$scope.msg = ''; 

	$scope.signin = function(){
		$http.post('/auth/signin', $scope.user).success(function(response){
			if(response.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = response.user.username; 
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
				$rootScope.current_user = response.user.username; 
				$location.path('/');
			}
			else {
				$scope.msg = response.message;
			}
		});

	};	
});
