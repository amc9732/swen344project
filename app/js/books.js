const root = 'http://localhost:1337/vm344e.se.rit.edu/api/Book.php?';

var app = angular.module('BookModule', [])

	//Get All Books
	.controller('BooksController', function($scope, $http) {

		var queryBooks = function() {

			$http.get(root + 'action=get_all_books')
				.success(function(data) {
					return data;

				})
				.error(function(data) {
					console.log('Error pulling from Book endpoint, action = get_all_books');
				});
		}

		$scope.data = queryBooks();	

	});

