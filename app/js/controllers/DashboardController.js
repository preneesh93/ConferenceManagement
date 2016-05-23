/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('DashboardController', function($scope,$http,$mdSidenav,$window,$state){
    console.log("inside dashboard controller");
    $scope.isSidenavOpen = false;
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    console.log($window.localStorage)

    $scope.logout=function () {
      $window.localStorage.clear();
      $state.go('home')
    }
  });

