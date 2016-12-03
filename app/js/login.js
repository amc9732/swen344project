var oauthModule = angular.module('GoogleOAuthModule', ['ngRoute']);
	
oauthModule
	
	.controller('LoginController', function ($location, $scope, $timeout, $route, $http) {

		$scope.loggedIn = null;

		$scope.$on('event:google-plus-signin-success', function (event, authResult) {
			// User successfully authorized the G+ App!
			var token = authResult.access_token;
			localStorage.setItem('access_token', token);

			//Major issue below that isnt resolved yet!!!!
			//Also need to check if the user is already in the system, and if not, redirect to 
			//http://vm344b.se.rit.edu/auth/google   or the HR teams page

			// $http.get('https://www.googleapis.com/plus/v1/people/me')
			// 	.success(function(data){
			// 		$scope.contents = data;
			// 		console.log(data);
							
			// 	})
			// 	.error(function (error) {
			// 		console.log(error);
			// 	});

			$scope.loggedIn = true;
			$timeout(callAtTimeout, 1000);
		});

		$scope.$on('event:google-plus-signin-failure', function (event, authResult) {
			// User has not authorized the G+ App!
			$scope.loggedIn = false;
			$timeout(callAtTimeout, 1000);
		});

		function callAtTimeout() {
			if($scope.loggedIn === true) {
				console.log('Signed in!');
				// $scope.navbarRoutes = [];
			 //      angular.forEach($route.routes,function (config,route) {
			 //        $scope.navbarRoutes.push(route);
			 //      });
			 //      $scope.navbarRoutes = $.unique($scope.navbarRoutes)
			 //      console.log($scope.navbarRoutes);
				

				$location.path('/home');
			}
			else {
				console.log('Not logged in...');
			}
		}
	});