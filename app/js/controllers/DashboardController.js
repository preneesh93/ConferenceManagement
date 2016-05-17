/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('DashboardController', function($scope,$http,$mdSidenav,$rootScope){
    console.log("inside dashboard controller");
    $scope.isSidenavOpen = false;
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    $scope.update = function(){
      console.log($rootScope.currentUser)
      user=$rootScope.currentUser

      user.first_name="smurf"
      user.last_name="smurf"

      console.log(user)

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
    console.log($rootScope.currentUser)
  });

