angular.module('ExampleAPIModule', [])

	.controller('ExampleAPIController', function($scope, $http) {
		var api = 'http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=get_all_students';
		$http.get(api)
			.success(function(data){
				$scope.contents = data[0];
						
		})
		.error(function (data) {
			console.log('error pulling data from ' + api);
		});
	});