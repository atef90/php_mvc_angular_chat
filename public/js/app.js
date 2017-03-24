(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('chatApp', [
        'ui.router',
        'chatApp.users',
        'chatApp.chat',
    ])
    .run(function ($rootScope,$state) {

        $rootScope.baseUrl = $('.baseUrl').text();
        $rootScope.currentUser = JSON.parse(localStorage.getItem('user'));



        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams, error) {

                if ($rootScope.currentUser && toState.name === "login" ) {
                    event.preventDefault();
                    $state.go('chatRoom');
                }

                if ($rootScope.currentUser && toState.name === "register" ) {
                    event.preventDefault();
                    $state.go('chatRoom');
                }
                var requiredLogin = false;
                // check if this state need login
                if (toState.data && toState.data.requiredLogin)
                    requiredLogin = true;

                // if yes and if this user is not logged in, redirect him to login page
                if (requiredLogin && !$rootScope.currentUser) {
                    event.preventDefault();
                    $state.go('login');
                }
            });


        $rootScope.logout = function() {
            localStorage.removeItem('user');
            $rootScope.currentUser = null;
            $state.go('login');
        };

    });
})();
