angular.module('ExampleAPIModule', [])

	.controller('ExampleAPIController', function($scope, $http) {
		var api = 'http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=get_course_by_name&name=Web Engineering';
		$http.get(api)
			.success(function(data){
				$scope.contents = data;
						
		})
		.error(function (data) {
			console.log('error pulling data from ' + api);
		});
	});