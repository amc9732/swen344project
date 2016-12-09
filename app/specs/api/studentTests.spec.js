/*

 Tests for the Student.php API

 */
describe('The Student.php HTTP calls', function () {
	var httpBackend;

	beforeEach(inject(function (_$httpBackend_) {
		httpBackend = _$httpBackend_;
	}));

	it('should return correct student information for user id 63', inject(function($http) {

		var $scope = {};

		/* ACTUAL CODE BEING TESTED */
		$http.get('http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=get_student_by_user_id&id=63')
			.success(function(data, status, headers, config) {
				$scope.valid = true;
				$scope.response = data;
			})
			.error(function(data, status, headers, config) {
				$scope.valid = false;
			});

		//Mock reponse
		httpBackend
			.when('GET', 'http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=get_student_by_user_id&id=63')
			.respond(200, {"StudentID": 12, "UserID": 63, "TranscriptID": 6, "ExpectedGradYear": 2018});

		//Needs to call this
		httpBackend.flush();

		expect($scope.valid).toBe(true);
		expect($scope.response).toEqual({"StudentID": 12, "UserID": 63, "TranscriptID": 6, "ExpectedGradYear": 2018});

	}));

	it('should return correct student information for user id 1', inject(function($http) {

		var $scope = {};

		/* ACTUAL CODE BEING TESTED */
		$http.get('http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=get_student_by_user_id&id=1')
			.success(function(data, status, headers, config) {
				$scope.valid = true;
				$scope.response = data;
			})
			.error(function(data, status, headers, config) {
				$scope.valid = false;
			});

		//Mock reponse
		httpBackend
			.when('GET', 'http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=get_student_by_user_id&id=1')
			.respond(200, {"StudentID":2,"UserID":1,"TranscriptID":2,"ExpectedGradYear":2017});

		//Needs to call this
		httpBackend.flush();

		expect($scope.valid).toBe(true);
		expect($scope.response).toEqual({"StudentID": 2,"UserID": 1,"TranscriptID": 2,"ExpectedGradYear": 2017});
	}));

	it('return 200 when using POST to add student to class', inject(function($http) {

		var $scope = {};

		/* ACTUAL CODE BEING TESTED */
		$http.post('http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=get_student_by_user_id&id=1')
			.success(function(data, status, headers, config) {
				$scope.valid = true;
				$scope.response = data;
			})
			.error(function(data, status, headers, config) {
				$scope.valid = false;
			});

		//Mock reponse
		httpBackend
			.when('POST', 'http://localhost:1337/vm344e.se.rit.edu/api/Student.php?action=get_student_by_user_id&id=1')
			.respond(200);

		//Needs to call this
		httpBackend.flush();

		expect($scope.valid).toBe(true);
	}));

});
