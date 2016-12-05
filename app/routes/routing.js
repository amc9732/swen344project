var app = angular.module('RoutingModule', ['ngRoute']);

// configure our routes
app.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);//remove the need for # in any URLs
    $routeProvider

        .when('/index', {
            templateUrl : 'index.html'
        })
        // route for the home page
        .when('/home', {
            templateUrl : '/templates/home.html',
            controller  : 'HomePageController'
        })
        // route for the profile page
        .when('/profile', {
            templateUrl : '/templates/profile.html',
            controller  : 'UserProfileController'
        })
        .when('/404', {
            templateUrl : '/templates/404.html'
        })

        //.otherwise({ redirectTo: '/404' });//for all unknown routes, go to 404
});
