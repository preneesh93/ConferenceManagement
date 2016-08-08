/**
 * Created by Girish on 5/24/2016.
 */
angular.module('cms')
  .controller('NavigationController', function($scope,$mdSidenav, $rootScope, $window,$state,$interval){
    if($window.localStorage.token){
      $rootScope.isAuthenticated=true
    }
    $scope.isSidenavOpen = false;
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    var tick = function() {
      $scope.clock = Date.now();
    }
    tick();
    $interval(tick, 1000);
    
    $scope.logout=function () {
      $rootScope.isAuthenticated=false;
      $window.localStorage.clear();
      $state.go('home')
    }
  
    $scope.edit= function () {
      $state.go('')
    }
  });

