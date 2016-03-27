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
    var newTask ="";

    $scope.newToDo = showNewToDo;
    function showNewToDo(employee) {
        $scope.employee = employee;
        // Create new To Do array and populate default fields
        var newTask = {};
        newTask.date = new Date();
        newTask.priority = "low";
        newTask.status = "pending";
        $scope.newTask = newTask;
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: '/views/partials/toDoDialog.tmpl.html',
            controller: function DialogController($scope, $http, $mdDialog) {
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                };

                $scope.addRecord = AddNewToDo;
                function AddNewToDo(newTask){
                    $scope.newTask = newTask;
                    //if(!newTask.description || newTask.description === '') { return; }
                    newTask = angular.toJson(newTask);
                    console.log(newTask);
                    $http.post('/todo', {task: newTask})
                        .success(function(employee) {
                            $scope.employee = employee;
                        })
                        .error(function(err) {

                        });

                    // console.log('Got Inside Add Record ' + newTask);
                    // alert('json object ' + newTask);
                }
            }
        });
    }

    $scope.updateSelection = changeSelection;
    function changeSelection(updateTask){

        updateTask.date = new Date(updateTask.date);
        $scope.updateTask = updateTask;
        $mdDialog.show({
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        templateUrl: '/views/partials/toDoUpdateDialog.tmpl.html',
        controller: function DialogController($scope, $mdDialog) {

            $scope.closeDialog = function() {
                $mdDialog.hide();
                $scope.updateTask.updateSelected = false;
            };

            $scope.updateRecord= UpdateOldToDo;
            function UpdateOldToDo(newTaskUpdate){
                updatedTask = angular.toJson(newTaskUpdate);
                console.log('Got Inside Update Record ' + updatedTask);
                alert('json object ' + updatedTask);
            }
        }
        });
    }

    $scope.deleteSelection = deleteSelection;
    function deleteSelection(deleteTask){
        $scope.deleteTask = deleteTask;
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: '/views/partials/confirmDeleteDialog.tmpl.html',
            controller: function DialogController($scope, $mdDialog) {

                $scope.closeDialog = function() {
                    $mdDialog.hide();
                    $scope.deleteTask.deleteSelected = false;
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