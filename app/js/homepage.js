var app = angular.module('HomePageModule', []);

// create the controller and inject Angular's $scope
app.controller('HomePageController', function($window, $scope) {

	$scope.logout = function() {
		$window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";
	};

});
