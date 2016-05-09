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
    'ngRoute',
    'menu',
    'routes'
  ])
  .controller('HomeController',function ($scope) {
  console.log("home controller is called");
  $scope.text = "this is angular test";

});

