/**
 * Created by Nolan Walker on 2016-03-14.
 */


/**
 * TODO page CONTROLLER
 */
app.controller('toDoController', function($scope, $http, $mdDialog){
    var newTask ="";
    // setting default date sort for the to do list
    $scope.sortField='date';

    $scope.newToDo = function showNewToDo(employee) {
        $scope.employee = employee;
        // Create new To Do array and populate default fields
        $scope.newTask = {
            description: "",
            date: new Date(),
            priority: "low",
            status: "pending"
        };

        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: '/views/partials/toDoDialog.tmpl.html',
            controller: function DialogController($scope, $mdDialog) {
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                };
            }
        });
    };

    $scope.updateSelection = function changeSelection(updateTask){

        $scope.updateTask = angular.copy(updateTask);
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: '/views/partials/toDoUpdateDialog.tmpl.html',
            controller: function DialogController($scope, $mdDialog) {
                $scope.updateTask.date = new Date($scope.updateTask.date);

                $scope.closeDialog = function() {
                    $mdDialog.hide();

                    $scope.updateTask.updateSelected = false;
                    //$scope.task = angular.copy(updateTask);
                };

                $scope.updateRecord = function UpdateOldToDo(updateTask, updateToDo){
                    if (updateToDo.$invalid) { return; }

                    $http.put('/updateToDo/', {task: updateTask})
                        .success(function(todo) {
                            angular.copy(todo, $scope.employee.todo);
                        })
                        .error(function(err) {
                            alert("failed to make your changes SORRY - will reload the page");
                        })
                        .finally(function(){
                            $scope.closeDialog();
                        });
                }
            },
            onRemoving: function() {
                updateTask.updateSelected = false;
            }
        });
    };

    $scope.deleteSelection = function deleteSelection(deleteTask){
        $scope.deleteTask = angular.copy(deleteTask);
        $scope.deleteTask.date = new Date($scope.deleteTask.date);
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


/**
 * CREATE CONTROLLER
 */
app.controller('newToDoCtrl', function($scope, $http, $filter) {
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

    $scope.addRecord = function AddNewToDo(newTask, newToDo){
        if (newToDo.$invalid) { return; }

        $http.put('/todo', {task: newTask})
            .success(function(todo) {
                angular.copy(todo, $scope.employee.todo);
            })
            .error(function(err) {
                alert("failed to add your new to do SORRY - Reloading page");
            })
            .finally(function(){
                $scope.closeDialog();
            });
    }
});

/**
 * UPDATE CONTROLLER
 */

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


/**
 * DELETE CONTROLLER
 */
app.controller('deleteCtlr', function($scope, $http, $state) {
    // just need to delete.
    $scope.deleteToDo = function DeleteOldToDo(taskToDelete){

        $scope.taskToDelete = taskToDelete;

        $http.delete('/todo/' + taskToDelete.id)
            .success(function(todo) {
                angular.copy(todo, $scope.employee.todo);
            })
            .error(function(err) {
                alert("Delete Error Thrown - nothing deleted, reloading the page");
            })
            .finally(function(){
                $scope.closeDialog();
            })
    }
});