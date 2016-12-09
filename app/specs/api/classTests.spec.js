/*

 Tests for the Class.php API

 */
describe('The Class.php HTTP calls', function () {
	var httpBackend;

	beforeEach(inject(function (_$httpBackend_) {
		httpBackend = _$httpBackend_;
	}));

	it('should return correct class information by giving course id', inject(function ($http) {

		var $scope = {};

		/* ACTUAL CODE BEING TESTED */
		$http.get('http://localhost:1337/vm344e.se.rit.edu/api/Class.php?action=get_class_by_courseid&course_id=1')
			.success(function (data, status, headers, config) {
				$scope.valid = true;
				$scope.response = data;
			})
			.error(function (data, status, headers, config) {
				$scope.valid = false;
			});

		//Mock reponse
		httpBackend
			.when('GET', 'http://localhost:1337/vm344e.se.rit.edu/api/Class.php?action=get_class_by_courseid&course_id=1')
			.respond(200, {
				"ClassID": 1,
				"CourseID": 1,
				"TermID": 1,
				"SectionNumber": 0,
				"Capacity": 0,
				"StartTime": "",
				"EndTime": "",
				"Days": ""
			}, {
				"ClassID": 2,
				"CourseID": 1,
				"TermID": 1,
				"SectionNumber": 2,
				"Capacity": 30,
				"StartTime": "2016-02-03 17:51:28",
				"EndTime": "2017-02-03 17:51:28",
				"Days": "MWF"
			}, {
				"ClassID": 19,
				"CourseID": 1,
				"TermID": 0,
				"SectionNumber": 1,
				"Capacity": 10,
				"StartTime": "2016-02-03 17:51:28",
				"EndTime": "2017-02-03 17:51:28",
				"Days": "MWF"
			}, {
				"ClassID": 20,
				"CourseID": 1,
				"TermID": 0,
				"SectionNumber": 0,
				"Capacity": 10,
				"StartTime": "2016-02-03 17:51:28",
				"EndTime": "2017-02-03 17:51:28",
				"Days": "MWF"
			});

		//Needs to call this
		httpBackend.flush();

		expect($scope.valid).toBe(true);
		expect($scope.response).toEqual({
			"ClassID": 1,
			"CourseID": 1,
			"TermID": 1,
			"SectionNumber": 0,
			"Capacity": 0,
			"StartTime": "",
			"EndTime": "",
			"Days": ""
		}, {
			"ClassID": 2,
			"CourseID": 1,
			"TermID": 1,
			"SectionNumber": 2,
			"Capacity": 30,
			"StartTime": "2016-02-03 17:51:28",
			"EndTime": "2017-02-03 17:51:28",
			"Days": "MWF"
		}, {
			"ClassID": 19,
			"CourseID": 1,
			"TermID": 0,
			"SectionNumber": 1,
			"Capacity": 10,
			"StartTime": "2016-02-03 17:51:28",
			"EndTime": "2017-02-03 17:51:28",
			"Days": "MWF"
		}, {
			"ClassID": 20,
			"CourseID": 1,
			"TermID": 0,
			"SectionNumber": 0,
			"Capacity": 10,
			"StartTime": "2016-02-03 17:51:28",
			"EndTime": "2017-02-03 17:51:28",
			"Days": "MWF"
		});

	}));

});