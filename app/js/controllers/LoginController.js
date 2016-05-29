/**
 * Created by Giri on 5/10/2016.
 */
angular.module('cms')
  .controller('LoginController',['$scope','$http','$state', 'md5','$rootScope', function($scope,$http,$state,md5,$rootScope){
    console.log("inside login controller")
    $rootScope.currentUser={}
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

            $state.go('dashboard',{user:$scope.user})
   
        },
        function(response){ //Error callback
          console.log(response)
        }
      );

  }
}]);

