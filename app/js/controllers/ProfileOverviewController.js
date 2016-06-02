/**
 * Created by Girish on 5/25/2016.
 */
angular.module('cms')
  .controller('ProfileOverviewController', function($scope,$http,$window,$state){
    console.log("inside profile controller");
    $scope.submissions=[
      {title:"this is submission 1",authors:["author1","author2","author3"]},
      {title:"this is submission 2",authors:["author1","author2","author3"]},
      {title:"this is submission 3",authors:["author1","author2","author3"]}
    ]
  })
