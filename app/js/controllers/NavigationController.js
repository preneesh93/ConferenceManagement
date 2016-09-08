/**
 * Created by Girish on 5/24/2016.
 */
angular.module('cms')
  .controller('NavigationController', function($scope, $rootScope, $window,$state,$mdSidenav,$mdMedia){
    $scope.hide = function () {
      return $mdMedia('gt-md')
    }
    $scope.toggleLeft = function () {
      console.log("toggling")
        // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left')
        .toggle()
        .then(function () {
          console.log("toggle is done");
        });

    }
    $scope.logout=function () {
      $rootScope.isAuthenticated=false;
      $window.localStorage.clear();
      $state.go('login')
    }
  
    $scope.edit= function () {
      $state.go('')
    }
  });

