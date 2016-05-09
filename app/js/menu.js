/**
 * Created by Girish on 2/7/2016.
 */
angular.module('menu',[])
  .controller('menuCtrl', function($scope) {
    $scope.windowSize=$(window).width();

    $scope.menuItems = [
      {
        class: "fa-home",
        text: "Home",
        url: "#/main"
      },
      {
        class: "fa-home",
        text: "About",
        url: "#/about"
      },
      {
        class: "fa-user",
        text: "Login",
        url: "#/login"
      }
    ];
  });
