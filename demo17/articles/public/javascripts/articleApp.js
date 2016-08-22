var app = angular.module('articleApp', ['ngRoute','ngResource']); // add ngResource as a dependency for the module

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

//---------------------------------------------------------------------------------------
app.factory('articleService', function($resource) {  // replaced $http with $resource
	return $resource('/api/articles'); 
});
	// created a $resource object to help us interact with RESTful service side data-servce at the end-point /api/articles
	// we can now use this $resource object to fetch and post data to the database 


app.controller('mainController', function($scope, $http, articleService){ 
	$scope.articles = [];
	$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
//---------------------------------------------------------------------------------------

// New $resource method:

	$scope.articles = articleService.query(); 
	// Here we are using the query() method of the resource object returned by the articles service 
	// to invoke the $http.get method associated with the endpoint that the resource object is linked to. 

	$scope.post = function(){
		$scope.newArticle.timestamp = Date.now();

	articleService.save($scope.newArticle, function(){
	// here we are using the save() method of the resource object returned by the article service to invoke the 
	// $http.post method associated with the endpoint that the resource object is linked to. 
	// this with save the new article in the database then...
		$scope.articles.push($scope.newArticle);
		// push the new article in the $scope.articles array 
		// the contents of this array will be displayed through data-binding
		$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};

	});

	}
});

//---------------------------------------------------------------------------------------

//  Commenting out. Let's use $resource instead. 
//	articleService.getArticles().then(function(response){
//		$scope.articles = response.data;
//	});


//  Commenting out. Let's use $resource instead. 
//	$scope.post = function(){
//		$scope.newArticle.timestamp = Date.now();
//		$http.post('/api/articles', $scope.newArticle).then(function(response){
//			$scope.articles.push(response.data);
//			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
//		});
//	}

	

//---------------------------------------------------------------------------------------


