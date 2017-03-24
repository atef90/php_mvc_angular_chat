(function() {
    'use strict';

    angular.module('chatApp.chat')

        .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
            $stateProvider
                .state('chatRoom', {
                    url: '/chatroom',
                    templateUrl: 'js/modules/chat/templates/chat.html',
                    controller :'chatCtrl',
                    data: {requiredLogin: true}
                })
                ;
        }]);
})();