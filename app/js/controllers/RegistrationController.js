/**
 * Created by Giri on 5/13/2016.
 */
angular.module('cms').controller('RegistrationController', function($scope,$http,md5){
  console.log("inside registration controller")
  $scope.register = function () {
    $scope.user.password=md5.createHash($scope.user.password);
    console.log($scope.user)
    $scope.data=JSON.stringify($scope.user)
    var req = {
      method: 'post',
      url: "api/user/register",
      data: $scope.data
    };
    // Send it
    $http(req)
      .then(
        function(response){ // Success callback
          console.log(response);
          if(response.data._id){
            $scope.success=true;
          }
        },
        function(response){ //Error callback
          console.log(response)
        }
      );

  }
});

