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
    $scope.status = '  ';

    $scope.showTabDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'tabDialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
  });

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
