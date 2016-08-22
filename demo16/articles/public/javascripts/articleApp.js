var app = angular.module('articleApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		.when('/about', {
			templateUrl: 'about.html',
		})
});

// ------------------------------------------------------------------------------------

// Create the Service for obtaining article details:

app.factory('articleService', function($http) {  // created a service named 'articleService'

	var factory = {};

	factory.getArticles = function(){ // defined a method named 'getArciles' that uses the $http.get method to fetch the data from the db
			return $http.get ('/api/articles');
	}
	return factory; 
});

// ------------------------------------------------------------------------------------
app.controller('mainController', function($scope, $http, articleService){ // declair service as a dependency for main controller 

	$scope.articles = [];

	$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};

	// we will replace this method with a service to obtain the article details:
	// $http.get('/api/articles').then(function(response){
	// 		$scope.articles = response.data;
	// });

	articleService.getArticles().then(function(response){
		$scope.articles = response.data;
	});



	$scope.post = function(){
		$scope.newArticle.timestamp = Date.now();
		$http.post('/api/articles', $scope.newArticle).then(function(response){
			$scope.articles.push(response.data);
			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
		});
	}

});
