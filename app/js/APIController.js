angular.module('ExampleAPIModule', [])

	.controller('ExampleAPIController', function($scope, $http) {
	    var api = 'https://jsonplaceholder.typicode.com/posts/1';
	    $http.get(api).
	        then(function(response) {
	            $scope.json = response.data;
	        });
	});

