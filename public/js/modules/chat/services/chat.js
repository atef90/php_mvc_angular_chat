(function() {
    'use strict';

    angular.module('chatApp.chat')
        .service("chatService",['$rootScope','$http',function ($rootScope,$http) {

            var vm = this;
            vm.getConnectedUsers = function(email){
                return $http.get($rootScope.baseUrl+'users/connectedUsers',{ params : { "email" : email}});
            };

            vm.getMsgs = function(receiver,sender){
                return $http.get($rootScope.baseUrl+'users/getMsgs',{ params : { "receiver" : receiver ,sender :sender}});
            };

            vm.sendMsg = function(receiver,sender,body){
                return $http({
                    method: 'POST',
                    url: $rootScope.baseUrl+'users/sendMsg',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: 'receiver='+receiver+'&sender='+sender+'&body='+body
                });

            };
        }]);
})();