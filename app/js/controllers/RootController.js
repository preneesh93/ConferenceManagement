/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('RootController',function($state,$scope,$rootScope,userService,currentuser){
    console.log(currentuser);
    if(currentuser){
      $scope.isChair = currentuser.data.roles.chair
      if (currentuser.data.roles.chair) {
        $state.go('root.chair.dashboard')
      }
      else {
        $state.go('root.dashboard')
      }
    }
  });

