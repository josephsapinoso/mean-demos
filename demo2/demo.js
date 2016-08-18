var app = angular.module("PersonApp",[]);

app.controller("PersonController", function($scope) {
	var person = {firstName: "", lastName: ""}
	$scope.person = person;
	$scope.fullName = function(){
		return $scope.person.firstName + " " + $scope.person.lastName;
	}
});
