/**
 * Created by Preneesh on 21-05-2016.
 */
angular.module('cms')
  .controller('ProfileController', function($stateParams,$scope, $http, $timeout){
    console.log("Profile Control!");
    console.log($stateParams.user);
    $scope.user=$stateParams.user;
    $scope.upload = function() {
      $scope.getProfileItem()

    };

    $scope.getProfileItem= function () {
      var req = {
        method: 'get',
        url: "/api/user/userDetails",
        params: {username: $scope.user.username}
      };
      $http(req).then(function (result) {
        console.log(result)
        $scope.profileItem = result.data;
      },function (error) {
        console.error('Error: ' + error);
      })
    };

    $scope.update = function (profile) {
      delete profile._id;
      console.log(profile);
      $http.post("/api/user/userDetails",profile).then(function (result) {
        console.log(result);
        $scope.success=true;
        $timeout(function () { $scope.success = false; }, 2000);
      }, function(error){
        console.error('Error: '+ error);
      })
    };

})

  .controller('DialogCtrl', function($scope, $mdDialog) {

    $scope.showTabDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'tabDialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };
  });

  function DialogController($scope, $mdDialog, md5, $http) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.change = function(password){
      $scope.changePass.pass1=md5.createHash($scope.changePass.pass1);
      $scope.changePass.pass2=md5.createHash($scope.changePass.pass2);
      $scope.changePass.pass3=md5.createHash($scope.changePass.pass3);

      $http.post("/api/users/change",password).then(function(result){
        console.log(result);
      }, function(error){
        console.error('Error: '+ error);
      })
    };
  }
