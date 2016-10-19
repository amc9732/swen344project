angular.module('ExampleAPIModule', [])

	.controller('ExampleAPIController', function($scope, $http) {
	    var api = 'http://vm344e.se.rit.edu/api/Student.php?action=get_student_by_id&id=1';
	    $http.get(api).
	        then(function(response) {
	            $scope.json = response.data;
	        });
	});

