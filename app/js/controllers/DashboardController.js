/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('DashboardController', function($state,$scope,$http,$mdSidenav,$rootScope,$stateParams){
    console.log("inside dashboard controller");
    console.log($stateParams.user)
    $scope.isSidenavOpen = false;
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    $scope.edit = function(){
      $state.go('update',{user:$stateParams.user})
    }
    $scope.update = function(){



      var req = {
        method: 'post',
        url: "/api/user/update",
        params: user
      };

      // Send it
      $http(req)
        .then(
          function(response) { // Success callback
          console.log(response)
          }
        )

    };
  });

