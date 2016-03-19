/**
 * Created by nwalker on 3/11/16.
 */


/**
 * A module is a collection of services, directives, controllers, filters, and configuration information.
 * angular.module is used to configure the $injector.
 *
 * https://docs.angularjs.org/api/ng/function/angular.module
 */
var app = angular.module('COMP4513',['ui.router', 'ngMaterial', 'satellizer'])

    /**
     * ui.router --> https://scotch.io/tutorials/angular-routing-using-ui-router
     *When creating a link with UI-Router, you will use ui-sref.
     * The href will be generated from this and you want this to point to a certain state of your application.
     * These are created in your app.js.
     */

    .config( function($stateProvider, $urlRouterProvider, $mdThemingProvider){

        $mdThemingProvider.theme('default');

        $urlRouterProvider.otherwise('/login');

        $stateProvider

            /*Login page's state and nested views*/
            .state('login',{
                url:'/login',
                templateUrl: 'views/login.html',
                controller: 'AuthenticationController'
            })

            /*dashboard page's state and nested views*/
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController'
            })

            /*nested view on the dashboard page
             *this will be the about page*/
            .state('dashboard.about', {
                url: '/about',
                templateUrl: 'views/about.html'
                //controller: 'aboutController'
            })

            .state('dashboard.toDo', {
                url: '/toDo',
                templateUrl: 'views/toDo.html',
                controller: 'toDoController'
            })

            .state('dashboard.messages', {
                url: '/messages',
                templateUrl: 'views/messages.html',
                controller: 'messagesController'
            })

            .state('dashboard.books', {
                url: '/books',
                templateUrl: 'views/books.html',
                controller: 'booksController'
            })

            .state('dashboard.documentation', {
                url: '/documentation',
                templateUrl: 'views/documentation.html'
                //controller: 'documentationController'
            })
    }).run(function($rootScope, $state, $stateParams) {

        var fadeIn = false;

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        /*

        // State change event handler
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            var frame, width, height;

            // Bypass event handler (prevents recursion)
            if ($rootScope.stateChangeBypass) {
                $rootScope.stateChangeBypass = false;
                return;
            }

            if (toState.parent != fromState.parent && toState.parent === 'app') {
                // Transition from Splash to App
                frame = $('#frame');

                // Cancel event
                event.preventDefault();

                // 60% x 80% of device
                width = ($(document).width() * 0.6) - frame.width();
                height = ($(document).height() * 0.8) - frame.height();

                frame.animate({
                    left: '-=' + width / 2 + 'px',
                    width: '+=' + width + 'px',
                    height: '+=' + height + 'px'
                }, 1500);

                // Transition after fadeout
                $('#splash').fadeOut(750).promise().done(function () {
                    $rootScope.stateChangeBypass = true;
                    $state.go(toState, toParams);
                    fadeIn = true;
                });
            } else if (toState.name === 'splash' && fromState.parent === 'app') {
                // Transition from App to Splash
                frame = $('#frame');

                // Cancel event
                event.preventDefault();

                // Resize back to 400x600
                width = frame.width() - 392;
                height = frame.height() - 592;

                frame.animate({
                    left: '+=' + width / 2 + 'px',
                    width: '-=' + width + 'px',
                    height: '-=' + height + 'px'
                }, 1500);

                // Transition after fadeout
                $('#app').fadeOut(1000).promise().done(function () {
                    $rootScope.stateChangeBypass = true;
                    $state.go(toState, toParams);
                    fadeIn = true;
                });
            }
        });

        $rootScope.$on('$viewContentLoaded', function (event) {
            if (fadeIn) {
                // this works due to #splash and #app never being loaded at the same time...
                // one call will simply do nothing
                $('#app').hide().fadeIn(750);
                $('#splash').hide().fadeIn(500);

                fadeIn = false;
            }
        })
        */
    });