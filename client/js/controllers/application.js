
'use strict';

/**
 * @ngdoc function
 * @name maskSwapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the maskSwapApp
 */
angular.module('horrorSwapApp')
  .controller('ApplicationCtrl', function ($scope, AuthService, $location, $anchorScroll) {

     $scope.user = AuthService.user;

    $scope.$watch(
      function(){ return AuthService.user },

      function(newVal) {
        $scope.user = newVal;
      }
    );

      $scope.scrollTo = function(id) {
          var old = $location.hash();
          $location.hash(id);
          $anchorScroll();
          //reset to old to keep any additional routing logic from kicking in
          $location.hash(old);
      };

  });


