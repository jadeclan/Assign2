/**
 * Created by Nolan Walker on 2016-03-14.
 */


/**
 * TODOpage CONTROLLER
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
    }

    $scope.updateSelection = function changeSelection(updateTask){
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

                $scope.updateRecord = function UpdateOldToDo(updateTask, updateToDo){
                    if (updateToDo.$invalid) { return; }

                    $http.put('/updateToDo/', {task: updateTask})
                        .success(function(employee) {
                            $scope.employee = employee;
                            $scope.closeDialog();
                        })
                        .error(function(err) {
                            alert("failed post");
                        });
                }
            }
        });
    }

    $scope.deleteSelection = function deleteSelection(deleteTask){
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
        // Get the right date format
        newTask.date = $filter('date')(newTask.date, 'M/d/yyyy');

        $http.put('/todo', {task: newTask})
            .success(function(employee) {
                $scope.employee = employee;
                $scope.closeDialog();
            })
            .error(function(err) {
                alert("failed post");
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
            .success(function(employee) {
                $scope.employee = employee;
                $scope.closeDialog();
            })
            .error(function(err) {
                alert("Delete Error Thrown");
            });
    }
});