/**
 * Created by Girish on 5/9/2016.
 */
'use strict';

/**
 * @ngdoc overview
 * @name cms
 * @description
 * # cms
 *
 * Main module of the application.
 */
angular
  .module('cms', [
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'routes',
    'ui.bootstrap',
    'ngFileUpload',
    'ngMd5'
  ]).constant('config', {
    conference_name:"cms"
  }).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
  }).service('authService',['$http','$q',function($http,$q) {
    var service = {}
    service.auth = function (token,name) {
      return $http.post('/api/auth',{username:name})
    }
    return service
  }]).service('userService',['$http','$window','$rootScope','authService',function($http,$window,$rootScope,authService) {
    var service = {}
    service.currentUser = function () {
      if ($window.localStorage.token && $window.localStorage.username){
        var req = {method:'get',url:"/api/user/user-details",params:{username:$window.localStorage.username}};
        return $http(req)
      }
      else { console.log("something is wrong ")}
    }
    return service
  }]).run(['$http','$window','$rootScope','$state','authService', function($http,$window,$rootScope,$state,authService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      $http.defaults.headers.common['Authorization'] =  'Bearer ' + $window.localStorage.token;
      $rootScope.username=$window.localStorage.username
    });
  }]);