var app = angular.module('HomePageModule', []);

// create the controller and inject Angular's $scope
app.controller('HomePageController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Welcome to Wave!';

});