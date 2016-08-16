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
    var req = {
      method: 'get',
      url: "/api/user/list"
    };
    $http(req)
      .then(
        function(response) { // Success callback
          // console.log(response)
          $scope.users=response.data
        }
      );

    $http.get("/api/reviewers/list").then( function(response){
      $scope.reviewers = response.data
    })

  });

