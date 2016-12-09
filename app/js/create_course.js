var app = angular.module('CreateCourseModule', []);

// create the controller and inject Angular's $scope
app.controller('CreateCourseController', function($http, $scope, $location) {

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
	}

    $scope.routeHome = function() {
        $location.path('/home');
    };

});
