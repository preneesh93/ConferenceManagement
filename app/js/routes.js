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
        data:{}
      }).state('register', {
        url: "/register",
        templateUrl: 'views/register.html',
        controller: 'RegistrationController',
        data:{}
      }).state('dashboard', {
        url: "/dashboard",
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        params:{user:null}
      }).state('login', {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        data:{}
      }).state('update', {
        url: "/update",
        templateUrl: 'views/edit_profile.html',
        controller: 'ProfileController',
        params: {
          user:null
        }
      }).state('404', {
        url: "/404",
        templateUrl: 'views/404.html',
        data: { requireAuth: false }
      }).state('editprofile', {
        url: "/editprofile",
      views: {
        'main@':{
        templateUrl: 'views/edit-profile.html',
        controller: 'ProfileDetailsController'
        }
      },
        data: { requireAuth: false }
      })
      /*.state('home.recovery', {
      url: "recovery",
      views: {
        'main@':{
          templateUrl: 'views/recovery.html',
          controller: 'RecoveryController'
        }
      },
        data: { requireAuth: false }
      }).state('home.reset', {
      url: "reset/:token",
      views: {
        'main@':{
          templateUrl: 'views/reset.html',
          controller: 'ResetController'
        }
      },
        data: { requireAuth: false }
    });*/
});