/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('chair.SettingsController', function($scope,$http,config){
    $scope.conf={}
    $scope.conf.name = config.conference_name;
    $scope.today = new Date();
    $http.get("/api/chair/deadlines?conference="+config.conference_name).then(function(response){
      if(response.data != null){
        $scope.conf.sub = (response.data.submission_deadline)? new Date(response.data.submission_deadline) : undefined;
        $scope.conf.rev = (response.data.review_deadline)? new Date(response.data.review_deadline) : undefined;
      }
    },function (error) {  console.log(error)  }
    )
    $scope.addSubmissionDeadline = function(sub){
      $http.put("/api/chair/deadlines?conference="+config.conference_name,{submission_deadline: sub}).then(function(response){
        $scope.showSuccess="Updated..."
      })
    }   
    $scope.addReviewDeadline = function(rev){
      $http.put("/api/chair/deadlines?conference="+config.conference_name,{review_deadline: rev}).then(function(response){
        $scope.showSuccess="Updated..."
      })
    }
  });

