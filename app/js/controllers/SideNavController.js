/**
 * Created by Girish on 5/24/2016.
 */
angular.module('cms')
  .controller('SideNavController', function($scope,userService){
    $scope.sideMenu=[]

    $scope.userSidenavMenu = [
      {'label':'Edit Profile','state':'root.profiledetails'},
      {'label':'Dashboard','state':'root.dashboard'}
    ]
    $scope.chairSidenavMenu = [
      {'label':'Edit Profile','state':'root.profiledetails'},
      {'label':'Dashboard','state':'root.chair.dashboard'}
    ]

    userService.currentUser().then(function (response) {
      console.log(response)
      $scope.isReviewer=response.data.roles.reviewer
      $scope.sideMenu = response.data.roles.chair? $scope.chairSidenavMenu : $scope.userSidenavMenu
    })

    $scope.userSidenavMenu = [
      {'label':'Edit Profile','state':'root.profiledetails'},
      {'label':'Dashboard','state':'root.dashboard'}
    ]
    $scope.chairSidenavMenu = [
      {'label':'Edit Profile','state':'root.profiledetails'},
      {'label':'Dashboard','state':'root.chair.dashboard'}
    ]

  });

