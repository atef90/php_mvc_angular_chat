(function() {
    'use strict';

    angular.module('chatApp.users')

        .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url: '/users/login',
                    templateUrl: 'js/modules/users/templates/login.html',
                    controller :'LoginCtrl'
                })
                .state('register', {
                    url: '/users/register',
                    templateUrl: 'js/modules/users/templates/register.html',
                    controller :'RegisterCtrl'
                });

            $urlRouterProvider.otherwise('/users/login');
        }]);
})();