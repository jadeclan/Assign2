/**
 * Created by nwalker on 3/11/16.
 */


/**
 * A module is a collection of services, directives, controllers, filters, and configuration information.
 * angular.module is used to configure the $injector.
 *
 * https://docs.angularjs.org/api/ng/function/angular.module
 */
var app = angular.module('COMP4513',['ui.router'])

    /**
     * ui.router --> https://scotch.io/tutorials/angular-routing-using-ui-router
     *When creating a link with UI-Router, you will use ui-sref.
     * The href will be generated from this and you want this to point to a certain state of your application.
     * These are created in your app.js.
     */

    .config( function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/auth');

        $stateProvider

            /*Login page's state and nested views*/
            .state('login',{
                url:'/login',
                templateUrl: 'views/auth.html',
                controller: 'AuthenitcationController',
            })

            /*dashboard page's state and nested views*/
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html'
            })

            /*nested view on the dashbard page*/
            .state('dashobard.about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: function($scope, $http){

                }
            })
    });
