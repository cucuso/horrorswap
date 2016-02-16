'use strict';

angular
  .module('horrorSwapApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFileUpload'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      }) 
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl',
        controllerAs: 'signup'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service( 'AuthService', function($http,$q) {
    var self = this;
    this.user = window.user;

    this.logout = function(){
      $http.post('/logout');
    };


    this.login = function(credentials){
        var deferred = $q.defer();
      $http.post('/login', credentials).then(function(res){
          self.user = res;
          deferred.resolve();
      });
        return deferred.promise;
    };

    this.signup = function(credentials){
 var deferred = $q.defer();
      $http.post('/signup', credentials.then(function(res){

        self.user = res;
        deferred.resolve();
      }))
        return derred.promise;
    };
  });
