/**
 * Created by Giri on 9/5/2016.
 */
angular.module('cms').controller('SettingsController', function($scope,$http,md5,currentuser){
  $scope.remove = function () {
    console.log(currentuser.data._id)
    var req = {
      method: 'post',
      url: '/api/user/remove',
      params: {id : currentuser.data._id}
    };
    $http(req).then(function (result){
      console.log(result)}
    ,function (error) {
      console.error('Error: ' + error);
    })
  }
});