/**
 * Created by Preneesh on 12-08-2016.
 */
angular.module('cms')
  .config(['$mdIconProvider', function($mdIconProvider) {
    $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
  }])
  .controller('SubmissionsController', ['$scope','Upload', '$timeout', '$http','$window','$routeParams', function($scope,Upload,$timeout,$http,$window,$routeParams){
    console.log("inside submissions controller");
    
    $scope.keywords = [];

    $scope.download = function(resource){
      window.open(resource);
    };

    var id = $routeParams.id;
    $scope.loadSubDetails = function(){
      var req = {
        method: 'get',
        url: '/submission/' + id
      };
      $http(req).then(function (result) {
        console.log(id);
        console.log(result);
        $scope.sub = result.data;
        console.log($scope.sub)
      },function (error) {
        console.error('Error: ' + error);
      })
    };
  
    $scope.submit = function(sub) {
      sub.keywords = $scope.keywords;
      // sub.username = $window.localStorage.username;
      console.log(sub);
      var req = {
        method: 'post',
        url: "/api/user/submissions",
        data: sub,
        params: {username: $window.localStorage.username}
      };
      console.log(sub);
      $http(req).then(function (response) {
        console.log(response.data);
        console.log('starting second call...');
        var file = $scope.subFile;
        Upload.upload({
          url: "/api/user/uploads",
          data: {file: file},
          params: {username: $window.localStorage.username, submission: response.data._id}
        }).then(function (resp) { //upload function returns a promise
          if (resp.data.error_code === 0) { //validate success
            $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
          } else {
            $window.alert('an error occured');
          }
        });
        $scope.success = true;
        $timeout(function () {
          $scope.success = false;
        }, 2000);
      }, function (error) {
        console.error('Error: ' + error);
      });
    }
  }]);