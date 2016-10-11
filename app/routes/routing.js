var app = angular.module('RoutingModule', ['ngRoute']);

// configure our routes
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);//remove the need for # in any URLs
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'templates/home.html',
            controller  : 'mainController'
        })
        // route for the profile page
        .when('/profile', {
            templateUrl : 'templates/profile.html',
            controller  : 'profileController'
        })
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Welcome to Wave!';

});

app.controller('profileController', function($scope) {

    $scope.message = 'Profile page coming soon!';

});