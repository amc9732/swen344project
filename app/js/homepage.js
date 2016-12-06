var app = angular.module('HomePageModule', ['ngRoute']);

// create the controller and inject Angular's $scope
app.controller('HomePageController', function($window, $scope, $route, $rootScope, $location) {

	//This if/else is just to help understand route loading... has no other purpose
	if(!angular.isDefined($rootScope.foo)){
		$rootScope.foo = 0;
	} 
	else {
		$rootScope.foo++;
	}

	$scope.goToProfile = function() {
		$location.path('/profile');
	};

	$scope.reloadRoute = function() {
		$route.reload();//this will reinstantiate this controller, so anything in $scope will be lost!
	};

	$scope.logout = function() {
		$window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";
	};

	$scope.message = "THIS IS THE HOMEPAGE!";

});
