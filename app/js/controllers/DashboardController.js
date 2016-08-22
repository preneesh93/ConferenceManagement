/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('DashboardController', function($scope,$http,$window,currentuser){
    console.log(currentuser);
    currentuser.data.roles.author=true;
    $scope.reviewer = currentuser.data.roles.reviewer?true:false;
    $scope.list=['1','3','2'];
    var a_id =  currentuser.data._id;
    $scope.submission = {};
    //reviews overview
  

    // submission overview

    $scope.updateReviewer = function (reviewer) {
      currentuser.data.roles.reviewer = reviewer
      var req = {
        method:'post',
        url:"/api/user/"+currentuser.data.username+"/roles",
        data: currentuser.data.roles
      };
      $http(req).then(function (result) {
        console.log(result);
      }, function(error){
        console.error('Error: '+ error);
      })
    };
    
    $scope.listSubmissions = function() {
      var req = {
        method: 'get',
        url: "/api/user/list-sub",
        params: {author_id: a_id}
      };
      $http(req)
        .then(
          function(result){
            console.log("Retrieving Submission List")
            $scope.submission = result.data;
            console.log($scope.submission);
          }, function (error) {
            console.error('Error: ' + error);
          });
    };
  });

