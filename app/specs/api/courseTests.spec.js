/*

 Tests for the Course.php API

 */
describe('The Course.php HTTP calls', function () {
	var httpBackend;

	beforeEach(inject(function (_$httpBackend_) {
		httpBackend = _$httpBackend_;
	}));

	it('should return correct information for all classes in DB', inject(function ($http) {

		var $scope = {};

		/* ACTUAL CODE BEING TESTED */
		$http.get('http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=get_all_courses')
			.success(function (data, status, headers, config) {
				$scope.valid = true;
				$scope.response = data;
			})
			.error(function (data, status, headers, config) {
				$scope.valid = false;
			});

		//Mock reponse
		httpBackend
			.when('GET', 'http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=get_all_courses')
			.respond(200, {"CourseID":1,"Name":"Web Engineering","Description":"","Credits":0,"GPAReq":0},{"CourseID":3,"Name":"swen1","Description":"learning","Credits":3,"GPAReq":0},{"CourseID":4,"Name":"test","Description":"test","Credits":3,"GPAReq":0},{"CourseID":5,"Name":"test","Description":"test","Credits":3,"GPAReq":0},{"CourseID":6,"Name":"aaa","Description":"bbb","Credits":4,"GPAReq":0},{"CourseID":7,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":8,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":9,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":10,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":11,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":12,"Name":"BeersOftheWorld","Description":"chugchugchug","Credits":9,"GPAReq":3},{"CourseID":13,"Name":"Calculus A","Description":"Learn the Basics of Calc","Credits":3,"GPAReq":2.5},{"CourseID":14,"Name":"Object Oriented Programming","Description":"Learn how to write basic Object Oriented Programming","Credits":3,"GPAReq":2},{"CourseID":15,"Name":"Chemistry 2 with Lab","Description":"Learn all about the periodic table","Credits":4,"GPAReq":3},{"CourseID":16,"Name":"Psychology","Description":"Learn about Psychology","Credits":3,"GPAReq":2},{"CourseID":17,"Name":"English 1","Description":"Learn all about English","Credits":3,"GPAReq":1},{"CourseID":18,"Name":"Calculus B","Description":"Learn more about Calculus","Credits":3,"GPAReq":2.5},{"CourseID":19,"Name":"Calculus C","Description":"Learn even more about Calc","Credits":3,"GPAReq":2.5});
		//Needs to call this
		httpBackend.flush();

		expect($scope.valid).toBe(true);
		expect($scope.response).toEqual({"CourseID":1,"Name":"Web Engineering","Description":"","Credits":0,"GPAReq":0},{"CourseID":3,"Name":"swen1","Description":"learning","Credits":3,"GPAReq":0},{"CourseID":4,"Name":"test","Description":"test","Credits":3,"GPAReq":0},{"CourseID":5,"Name":"test","Description":"test","Credits":3,"GPAReq":0},{"CourseID":6,"Name":"aaa","Description":"bbb","Credits":4,"GPAReq":0},{"CourseID":7,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":8,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":9,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":10,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":11,"Name":"test_course","Description":"test_course","Credits":9001,"GPAReq":3.5},{"CourseID":12,"Name":"BeersOftheWorld","Description":"chugchugchug","Credits":9,"GPAReq":3},{"CourseID":13,"Name":"Calculus A","Description":"Learn the Basics of Calc","Credits":3,"GPAReq":2.5},{"CourseID":14,"Name":"Object Oriented Programming","Description":"Learn how to write basic Object Oriented Programming","Credits":3,"GPAReq":2},{"CourseID":15,"Name":"Chemistry 2 with Lab","Description":"Learn all about the periodic table","Credits":4,"GPAReq":3},{"CourseID":16,"Name":"Psychology","Description":"Learn about Psychology","Credits":3,"GPAReq":2},{"CourseID":17,"Name":"English 1","Description":"Learn all about English","Credits":3,"GPAReq":1},{"CourseID":18,"Name":"Calculus B","Description":"Learn more about Calculus","Credits":3,"GPAReq":2.5},{"CourseID":19,"Name":"Calculus C","Description":"Learn even more about Calc","Credits":3,"GPAReq":2.5});
	}));


	it('return 200 when using POST to add new class to DB"', inject(function ($http) {

		var $scope = {};

		/* ACTUAL CODE BEING TESTED */
		$http.post('http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=create_course&name=test&description=test&credits=1&gpa_req=3')
			.success(function (data, status, headers, config) {
				$scope.valid = true;
				$scope.response = data;
			})
			.error(function (data, status, headers, config) {
				$scope.valid = false;
			});

		//Mock reponse
		httpBackend
			.when('POST', 'http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=create_course&name=test&description=test&credits=1&gpa_req=3')
			.respond(200);

		//Needs to call this
		httpBackend.flush();

		expect($scope.valid).toBe(true);

	}));

	it('should return correct information for Web Engineering class', inject(function($http) {

		var $scope = {};

		/* ACTUAL CODE BEING TESTED */
		$http.get('http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=get_course_by_partial_name&name=Web')
			.success(function(data, status, headers, config) {
				$scope.valid = true;
				$scope.response = data;
			})
			.error(function(data, status, headers, config) {
				$scope.valid = false;
			});

		//Mock reponse
		httpBackend
			.when('GET', 'http://localhost:1337/vm344e.se.rit.edu/api/Course.php?action=get_course_by_partial_name&name=Web')
			.respond(200, {"CourseID":1,"Name":"Web Engineering","Description":"","Credits":0,"GPAReq":0});

		//Needs to call this
		httpBackend.flush();

		expect($scope.valid).toBe(true);
		expect($scope.response).toEqual({"CourseID":1,"Name":"Web Engineering","Description":"","Credits":0,"GPAReq":0});
	}));

});
