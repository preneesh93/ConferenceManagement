/**
 * Created by Preneesh on 12-08-2016.
 */
angular.module('cms')
  .config(['$mdIconProvider', function($mdIconProvider) {
    $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
  }])
  .controller('SubmissionsController', ['$scope','Upload', '$timeout', '$http', '$window', function($scope,Upload,$timeout,$http,$window){
    console.log("inside submissions controller");
    
    $scope.keywords = [];


    $scope.submit = function(sub){
      sub.keywords = $scope.keywords;

      console.log(sub);

      var req = {
        method:'post',
        url:"/api/user/submission",
        data: sub,
        params: {username : $window.localStorage.username}
      };
      $http(req).then(function (result) {
        console.log(result);
          $scope.success = true;
          $timeout(function () {$scope.success = false;}, 2000);
        }, function (error) {
          console.error('Error: ' + error);
      });
    };

    $scope.uploadFile = function(file) {
      file.upload = Upload.upload({
        url: 'api/user/upload',
        data: {file: file}
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
    
    
  }]);