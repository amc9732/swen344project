var app = angular.module('HomePageModule', ['ngRoute']);

// create the controller and inject Angular's $scope
app.controller('HomePageController', function($window, $scope, $route, $rootScope, $location, $http) {

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

	$scope.searchClass = function() {
        var queryVal = $('#searchBox').val();
		$http.get("http://vm344e.se.rit.edu/api/Course.php?action=get_course_by_name&name=" + queryVal)
			.success(function(data) {
				debugger;
				return data;
			})

			.error(function(data) {
                debugger;
				console.log('Error pulling from Course endpoint, action = get_course_by_name with parameter name being ' + name);
			});
        };

});


