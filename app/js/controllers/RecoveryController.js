/**
 * Created by Preneesh on 05-06-2016.
 */
angular.module('cms').controller('RecoveryController', function($scope,$http,md5){
  console.log("Recovery Controller!");
  $scope.recover = function(user) {
    var req = {
      method:'post',
      url:"api/user/recovery",
      data: user
    };
    console.log(user);
    $http(req).then(function (result) {
      console.log(result);
    }, function(error){
      console.error('Error: '+error);
    })
  };
});