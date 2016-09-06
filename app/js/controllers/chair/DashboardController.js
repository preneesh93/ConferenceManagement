/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('chair.DashboardController', function($scope,$http){
    console.log("inside chair dashboard controller")
    $scope.selectedUser=undefined
    $scope.isCollapsed = true;
    $scope.select = function (user) {
      console.log(user)
      $scope.selectedUser=user
    };
    $http.get("/api/user/list")
      .then(function(response) {
          $scope.users=response.data
        }
      );
    $http.get("/api/user/sub-list")
      .then(function(response) { console.log(response)
          $scope.submissions=response.data
        }
      );

    $http.get("/api/reviewers/list").then( function(response){
      $scope.reviewers = response.data
    })
    $scope.remove = function (sub,index) {
      $scope.submissions.splice(index,1)
      $http.delete("/api/user/submission",{params:{id:sub._id}}).then( function (response){
        console.log(response)
      })
    }


  });

