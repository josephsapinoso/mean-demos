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

app.controller('mainController', function($scope){
	$scope.articles = [];
	$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};

	$scope.post = function(){
		$scope.newArticle.timestamp = Date.now();
		$scope.articles.push($scope.newArticle);
		$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
	};
});
