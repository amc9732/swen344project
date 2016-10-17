angular.module('ExampleAPIModule', [])

	.controller('ExampleAPIController', function($scope, $http) {
	    
	    $http.get('http://rest-service.guides.spring.io/greeting')
	        
	        .then(function(response) {
	            $scope.greeting = response.data;
	        });
	});