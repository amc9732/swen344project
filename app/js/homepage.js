var app = angular.module('HomePageModule', ['ngRoute']);

// create the controller and inject Angular's $scope
app.controller('HomePageController', function($http, $window, $scope, $route, $rootScope, $location) {

	$scope.goToProfile = function() {
		$location.path('/profile');
	};

	$scope.reloadRoute = function() {
		$route.reload();//this will reinstantiate this controller, so anything in $scope will be lost!
	};

	$scope.logout = function() {
		$window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";
	};

	$scope.queryTerm = "";
    $scope.searchSubmitted = false;
    $scope.searchResults = [];

    $scope.submitSearch = function() {
    	$scope.searchResults = [];//reset results list
    	var call = 'http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=get_course_by_partial_name&name=' + $scope.queryTerm;
		$http.get(call)
			.success(function(data){
				for(var i = 0; i < data.length; i++) {
					$scope.searchResults.push(data[i]);
				}
				$scope.searchSubmitted = true;
			})
			.error(function (data) {
				console.log('error pulling data from ' + api);
			});
    };

});
