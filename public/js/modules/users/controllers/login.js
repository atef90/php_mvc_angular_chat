(function() {
    'use strict';
    angular.module('chatApp.users')
        .controller('LoginCtrl', ['$rootScope','$scope','AuthService','$state',function($rootScope,$scope,AuthService,$state) {

            $scope.init = function () {
                $scope.credentials = {email: "", password: ""};
                $scope.loginError      = false;
                $scope.loginErrorText  = "";
                $scope.disableSubmitBtn  = false;
            };

            $scope.init();

            $scope.disableBtn= function () {
                $scope.disableSubmitBtn  = true;
            };

            $scope.enableBtn= function () {
                $scope.disableSubmitBtn  = false;
            };

            $scope.resetError = function () {
                $scope.loginError      = false;
                $scope.loginErrorText  = "";
            };

            $scope.login = function() {

                $scope.resetError();
                $scope.disableBtn();
                AuthService.login($scope.credentials).then(function (response) {

                    var data = response.data;

                    if(data.success){

                        $rootScope.currentUser = {
                            id : data.data.id,
                            email : data.data.email,
                            password : data.data.password
                        } ;
                        localStorage.setItem('user', JSON.stringify($rootScope.currentUser));
                        $state.go('chatRoom');
                    }else{
                        $scope.loginError     = true;
                        $scope.loginErrorText =  data.errorMsg;
                    }
                },function (error) {
                    $scope.loginError     = true;
                    $scope.loginErrorText =  "something went wrong";
                });

                $scope.enableBtn();
            };
        }]);

})();