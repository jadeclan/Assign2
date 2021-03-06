/**
 * Created by nwalker on 3/11/16.
 */


/**
 * A module is a collection of services, directives, controllers, filters, and configuration information.
 * angular.module is used to configure the $injector.
 *
 * https://docs.angularjs.org/api/ng/function/angular.module
 */
var app = angular.module('COMP4513',['ui.router', 'ngMaterial', 'satellizer', 'uiGmapgoogle-maps'])

    /**
     * ui.router --> https://scotch.io/tutorials/angular-routing-using-ui-router
     *When creating a link with UI-Router, you will use ui-sref.
     * The href will be generated from this and you want this to point to a certain state of your application.
     * These are created in your app.js.
     */

    .config( function($stateProvider, $urlRouterProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider){

        $mdThemingProvider.theme('default');

        $urlRouterProvider.otherwise('/login');

        $stateProvider

            /*Login page's state and nested views*/
            .state('login',{
                url:'/login',
                templateUrl: 'views/login.html',
                controller: 'AuthenticationController'
            })

            .state('logout', {
                url: '/logout',
                controller: 'LogoutController'
            })

            .state('app', {
                abstract: true,
                templateUrl: 'views/app.html',
                resolve: {
                    loginRequired: function($q, $auth, $state){
                        var deferred = $q.defer();
                        if ($auth.isAuthenticated()){
                            deferred.resolve();
                        }else{
                            $state.go('login');
                            deferred.reject();
                        }
                        return deferred.promise;
                    }
                },
                controller: function($scope, $http) {
                    $http.get('/employeeDetails')
                        .success(function(employee) {
                            $scope.employee = employee;
                        });
                }
            })

            /*dashboard page's state and nested views*/
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    '': {
                        templateUrl: 'views/dashboard.html'
                    },
                    'toDo@app.dashboard': {
                        templateUrl: 'views/toDo.html',
                        controller: 'toDoController'
                    },
                    'messages@app.dashboard': {
                        templateUrl: 'views/messages.html',
                        controller: 'messagesController'
                    },
                    'books@app.dashboard': {
                        templateUrl: 'views/books.html',
                        controller: 'booksController'
                    }
                }
            })

            .state('app.documentation', {
                url: '/documentation',
                templateUrl: 'views/documentation.html'
                //controller: 'documentationController'
            })

            /*nested view on the dashboard page
             *this will be the about page*/
            .state('app.about', {
                url: '/about',
                templateUrl: 'views/about.html'
                //controller: 'aboutController'
            })

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyCId0Q2FUMjLkN40W5Rl2qaUXACu_uaY5M',
            //v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });

    }).run(function($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // State change event handler
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            // Bypass event handler (prevents recursion)
            if ($rootScope.stateChangeBypass) {
                $rootScope.stateChangeBypass = false;
                return;
            }

            if (toState.name != fromState.name && toState.name === 'dashboard') {
                // Cancel event
                event.preventDefault();

                // Transition after fadeout
                $('#splash').fadeOut(750).promise().done(function () {
                    $rootScope.stateChangeBypass = true;
                    $state.go(toState, toParams);
                });

            }
        });
    });