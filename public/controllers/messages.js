/**
 * Created by Nolan Walker on 2016-03-14.
 */

app.controller('messagesController', function($scope, $http, $mdDialog){
    var alert;

    // Need to convert the messages date to a date object
    $scope.sortDate = function(e) {
        var date = new Date(e.date);
        return date;
    };

    $scope.showGreeting = showCustomGreeting;
    $scope.hasAlert = function() { return !!alert };
    //$scope.addMessage = addNewMessage;
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

    //function addNewMessage(){
    //    $mdDialog.show({
    //        clickOutsideToClose: true,
    //        scope: $scope,
    //        preserveScope: true,
    //        templateUrl: '/views/partials/newMessageDialog.tmpl.html',
    //        controller: function DialogController($scope, $mdDialog) {
    //            $scope.closeDialog = function() {
    //                $mdDialog.hide();
    //            }
    //        }
    //    });
    //}
});

/*app.controller('newMessageCtrl', function($scope, $http, $filter) {
    $scope.date = new Date();

    $scope.addNewMessage = function(newMessage){

        $scope.createMessage = {
            contact: {
                firstname: newMessage.messageFirst,
                lastname: newMessage.messageLast,
                university: {
                    name: newMessage.university,
                    address: newMessage.uniAddress,
                    city: newMessage.uniCity,
                    state: newMessage.uniState,
                    zip: newMessage.uniZip,
                    website: newMessage.website,
                    latitude: 0,
                    longitude: 0
                },
                date: $filter('date')(newMessage.date, 'M/d/yyyy'),
                category: newMessage.category,
                content: newMessage.message
            }
        };

        console.log($scope.createMessage);

        //if (newMessage.$invalid) { return; }
        $http.post('/messages', {message: $scope.createMessage})
            .success(function(employee) {
                $scope.employee = employee;
            })
            .error(function(err) {
                alert("failed post");
            });

    }
});*/
