/**
 * Created by Girish on 5/24/2016.
 */
angular.module('cms')
  .controller('NavigationController', function($scope,$mdSidenav, $rootScope, $window,$state){
    console.log("inside nav controller");
    if($window.localStorage.token){
      $rootScope.isAuthenticated=true
    }
    $scope.isSidenavOpen = false;
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };

    console.log($window.localStorage.username)
    
    $scope.logout=function () {
      $rootScope.isAuthenticated=false;
      $window.localStorage.clear();
      $state.go('home')
    }

  });

