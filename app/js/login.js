var oauthModule = angular.module('GoogleOAuthModule', ['ngRoute']);
	
oauthModule

	.directive('loginDirective', function() {
		return {
			templateUrl : 'templates/login.html'
		};
	})
	
	.controller('LoginController', function ($window, $rootScope, $location, $scope, $timeout, $route, $http) {

		$scope.loggedIn = null;

		$scope.$on('event:google-plus-signin-success', function (event, authResult) {
			// User successfully authorized the G+ App!
			var token = authResult.access_token;
			localStorage.setItem('access_token', token);//store locally for now... might not need

			//Get user data from Google
			$http(
				{
					method: 'GET', 
					url: 'https://www.googleapis.com/plus/v1/people/me', 
					headers: {
			    		'Authorization': 'Bearer ' + token
			    	}
				}
			)
				.success(function(data){
					//save data in root scope
					$rootScope.userEmail = data.emails[0].value;
					$rootScope.fullName = data.displayName;
					$rootScope.firstName = data.name.givenName;
					$rootScope.firstName = data.name.familyName;
				})
				.error(function (error) {
					console.log(error);
				});

			//Get whether or not the user is in the DB
			//Currently sending a sample email already in the DB
			//    so we can test rest of app, should just append $rootScope.userEmail instead once we are done
			$http.get('http://localhost:1337/vm344e.se.rit.edu/api/User.php?action=get_user_by_email&email=dd@d.d')
				.success(function(data) {
					if(data.length === 0) {
						//no email found, redirect to HR
						$window.location.href = "http://vm344b.se.rit.edu/auth/google";
					}
				})
				.error(function(error) {
					console.log('there was an error redirecting to the HR page');
				});

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