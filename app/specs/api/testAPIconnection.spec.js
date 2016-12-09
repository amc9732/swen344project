/*

  NOTE: This is just an example, which just tests the connection to the API.
    More robust tests should be added as modules are developed, probably to
    a folder within app/specs/api/xxxxx

*/
describe('The Example API Modules HTTP call', function () {

  var httpBackend;

  beforeEach(inject(function (_$httpBackend_) {
    httpBackend = _$httpBackend_;
  }));

  it('should return a status of 200', inject(function($http) {
    
    var $scope = {};

    /* ACTUAL CODE BEING TESTED */
    $http.get('http://localhost:1337/vm344e.se.rit.edu/api/User.php?action=get_all_users')
      .success(function(data, status, headers, config) {
        $scope.valid = true;
        $scope.response = data;
      })
      .error(function(data, status, headers, config) {
        $scope.valid = false;
    });

    //Mock reponse
    httpBackend
      .when('GET', 'http://localhost:1337/vm344e.se.rit.edu/api/User.php?action=get_all_users')
      .respond(200, { foo: 'bar' });

    //Needs to call this
    httpBackend.flush();

    expect($scope.valid).toBe(true);
    expect($scope.response).toEqual({ foo: 'bar' });

  }));

});