(function() {
    'use strict';

    angular.module('chatApp.users')
        .service("AuthService",['$rootScope','$http',function ($rootScope,$http) {

            var vm = this;
            vm.login = function(credentials){
                 return $http.get($rootScope.baseUrl+'users/login',{ params : credentials});
            };

            vm.register = function(credentials){

                return $http({
                    method: 'POST',
                    url: $rootScope.baseUrl+'users/register',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: 'name='+credentials.name+'&surname='+credentials.surname+'&email='+credentials.email+'&password='+credentials.password
                });
            };

        }]);
})();