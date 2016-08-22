var app = angular.module('eventApp', []);

app.controller('mainController', function($scope){
	$scope.events = [];
	$scope.newEvent = {title: '', venue: '', date: ''};

	$scope.post = function(){
		$scope.events.push($scope.newEvent);
		$scope.newEvent = {title: '', venue: '', date: ''};
	};
})