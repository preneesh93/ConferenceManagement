/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('RootController',function($state,$scope,$rootScope,userService,currentuser){
    console.log(currentuser);
    if(currentuser){
      $scope.isChair = currentuser.data.roles.chair
      console.log($scope.isChair);
      if (currentuser.data.roles.chair) {
        console.log("going to chairboard")
        $state.go('root.chair.dashboard')
      }
      else {
        console.log("going to author")
        $state.go('root.dashboard')
      }
    }
  });

