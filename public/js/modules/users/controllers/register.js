(function() {
    'use strict';
    angular.module('chatApp.users')
        .controller('RegisterCtrl', ['$rootScope','$scope','$state','AuthService',function($rootScope,$scope,$state,AuthService) {


            $scope.init = function () {
                $scope.credentials = {name: "",surname :"",email: "", password: ""};
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

            $scope.register = function() {

                $scope.resetError();
                $scope.disableBtn();
                AuthService.register($scope.credentials).then(function (response) {

                    var data = response.data;

                    if(data.success){

                        $rootScope.currentUser = {
                            id : data.data.id,
                            email : data.data.email,
                            password : data.data.password
                        } ;
                        localStorage.setItem('user', JSON.stringify($rootScope.currentUser));
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