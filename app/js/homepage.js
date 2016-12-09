var app = angular.module('HomePageModule', ['ngRoute']);

// create the controller and inject Angular's $scope
app.controller('HomePageController', function($http, $window, $scope, $route, $rootScope, $location) {
	var userID = localStorage.getItem('userID');
	var type = localStorage.getItem('type');

	//use the UserID to get the Student ID
	var student = 'http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=get_student_by_user_id&id=' + userID;
	var studentID;

	$http.get(student)
		.success(function(data) {
			studentID = data[0].StudentID;
		})
		.error(function(error){
			console.log(error);
		});



	// Initialize button rerouting

	$scope.goToProfile = function() {
		$location.path('/profile');
	};

	$scope.reloadRoute = function() {
		$route.reload();//this will reinstantiate this controller, so anything in $scope will be lost!
	};

	$scope.logout = function() {
		$window.location = "https://mail.google.com/mail/u/0/?logout&hl=en";
	};

	$scope.isAdmin = function() {
		return (type == 'admin');
	};

	$scope.admin = $scope.isAdmin();

	$scope.goToCreateCoursePage = function() {
		$location.path('/create_course');
	};

	// Initialize other functionality

	$scope.queryTerm = "";
    $scope.searchSubmitted = false;
    $scope.classResults = [];
    $scope.courseResults = [];

    $scope.submitSearch = function() {
    	$scope.classResults = [];
    	$scope.courseResults = [];
    	var call1 = 'http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=get_course_by_partial_name&name=' + $scope.queryTerm;
		var call2 = 'http://localhost:1337/vm344e.se.rit.edu/api/Class.php?action=get_class_by_courseid&course_id=';

		//GET COURSE DATA
		$http.get(call1)
			.success(function(data){
				for(var i = 0; i < data.length; i++) {
					$scope.courseResults.push(data[i])
					//GET CLASS DATA
					$http.get(call2 + data[0].CourseID)
						.success(function(data) {
							for(var i = 0; i < data.length; i++) {
								$scope.classResults.push(data[i]);//put the resulting classes in the search results
							}
						})
						.error(function(error) {
							console.log(error);
						});
				}
				console.log($scope.classResults);
				console.log($scope.courseResults);
				$scope.searchSubmitted = true;
			})
			.error(function (error) {
				console.log(error);
			});
    };
    
    $scope.enrollCourse = function() {
	    var classToEnroll = [];
	    $(".enrollmentCheckbox").each(function () {
		    if (this.checked) {
			    classToEnroll.push(this.value);
		    }
	    });

	    //TODO - Logic to make sure classes fit into schedule/don't overlap

	    for (var i = 0; i < classToEnroll.length; i++) {
		    var request = "http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=create_studentclass&studentid=" + studentID + "&classid=" + classToEnroll[i];
		    console.log(request);
		    $http.post(request)
			    .success(function (data) {

			    })
			    .error(function (error) {
				    console.log(error);
			    });
	    }
    }

});










