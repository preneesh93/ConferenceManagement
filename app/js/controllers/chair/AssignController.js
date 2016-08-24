/**
 * Created by Smurf on 8/25/2016.
 */

angular.module('cms')
  .controller('chair.AssignController', function($scope,$http){
    $scope.isCollapsed = false;
    $http.get("/api/user/sub-list",{params:{"unassigned":true}})
      .then(function(response) { console.log(response)
          $scope.submissions=response.data
        }
      );

    $http.get("/api/reviewers/list").then( function(response){
      $scope.reviewers = response.data
    })

    $scope.call = function () {
      $http.get("/api/chair/assign").then(function (response){
        console.log(response)
      })
    }

  });

