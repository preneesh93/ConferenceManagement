/**
 * Created by Smurf on 5/10/2016.
 */
angular.module('cms').controller('LoginController', function($scope, $http){
  console.log("inside login controller")
  $scope.login = function () {
    console.log($scope.user)

    var req = {
      method: 'get',
      url: "/api/user/login",
      params: {username:$scope.user.username,password:$scope.user.password}
    };

    // Send it
    $http(req)
      .then(
        function(response){ // Success callback
          console.log(response)
          if(response.data.isAuthenticated==1){
            $scope.msg="logged in successfully"
          }
        },
        function(response){ //Error callback
          console.log(response)
        }
      );

  }
});

