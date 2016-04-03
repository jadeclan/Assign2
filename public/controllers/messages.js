/**
 * Created by Nolan Walker on 2016-03-14.
 */

app.controller('messagesController', function($scope, $http, $mdDialog){

    // Need to convert the messages date to a date object
    $scope.sortDate = function(e) {
        var date = new Date(e.date);
        return date;
    };

    $scope.showGreeting = showCustomGreeting;
    function showCustomGreeting(contact) {
        console.log(contact);
        $scope.contact = contact;
        $mdDialog.show({
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            templateUrl: '/views/partials/messagesDialog.tmpl.html',
            controller: function DialogController($scope, $mdDialog) {

                $scope.map = { center: { latitude: $scope.contact.latitude, longitude: $scope.contact.longitude }, zoom: 8 };
                $scope.marker = {
                    id: 0,
                    coords: {
                        latitude: $scope.contact.latitude,
                        longitude: $scope.contact.longitude
                    }
                };
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                }
            }
        });
    }
});

