/**
 * Created by Giri on 5/10/2016.
 */
angular.module('cms')
  .controller('LoginController',['$scope','$http','$state', 'md5',function($scope,$http,$state,md5){
    console.log("inside login controller")
    $scope.login = function () {
    $scope.user.password=md5.createHash($scope.user.password);
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
            $state.go('dashboard')
          }
          else{

          }
        },
        function(response){ //Error callback
          console.log(response)
        }
      );

  }
}]);

