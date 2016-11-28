angular.module('APIModule', [])

	.controller('APIController', function($scope, $http) {
		var api = 'http://localhost:1337/vm344e.se.rit.edu/api/User.php?action=get_all_users';
		$http.get(api)
			.success(function(data){
				$scope.contents = data;
						
			})
			.error(function (data) {
				console.log('error pulling data from ' + api);
			});
	});