'use strict';

/**
 * @ngdoc overview
 * @name maskSwapApp
 * @description
 * # maskSwapApp
 *
 * Main module of the application.
 */
angular
  .module('horrorSwapApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
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
  });
