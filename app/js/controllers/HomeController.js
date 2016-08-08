/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('HomeController', function($http,$rootScope,$scope,authService,$window){
    var req = {
      method: 'get',
      url: "/api/user/user-details",
      params: {username: $rootScope.username}
    };
    authService.auth($window.localStorage.token,$window.localStorage.username).then(function (auth) {
      $rootScope.isAuthenticated=auth
    })
    if($rootScope.username != undefined && $rootScope.username != null)
      {
      $http(req).then(function (result) {
        console.log(result)
        if(result.data.roles.chair){
          $scope.isChair=true;
          console.log("yes chair")
        }
      })
    }

  });

