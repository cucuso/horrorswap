'use strict';

/**
 * @ngdoc function
 * @name maskSwapApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the maskSwapApp
 */
angular.module('horrorSwapApp')
  .controller('HomeCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
      $scope.mask = {name:"ugly", images: [{url:"dfgdg"},{url:"dd"},{url:"dd"}],
          requests:[{user:"mikeyreques", date:"33", mask:"url"}],
          offers:[{user:"mikeyoffer", date:"323", mask:"url"},{user:"mikeyoffer", date:"323", mask:"url"}],
          accepted:{user:"mikeyaccepted", date:"423", mask:"url1"}};
  });
