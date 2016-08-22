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

// In order to make api calls to the server, we need to use the $http service. So we will declare this as a dependency in our controller
app.controller('mainController', function($scope, $http){

	$scope.articles = [];

	$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};

	// the $http.get method here, sends a request to /api/articles endpoint that retrieves all the documents from the database and sends 
	// them as a response.
	// If the documents are fully retrieved, then they are sent do the $scope.articles variable
	$http.get('/api/articles').then(function(response){
		$scope.articles = response.data;
	});

	$scope.post = function(){
		$scope.newArticle.timestamp = Date.now();
		// the $http.post method sends a post request to the /api/articles endpoint and passes the newly created $scope.newArticle
		// as a paramenter to this method. 
		$http.post('/api/articles', $scope.newArticle).then(function(response){
			// if it is successfully saved, is is pushed in the $scope.articles array and be displayed right away through data binding
			$scope.articles.push(response.data);
			// finally, we reset the $scope.newArticle object to empty text boxes once the data has been submitted
			$scope.newArticle = {username: '', title: '', text: '', timestamp: ''};
		});
	}

});
