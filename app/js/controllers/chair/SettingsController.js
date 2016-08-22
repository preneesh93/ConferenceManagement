/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('chair.SettingsController', function($scope,$http,config){
    console.log(config.conference_name)
    $scope.name = config.conference_name;
    $scope.today = new Date();
    $scope.change = function (date) {
      console.log(date)
    };
    $http.get("/api/chair/deadlines?conference="+config.conference_name).then(function(response){
      $scope.sub = new Date(response.data.submission_deadline);
      $scope.rev = new Date(response.data.review_deadline);
      console.log($scope.sub)
      console.log($scope.rev)
    },function (error) {
      console.log(error)
      }
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

