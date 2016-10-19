it('should grab the JSON object successfully', inject(function($http) {

    var $scope = {};

    // get the data
    $http.get('https://jsonplaceholder.typicode.com/posts/1')
        .success(function(data, status, headers, config) {
            $scope.testData = data;
        });

    $httpBackend
        .when('GET', function(url) {
            return url.indexOf('http://localhost/') !== -1;
        })

    .respond(200, { data: 'value' });


    $httpBackend.flush();

    expect($scope.fooData).toEqual({ data: 'value' });
    expect($scope.barData).toEqual({ data: 'value' });

}));