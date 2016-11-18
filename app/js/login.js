var loginModule = angular.module('LoginModule', ['satellizer'])

	.config(function($authProvider) {
		$authProvider.google({
			clientId: '535130472873-q5fs02pbv7v86fru7v320o9stc4f8ha3.apps.googleusercontent.com'
			// redirectUri: window.location.origin
    	});
	})

	.controller('LoginController', function($scope, $auth) {

    	$scope.authenticate = function(provider) {
			$auth.authenticate(provider);
    	};

  	});