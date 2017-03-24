(function() {
    'use strict';
    angular.module('chatApp.chat')
        .controller('chatCtrl', ['$rootScope','$scope','chatService',function($rootScope,$scope,chatService) {

            $scope.init = function () {
                $scope.users = [];
                $scope.msgs = [];
                $scope.receiver = "";
            };

            $scope.init();

            $scope.getConnectedUsers = function() {

                chatService.getConnectedUsers($rootScope.currentUser.email).then(function (response) {

                     var data = response.data;

                    if(data.success){
                        $scope.users = data.data;
                        $scope.initMsgs();

                    }
                },function (error) {

                });
            };

            $scope.getConnectedUsers();

            $scope.initMsgs = function(){
               if($scope.users.length > 0){
                   var user = $scope.users[0];
                   $scope.loadMsgs(user.id);
               }
            };


            $scope.loadMsgs = function (userId) {

                $scope.receiver = userId;
                chatService.getMsgs($rootScope.currentUser.id ,userId).then(function (response) {

                    var data = response.data;
                    if(data.success){
                        $scope.msgs = data.data;

                    }
                },function (error) {

                });
            };

            $scope.getClass =function (receiver) {

                if(!$rootScope.currentUser)
                    return '';
                if(receiver === $rootScope.currentUser.id)
                    return 'pull-left';
                else
                    return 'pull-right';
            };


            $scope.sendMsg =function (e) {
              e.preventDefault();

              if($scope.msgBody !== ""){

                  chatService.sendMsg( $scope.receiver,$rootScope.currentUser.id ,$scope.msgBody).then(function (response) {

                      var data = response.data;

                      if(data.success){
                          $scope.msgBody = "";
                          $scope.msgs.push( data.data);
                      }
                  },function (error) {

                  });
              }
            }
        }]);

})();