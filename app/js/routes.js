/** Created by Girish on 2/7/2016.*/
angular.module('routes',[])
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .when('/404',{
        templateUrl: 'views/404.html'

      })
      .otherwise({
        redirectTo: '/404'
      });
    $locationProvider.html5Mode(true);
  });
