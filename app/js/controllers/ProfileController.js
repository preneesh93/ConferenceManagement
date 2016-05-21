/**
 * Created by Preneesh on 21-05-2016.
 */
angular.module('cms').controller('ProfileController',['$scope', '$http', function($scope,$http){
  console.log("Profile Control!");
  
}])
.config(function($mdThemingProvider) {

  $mdThemingProvider.theme('docs-dark', 'default')
    .primaryPalette('blue')
    .dark();

});