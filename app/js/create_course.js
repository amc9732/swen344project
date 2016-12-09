var app = angular.module('CreateCourseModule', []);

// create the controller and inject Angular's $scope
app.controller('CreateCourseController', function($http, $scope, $location, $route, $window) {
	var userID = localStorage.getItem('userID');
	var type = localStorage.getItem('type');

	// Initialize button rerouting

	$scope.goToProfile = function() {
		$location.path('/profile');
	};

	$scope.reloadRoute = function() {
		$location.path('/home');
	};

	$scope.logout = function() {
		$window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";
	};

	$scope.isAdmin = function() {
		return (type == 'admin');
	};

	$scope.admin = $scope.isAdmin();

	$scope.goToCreateCoursePage = function() {
		$route.reload();//this will reinstantiate this controller, so anything in $scope will be lost!
	};

	// Initialize other functionality

	$scope.courseName = "";
	$scope.courseDescription = "";
	$scope.creditValue = "";
	$scope.requiredGPA = "";

	$scope.createCourse = function() {
		console.log($scope.courseName);
		console.log($scope.courseDescription);
		console.log($scope.creditValue);
		console.log($scope.requiredGPA);

		var call = 'http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=create_course';
		call += '&name=' + $scope.courseName;
		call += '&description=' + $scope.courseDescription;
		call += '&credits=' + $scope.creditValue;
		call += '&gpa_req=' + $scope.requiredGPA;
		console.log(call);
		$http.post(call)
			.success(function(data) {
				
			})
			.error(function(error) {
				console.log('error occurred when creating the course');
			});
	};

	$scope.reloadRoute = function() {
		$location.path('/home');
	};

});
