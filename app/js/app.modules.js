//Top level Angular module, which will depend on all other modules
var myAppModule = angular.module('EnrollmentSystem', 
	[
		'APIModule',
		'RoutingModule',
		'GoogleOAuthModule',
		'directive.g+signin',
		'HomePageModule',
		'UserProfileModule',
		'CreateCourseModule'
	]
);
