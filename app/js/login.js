var oauthModule = angular.module('GoogleOAuthModule', ['ngRoute']);
	
oauthModule.controller('LoginController', function ($location, $scope, $timeout, $route) {

	$scope.loggedIn = null;

	$scope.$on('event:google-plus-signin-success', function (event, authResult) {
		// User successfully authorized the G+ App!
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
	};
});