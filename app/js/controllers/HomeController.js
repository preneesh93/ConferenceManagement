/**
 * Created by Girish on 5/16/2016.
 */
angular.module('cms')
  .controller('HomeController',function($state,$scope,$rootScope,authService,currentuser,checklogin){
    console.log(currentuser);
    if(currentuser){
      $scope.isChair = currentuser.data.roles.chair
      console.log($scope.isChair);
      $rootScope.isAuthenticated=checklogin.data.isAuthenticated
    }
  });

