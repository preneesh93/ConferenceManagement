/**
 * Created by Giri on 5/13/2016.
 */
angular.module('cms').controller('RegistrationController', function($scope,$http,md5){
  console.log("inside registration controller")
  $scope.register = function () {
    $scope.user.password=md5.createHash($scope.user.password);
    console.log($scope.user)
    $scope.data=JSON.stringify($scope.user)
    var req = {
      method: 'post',
      url: "api/user/register",
      data: $scope.data
    };
    // Send it
    $http(req)
      .then(
        function(response){ // Success callback
          console.log(response);
          if(response.data._id){
            $scope.success=true;
          }
        },
        function(response){ //Error callback
          console.log(response)
        }
      );

  }
})

  .controller('DialogCtrl', function($scope, $mdDialog, $mdMedia) {
    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
  
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
