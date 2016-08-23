var app = angular.module('eventApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		.when('/contactus',{
			templateUrl: 'contactus.html'
		})
});

app.factory('eventService', function($resource){
	return $resource('/api/events');
});

app.controller('mainController', function($scope, eventService){
	$scope.events = [];
	$scope.newEvent = {title: '', venue: '', date: ''};

	$scope.events = eventService.query();

	$scope.post = function(){
		eventService.save($scope.newEvent, function(){
			$scope.events.push($scope.newEvent);
			$scope.newEvent = {title: '', venue: '', date: ''};
		});
	};

});