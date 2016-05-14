/**
 * Created by Smurf on 5/13/2016.
 */
angular.module('cms').controller('RegistrationController', function($scope, $http){
  console.log("inside registration controller")
  $scope.register = function () {
    console.log($scope.user)


    var req = {
      method: 'POST',
      url: "/api/user/register",
      body: $scope.user
    };

    // Send it
    $http(req)
      .then(
        function(response){ // Success callback
          console.log(response)
        },
        function(response){ //Error callback
          console.log(response)
        }
      );

  }
});