var app = angular.module('UserProfileModule', ['socialLogin', 'ngRoute']);
	
app

	.config(function(socialProvider){
		socialProvider.setLinkedInKey("779g2rct9ezt1u");
	})

    .controller("UserProfileController", function($scope, $rootScope, $http, $route, $location){

    	$scope.linkedInAuthorized = false;

    	//This event is called by the angular-social-login bower package
    	$rootScope.$on('event:social-sign-in-success', function(event, userDetails) {
            console.log(event);
            console.log(userDetails);
    		localStorage.setItem("linkedInImageUrl", userDetails.imageUrl);
    		$scope.linkedInAuthorized = true;
    		$location.path('/profile');
    	});

    	$scope.fullName = $rootScope.fullName;

    	$scope.imageUrl = localStorage.getItem('linkedInImageUrl');

   		//Just remove the localstorage item then reload the route (which reinstantiates this controller)
    	$scope.removeLinkedIn = function() {
    		localStorage.removeItem('linkedInImageUrl');
    		$route.reload();

    	}


    	//needs to be wrapped in a function
		$scope.courses = [];

		$scope.students = "";

		$http.get("http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=get_all_students")
			.success(function(data) {
				$scope.students = data;
			})

			.error(function(error) {
				console.log (error);
			})


        
    });