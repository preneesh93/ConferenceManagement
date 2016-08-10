/**
 * Created by Girish on 5/24/2016.
 */
angular.module('cms')
  .controller('NavigationController', function($scope, $rootScope, $window,$state){

    $scope.logout=function () {
      $rootScope.isAuthenticated=false;
      $window.localStorage.clear();
      $state.go('login')
    }
  
    $scope.edit= function () {
      $state.go('')
    }
  });

