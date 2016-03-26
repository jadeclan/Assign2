/**
 * Created by Nolan Walker on 2016-03-14.
 */

app.controller('DashboardController', function($scope, $http){

});

app.controller('booksController', function($scope, $http){
    //$http.get('/employeeDetails')
    //    .success(function(employee) {
    //        console.log(employee);
    //        $scope.employee = employee;
    //    });
});

app.controller('messagesController', function($scope, $http, $mdDialog){
    var alert;
    $scope.showGreeting = showCustomGreeting;
    $scope.hasAlert = function() { return !!alert };

    function showCustomGreeting(contact) {
        console.log(contact);
        $scope.contact = contact;
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: '/views/partials/messagesDialog.tmpl.html',
            controller: function DialogController($scope, $mdDialog) {
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                }
            }
        });
    }
});

app.controller('toDoController', function($scope, $http, $mdDialog){
    $scope.showUpload = showNewToDo;
    function showNewToDo(employee) {
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: '/views/partials/toDoDialog.tmpl.html',
            controller: function DialogController($scope, $mdDialog) {
                // alert('Inside toDoController ' + employee.firstname); //<- this worked
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                };

                $scope.addRecord = AddNewToDo;
                function AddNewToDo(task){
                    newTask = angular.toJson(task);
                    console.log('Got Inside Add Record ' + newTask);
                    alert('json object ' + newTask);
                }
            }
        });
    }

    $scope.updateSelection = changeSelection;
    function changeSelection(){
        angular.forEach($scope.choice, function (item) {
            item.Selected = false;
        });
        $mdDialog.show({
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        templateUrl: '/views/partials/toDoUpdateDialog.tmpl.html',
        controller: function DialogController($scope, $mdDialog) {

            $scope.closeDialog = function() {
                $mdDialog.hide();
            };

            $scope.updateRecord= UpdateOldToDo;
            function UpdateOldToDo(task){
                updatedTask = angular.toJson(task);
                console.log('Got Inside Update Record ' + updatedTask);
                alert('json object ' + updatedTask);
            }
        }
        });
    }

    $scope.deleteSelection = deleteSelection;
    function deleteSelection(t){
        angular.forEach($scope.delChoice, function (item) {
            item.Selected = false;
        });
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: '/views/partials/confirmDeleteDialog.tmpl.html',
            controller: function DialogController($scope, $mdDialog) {

                $scope.closeDialog = function() {
                    $mdDialog.hide();
                };
            }
        });
    }
});

app.controller('newToDoCtrl', function($scope, $http) {
    $scope.date = new Date();
    // retrieve the list of priority types
    $http.get('/priorityList')
        .then(function(response) {
            console.log(response);
            $scope.priorities = response.data;
        });
    // retrieve the list of status types
    $http.get('/statusList')
        .then(function(response){
            $scope.statuses = response.data;
        });
});

app.controller('updateToDoCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.date = new Date();
    // retrieve the list of priority types
    $http.get('/priorityList')
        .then(function(response) {
            $scope.priorities = response.data;
        });
    // retrieve the list of status types
    $http.get('/statusList')
        .then(function(response){
            $scope.statuses = response.data;
        });
}]);

app.controller('deleteCtlr', function($scope, $http) {
    // just need to delete.
    $scope.deleteToDo= DeleteOldToDo;
    function DeleteOldToDo(task){
        taskToDelete = angular.toJson(task);
        console.log('Got Inside Delete Record ' + taskToDelete);
        alert('json object ' + taskToDelete);
    }
});