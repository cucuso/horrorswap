'use strict';


angular.module('horrorSwapApp')
  .controller('SignUpCtrl', function ($scope, AuthService, $location) {

    $scope.credentials  = {email:'', password:''};


    $scope.submit= function(credentials){

      if(credentials){
        console.log('logging in user: ' + $scope.credentials);
        AuthService.login($scope.credentials).then(function(){
            if(AuthService.user != null) {
                $location.path("home");}
        });
        $scope.credentials  = {email:'', password:''};

      }
    }
  });
