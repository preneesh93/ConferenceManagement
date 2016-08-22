/**
 * Created by Girish on 5/24/2016.
 */
angular.module('cms')
  .controller('SideNavController', function($scope,currentuser){
    $scope.sideMenu=[]

    $scope.userSidenavMenu = [
      {'label':'Edit Profile','state':'root.profiledetails'},
      {'label':'Dashboard','state':'root.dashboard'}
    ]
    $scope.chairSidenavMenu = [
      {'label':'Edit Profile','state':'root.profiledetails'},
      {'label':'Dashboard','state':'root.chair.dashboard'},
      {'label':'Settings','state':'root.chair.settings'}
    ]

    if(currentuser) {
      $scope.sideMenu = currentuser.data.roles.chair ? $scope.chairSidenavMenu : $scope.userSidenavMenu
    }
  });

