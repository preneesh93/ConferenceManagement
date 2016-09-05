/**
 * Created by Giri on 5/13/2016.
 */
angular.module('cms').controller('RegistrationController', function($scope,$http,md5){
  $scope.validate = function (user) {
    if(!user){return true}
    if(!user.username){return true}
    if(!user.email){return true}
    if(!user.password){return true}
  }
  $scope.register = function () {
    $scope.user.roles={author:true}
    $scope.user.password=md5.createHash($scope.user.password);
    console.log($scope.user)
    $scope.data=JSON.stringify($scope.user)
    var req = {
      method: 'post',
      url: "/user/register",
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
          $scope.error=response.data
        }
      );

  }
});