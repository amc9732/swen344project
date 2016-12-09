var app = angular.module('UserProfileModule', ['socialLogin', 'ngRoute']);
	
app

	.config(function(socialProvider){
		socialProvider.setLinkedInKey("779g2rct9ezt1u");
	})

    .controller("UserProfileController", function($scope, $rootScope, $http, $route, $location, $window){
	    var userID = localStorage.getItem('userID');
	    var type = localStorage.getItem('type');

	    // Initialize button rerouting

	    $scope.goToProfile = function() {
		    $route.reload();//this will reinstantiate this controller, so anything in $scope will be lost!
	    };

	    $scope.reloadRoute = function() {
		    $location.path('/home');
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

    	$scope.isConnected = function() {
    		if(localStorage.getItem('linkedInImageUrl'))
    			return true;
    		return false;
    	};

    	//This event is called by the angular-social-login bower package
    	$rootScope.$on('event:social-sign-in-success', function(event, userDetails) {
    		localStorage.setItem("linkedInImageUrl", userDetails.imageUrl);
    		$location.path('/profile');
    	});

    	$scope.fullName = $rootScope.fullName;

    	$scope.imageUrl = localStorage.getItem('linkedInImageUrl');

   		//Just remove the localstorage item then reload the route (which reinstantiates this controller)
    	$scope.removeLinkedIn = function() {
    		localStorage.removeItem('linkedInImageUrl');
    		$route.reload();
    	};

    	$scope.selectedRow = null;

		$scope.setClickedRow = function(index) {
			$scope.selectedRow = index;
		};

        $scope.getCurrentCourse = function() {

        	$scope.classInfo = [];
        	$scope.courseInfo = [];

        	//get enrolled class IDs using the current student ID
            $http.get("http://localhost:1337/vm344e.se.rit.edu/api/StudentClass.php?action=get_classIds_by_student_id&studentid=3")
                .success(function(classIDs) {

                	// for each class ID found
                    for (var classIDIndex = 0; classIDIndex < classIDs.length; classIDIndex++) {

                        //get class object for class ID
                        $http.get("http://localhost:1337/vm344e.se.rit.edu/api/Class.php?action=get_class_by_classid&classid=" + classIDs[classIDIndex].ClassID)
                            .success(function (classData) {

								//add class object to array
								$scope.classInfo.push(classData[0]);

                                //for (var classIndex = 0; classIndex < classesList.length; classIndex++) {
								$http.get("http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=get_course_by_courseid&courseid=" + classData[0].CourseID)
									.success(function (courseData) {

										//add course object to array
										$scope.courseInfo.push(courseData[0]);


                                        console.log($scope.classInfo);
									})
									.error(function (data) {
										console.log("Error retrieving courses by id: " + data)
									});
                                //}
                            })

                            .error(function (data) {
                                console.log("Error retrieving courses by id:" + data)
                            });
                    	}
				})
                .error(function(data){
                    console.log("Error pulling class id from student id: 3 " + data);
                });
    	};

    	$scope.getCurrentCourse();

    });