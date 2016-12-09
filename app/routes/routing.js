var app = angular.module('RoutingModule', ['ngRoute']);

// configure our routes
app.config(function($routeProvider, $locationProvider) {
    
    $routeProvider

        .when('/index', {
            templateUrl : 'index.html'
        })
        // route for the home page
        .when('/home', {
            templateUrl : '/templates/home.html',
            controller  : 'HomePageController',
            reloadOnSearch: false
        })
        // route for the profile page
        .when('/profile', {
            templateUrl : '/templates/profile.html',
            controller  : 'UserProfileController'
        })
        .when('/404', {
            templateUrl : '/templates/404.html'
        })
        .when('/create_course', {
            templateUrl : '/templates/create_course.html',
            controller  : 'CreateCourseController'
        })

        .otherwise({ redirectTo: '/' });//for all unknown routes

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });//remove the need for # in any URLs
});
