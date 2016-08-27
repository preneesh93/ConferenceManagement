/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('chair.SettingsController', function($scope,$http,config){
    console.log(config.conference_name)
    $scope.conf={}
    $scope.conf.name = config.conference_name;
    $scope.today = new Date();
    $scope.change = function (date) {
      console.log(date)
    };
    $http.get("/api/chair/deadlines?conference="+config.conference_name).then(function(response){
      if(response.data != null){
        $scope.conf.sub = (response.data.submission_deadline)? new Date(response.data.submission_deadline) : undefined;
        $scope.conf.rev = (response.data.review_deadline)? new Date(response.data.review_deadline) : undefined;
        console.log($scope.conf)
      }
    },function (error) {  console.log(error)  }
    )
    $scope.addSubmissionDeadline = function(sub){
      $http.put("/api/chair/deadlines?conference="+config.conference_name,{submission_deadline: sub}).then(function(response){
        console.log(response)
      })
    }   
    $scope.addReviewDeadline = function(rev){
      $http.put("/api/chair/deadlines?conference="+config.conference_name,{review_deadline: rev}).then(function(response){
        console.log(response)
      })
    }
  });

