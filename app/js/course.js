var app = angular.module('CourseModule', [])

	.controller('AllCoursesController', function($scope, $http) {
		var queryCourses = function() {
			$http.get('http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=get_all_courses')
				.success(function(data) {
					return data;

				})
				.error(function(data) {
					console.log('Error pulling from Course endpoint, action = get_all_courses');
				});
		};

		$scope.allCourses = queryCourses();
	})

	.controller('GetCourseController', function($scope, $http) {

		var queryCourse = function(name) {
			$http.get(root + "action=get_course_by_name&name=" + name)
				.success(function(data) {
					return data;
				})

				.error(function(data) {
					console.log('Error pulling from Course endpoint, action = get_course_by_name with parameter name being ' + name);
				});
		};
	});