/**
 * Created by Giri on 5/10/2016.
 */
angular.module('cms')
  .controller('LoginController',['$scope','$http','$state', 'md5','$window','$rootScope', function($scope,$http,$state,md5,$window,$rootScope){
    console.log("inside login controller")
    $window.localStorage.clear();
    $scope.user={}
    $scope.user.username='anna'
    $scope.user.password='anna'
    $scope.login = function () {
    $scope.user.password=md5.createHash($scope.user.password);
    console.log($scope.user)

    var req = {
      method: 'get',
      url: "/api/user/login",
      params: {username:$scope.user.username,password:$scope.user.password}
    };

    // send credentials
    $http(req)
      .then(
        function(response){ // Success callback
          console.log(response)
          $window.localStorage.token=response.data.token;
          $window.localStorage.username=$scope.user.username;

          $rootScope.isAuthenticated=response.data.isAuthenticated

          if(response.data.isAuthenticated==true){
            $state.go('home')
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

