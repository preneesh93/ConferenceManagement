/**
 * Created by Preneesh on 05-06-2016.
 */
angular.module('cms').controller('ResetController', function($scope,$http){
  console.log("Reset Controller!");
  $scope.checkToken = function() {
    var req = {
      method:'get',
      url:"/reset/:token"
    };
    console.log(user);
    $http(req).then(function (response) {
      console.log(response);
    }, function(error){
      console.error('Error: '+error);
    })
  };
});