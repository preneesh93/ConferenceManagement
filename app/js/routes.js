/** Created by Girish on 2/7/2016.*/
angular.module('routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('home', {
        url: "/",
        views: {
          'main@':{
            templateUrl: 'views/home.html',
            controller: 'HomeController'
          }
        },
        data: { requireAuth: false },
        resolve:{
          username:function ($window,$rootScope) {
            $rootScope.username=$window.localStorage.username;
            return $rootScope.username
          }
        }
      }).state('home.register', {
        url: "register",
        data: { requireAuth: false },
        views: {
          'main@':{
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
          }
        },
        onEnter: ['$state','$rootScope',function($state, $rootScope){
          console.log("checking register")
          if($rootScope.isAuthenticated){
            $state.go('home');
          }
        }]
      }).state('home.login', {
        url: "login",
        views: {
          'main@': {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
          }
        },
        data: { requireAuth: false },
        onEnter: ['$state','$rootScope',function($state, $rootScope){
          console.log("checking login")
          if($rootScope.isAuthenticated){
            $state.go('home');
          }
        }]
      }).state('home.dashboard', {
        url: "dashboard",
        data: { requireAuth: true },
        views: {
          'main@':{
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController'
          },
          'profile@home.dashboard':{
            templateUrl: 'views/dashboard/profileOverview.html',
            controller: 'ProfileOverviewController'
          },
          'submissions@home.dashboard':{
            templateUrl: 'views/dashboard/submissionsOverview.html',
            controller: 'DashboardController'
          },
          'reviews@home.dashboard':{
            templateUrl: 'views/dashboard/reviewsOverview.html',
            controller: 'DashboardController'
          }
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