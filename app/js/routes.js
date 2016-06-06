/** Created by Girish on 2/7/2016.*/
angular.module('routes', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/404");
    $stateProvider
      .state('root',{
        url:"/",
        abstract:true,
        views: {
          'content@':{
            templateUrl: 'views/content.html',
            controller: 'HomeController'
          }
        },
        resolve:{

        }
      })
      .state('home', {
        url: "/",
        views: {
          'content@':{
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
      }).state('register', {
        url: "/register",
        data: { requireAuth: false },
        views: {
          'content@':{
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
      }).state('login', {
        url: "/login",
        views: {
          'content@': {
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
      }).state('root.dashboard', {
        url: "dashboard",
        data: { requireAuth: true },
        views: {
          'main@':{
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController'
          },
          'profile@root.dashboard':{
            templateUrl: 'views/dashboard/profileOverview.html',
            controller: 'ProfileOverviewController'
          },
          'submissions@root.dashboard':{
            templateUrl: 'views/dashboard/submissionsOverview.html',
            controller: 'DashboardController'
          },
          'reviews@root.dashboard':{
            templateUrl: 'views/dashboard/reviewsOverview.html',
            controller: 'DashboardController'
          }
        }
      }).state('404', {
        url: "/404",
        views: {
          'content@':{
            templateUrl: 'views/404.html'
          }
        },
        data: { requireAuth: false }
      });
});