/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('HomeController', function($http,$rootScope){
    var req = {
      method: 'get',
      url: "/api/user/user-details",
      params: {username: $rootScope.username}
    };
    if($rootScope.username != undefined && $rootScope.username != null)
      { 
      $http(req).then(function (result) {
        console.log(result)
      })
    }

  });

