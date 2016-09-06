/**
 * Created by Preneesh on 12-08-2016.
 */
angular.module('cms')
  .controller('SubmissionsController', ['$scope','Upload', '$timeout', '$http','$window','currentuser','$stateParams', 
    function($scope,Upload,$timeout,$http,$window,currentuser,$stateParams){
      //$scope.sub = {};
      $scope.keywords = [];

      $scope.download = function(resource){
        window.open(resource);
      };

      //var id = $routeParams.id;
      $scope.loadSubDetails = function(){
        var req = {
          method: 'get',
          url: '/api/user/submissions',
          params: {submissionId : $stateParams.submissionId}
        };
        $http(req).then(function (result) {
          $scope.sub = result.data;
          $scope.keywords = $scope.sub.keywords;
        },function (error) {
          console.error('Error: ' + error);
        })
      };

      $scope.submit = function(sub) {
        if(sub == null){
          console.log("form is empty")
        }
        else {
          sub.keywords = $scope.keywords;
          sub.author_id = currentuser.data._id;
          if($scope.checkStatusNewSub(sub)){
            sub.status = "complete"
          } else {sub.status = "incomplete"}
          //Data Submission
          var req = {
            method: 'post',
            url: "/api/user/submissions",
            data: sub,
            params: {username: $window.localStorage.username}
          };
          $http(req).then(function (response) {
            console.log('starting second call...');
            var file = $scope.subFile;

            //File Upload
            Upload.upload({
              url: "/api/user/uploads",
              data: {file: file},
              params: {username: $window.localStorage.username, submission: response.data._id}
            }).then(function (resp) { //upload function returns a promise
/*              if (resp.data.error_code === 0) { //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
              } else {
                $window.alert('an error occured');
              }*/
            });

            //Submit Notification
            $scope.success = true;
            $timeout(function () {
              $scope.success = false;
            }, 2000);
          }, function (error) {
            console.error('Error: ' + error);
          });
        }
      }

      $scope.update = function(sub) {
        if(sub == null){
          console.log("form is empty")
        }
        else {
          sub.keywords = $scope.keywords;
          sub.author_id = currentuser.data._id;
          if($scope.checkStatusNewSub(sub)){
            console.log("complete")
            sub.status = "complete"
          } else {sub.status = "incomplete"
            console.log("incomplete")}
          //Data Submission
          var req = {
            method: 'post',
            url: "/api/user/update-sub",
            data: sub,
            params: {username: $window.localStorage.username}
          };
          $http(req).then(function (response) {
            console.log('starting second call...');
            var file = $scope.subFile;

            //File Upload
            Upload.upload({
              url: "/api/user/uploads",
              data: {file: file},
              params: {username: $window.localStorage.username, submission: response.data._id}
            }).then(function (resp) { //upload function returns a promise
/*              if (resp.data.error_code === 0) { //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
              } else {
                $window.alert('an error occured');
              }*/
            });

            //Submit Notification
            $scope.success = true;
            $timeout(function () {
              $scope.success = false;
            }, 2000);
          }, function (error) {
            console.error('Error: ' + error);
          });
        }
      }
      $scope.checkStatusNewSub = function (sub) {
        return (sub.title && sub.authors && sub.abstract && sub.keywords && ($scope.subFile || sub.path) )
      };
      $scope.checkStatus = function (sub) {
        console.log(sub)
        return (sub.title && sub.authors && sub.abstract && sub.keywords && sub.path )
      };
      $scope.remove = function (sub) {
        console.log(sub._id)
        $http.delete("/api/user/submission",{params:{id:sub._id}}).then( function (response){
          console.log(response)
        })
      }
    }]);