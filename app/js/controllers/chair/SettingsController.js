/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('chair.SettingsController', function($scope,$http){
    console.log("inside chair settings controller")
    $scope.today = new Date();
    $scope.change = function (date) {
      console.log(date)
    };
    $http.get("/api/chair/deadlines?conference=cms").then(function(response){
      $scope.sub = new Date(response.data.submission_deadline);
      $scope.rev = new Date(response.data.review_deadline);
      console.log($scope.sub)
      console.log($scope.rev)
    })
    $scope.addSubmissionDeadline = function(sub){
      $http.put("/api/chair/deadlines?conference=cms",{submission_deadline: sub}).then(function(response){
        console.log(response)
      })
    }   
    $scope.addReviewDeadline = function(rev){
      $http.put("/api/chair/deadlines?conference=cms",{review_deadline: rev}).then(function(response){
        console.log(response)
      })
    }
  });

