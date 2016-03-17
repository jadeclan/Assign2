/**
 * Created by nwalker on 3/11/16.
 */

app.controller('AuthenticationController', function($scope, $location, $auth){

    $scope.showLogin = true;

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function() {
                    $location.path('/dashboard');
                })
                .catch(function(res) {
                    console.log(res);
                });
        };

        $scope.login = function() {
            $auth.login($scope.employee)
                .then(function() {
                    $location.path('/dashboard');
                })
                .catch(function() {
                    $("#login").effect('shake');
                });
        };

    })

    .controller('LogoutController', function($location, $auth) {
        if (!$auth.isAuthenticated())
            $location.path('/login');

        $auth.logout()
            .then(function() {
                $location.path('/login');
            });
});