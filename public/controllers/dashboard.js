/**
 * Created by Nolan Walker on 2016-03-14.
 */

app.controller('DashboardController', function($scope, $http){

    $http.get('/employeeDetails')
        .success(function(employee) {
            console.log(employee);
            $scope.employee = employee;
        });
});

app.controller('booksController', function($scope, $http){
    //$http.get('/employeeDetails')
    //    .success(function(employee) {
    //        console.log(employee);
    //        $scope.employee = employee;
    //    });
});