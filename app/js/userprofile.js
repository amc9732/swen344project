var app = angular.module('UserProfileModule', ['socialLogin', 'ngRoute']);
	
app

	.config(function(socialProvider){
		socialProvider.setLinkedInKey("779g2rct9ezt1u");
	})

    .controller("UserProfileController", function($scope, $rootScope, $http, $route, $location){

    	$scope.linkedInAuthorized = false;

    	//This event is called by the angular-social-login bower package
    	$rootScope.$on('event:social-sign-in-success', function(event, userDetails) {
    		localStorage.setItem("linkedInImageUrl", userDetails.imageUrl);
    		$scope.linkedInAuthorized = true;
    		$location.path('/profile');
    	});

    	$scope.fullName = $rootScope.fullName;

    	$scope.imageUrl = localStorage.getItem('linkedInImageUrl');

    	//not working... this is supposed to get some more data from LinkedIn, getting CORS issue again instead, even with proxy.
   //  	var getProfileInfo = function() {
   //  		$http(
			// 	{
			// 		method: 'GET', 
			// 		url: 'http://localhost:1337/https://api.linkedin.com/v1/people/~', 
			// 		headers: {
			//     		'x-li-format': 'json'
			//     	}
			// 	}
			// )
			// 	.success(function(data){
			// 		console.log(data);
			// 	})
			// 	.error(function (error) {
			// 		console.log('there was error...');
			// 	});
   //  	}

   		//Just remove the localstorage item then reload the route (which reinstantiates this controller)
    	$scope.removeLinkedIn = function() {
    		localStorage.removeItem('linkedInImageUrl');
    		$route.reload();

    	}
        
    });