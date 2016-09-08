/**
 * Created by Smurf on 8/25/2016.
 */

angular.module('cms')
  .controller('chair.AssignController',['$scope','$http','$element','$window', function($scope,$http,$element,$window){
    $scope.isCollapsed = true;
    $scope.searchTerm = undefined;
    $element.find('input').on('keydown', function(ev) {
      ev.stopPropagation();
    });
    $scope.clearSearchTerm = function() {
      $scope.searchTerm = '';
    };
    $http.get("/api/user/sub-list",{params:{"unassigned":true}})
      .then(function(response) { console.log(response)
          $scope.submissions=response.data
        }
      );

    $http.get("/api/reviewers/list").then( function(response){
      $scope.reviewers = response.data
    })

    $scope.assign = function (subid, revid) {
      $http.post("/api/chair/assign",{sub:subid,rev:revid}).then(function (response) {
        $window.location.reload();
      })
    }
    $scope.checkAuthors= function (email,authors) {
      var result= false
      authors.forEach(function (author) {
        if(author.email==email){
          result = true
        }
      })
      return result

    }
  }]);

