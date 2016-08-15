/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('RootController',function($state,$scope,$rootScope,userService,currentuser,checklogin){
    console.log(currentuser);
    console.log(checklogin);
    if(!checklogin.data.isAuthenticated){$state.go('login')}
    if(currentuser){
      $scope.isChair = currentuser.data.roles.chair
      console.log($scope.isChair);
      $rootScope.isAuthenticated=checklogin.data.isAuthenticated
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

