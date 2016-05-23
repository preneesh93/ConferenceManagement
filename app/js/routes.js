/** Created by Girish on 2/7/2016.*/
angular.module('routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        data: { requireAuth: false }
      }).state('register', {
        url: "/register",
        templateUrl: 'views/register.html',
        controller: 'RegistrationController',
        data: { requireAuth: false }
      }).state('dashboard', {
        url: "/dashboard",
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        data: { requireAuth: true }
      }).state('login', {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        data: { requireAuth: false }
      }).state('dashboard.submission', {
        url: "^/submission",
        templateUrl: 'views/submission.html',
        controller: 'LoginController'
      }).state('404', {
        url: "/404",
        templateUrl: 'views/404.html',
        data: { requireAuth: false }
      });
});