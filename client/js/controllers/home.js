'use strict';


angular.module('horrorSwapApp')
  .controller('HomeCtrl', function ($scope, Upload, $timeout) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
        'ngFileUpload'
    ];


      $scope.uploadFiles = function(files, errFiles) {
          $scope.files = files;
          $scope.errFiles = errFiles;
          angular.forEach(files, function(file) {
              file.upload = Upload.upload({
                  url: '/upload',
                  data: {image: file}
              });

              file.upload.then(function (response) {
                  $timeout(function () {
                      file.result = response.data;
                  });
              }, function (response) {
                  if (response.status > 0)
                      $scope.errorMsg = response.status + ': ' + response.data;
              }, function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 *
                      evt.loaded / evt.total));
              });
          });
      }

      $scope.mask = {name:"ugly", images: [{url:"dfgdg"},{url:"dd"},{url:"dd"}],
          requests:[{user:"mikeyreques", date:"33", mask:"url"}],
          offers:[{user:"mikeyoffer", date:"323", mask:"url"},{user:"mikeyoffer", date:"323", mask:"url"}],
          accepted:{user:"mikeyaccepted", date:"423", mask:"url1"}};
  });
