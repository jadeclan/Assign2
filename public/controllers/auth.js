/**
 * Created by nwalker on 3/11/16.
 */

app

    .controller('AuthenticationController', function($scope, $state, $auth){

        $scope.showLogin = true;

        // this is for google/facebook/twitter etc OAUTH (remove? we could show off and implement)
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function() {
                    $state.go('app.dashboard');
                })
                .catch(function(res) {
                    console.log(res);
                });
        };

        $scope.login = function() {
            $auth.login($scope.employee)
                .then(function(token) {
                    //$auth.setToken(token);
                    $state.go('app.dashboard');
                })
                .catch(function() {
                    $("#splash").effect('shake');
                });
        };

    })


    .controller('LogoutController', function($state, $auth) {
        if (!$auth.isAuthenticated())
            $state.go('login');

        $auth.logout()
            .then(function() {
                $state.go('login');
            });
    });