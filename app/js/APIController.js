angular.module('ExampleAPIModule', [])

	.controller('ExampleAPIController', function($scope, $http) {
	    
	    $http.get('https://jsonplaceholder.typicode.com/posts/1').
	        then(function(response) {
	            $scope.json = response.data;
	        });
	});