/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('chair.DashboardController', function($scope,$http){
    $scope.selectedUser=undefined
    $scope.isCollapsed = true;
    $scope.reviewerExpertise = {
      '1': 'Not familiar with the topic',
      '2': 'Familiar',
      '3': 'Average',
      '4': 'Good',
      '5': 'Expert'
    };
    $scope.overallEvaluation = {
      '1': 'strong reject',
      '2': 'reject',
      '3': 'onHold',
      '4': 'accept',
      '5': 'strong accept'
    };

    mapSubmissions = function(subs){
      $scope.submissionsMap={}
      subs.forEach(function (sub) {
        $scope.submissionsMap[sub._id]=sub.title
      })
    };
    mapReviewers = function(reviewers){
      $scope.reviewersMap={}
      reviewers.forEach(function (rev) {
        $scope.reviewersMap[rev._id]=rev.username
      })
    };
    $http.get("/api/user/list").then(function(response) {
          $scope.users=response.data
        }
      );
    $http.get("/api/user/sub-list").then(function(response) {
          $scope.submissions=response.data
          mapSubmissions($scope.submissions)
        }
      );
    $http.get("/api/user/review/list").then(function(response) {
      $scope.reviews=response.data}
      );

    $http.get("/api/reviewers/list").then( function(response){
      $scope.reviewers = response.data
      mapReviewers($scope.reviewers)
    })
    $scope.remove = function (sub,index) {
      $scope.submissions.splice(index,1)
      $http.delete("/api/user/submission",{params:{id:sub._id}}).then( function (response){
      })
    }
  });

