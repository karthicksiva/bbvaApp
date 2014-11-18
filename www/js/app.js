// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      controller: 'AppCtrl'
    })

    // Each tab has its own nav history stack:

   
    .state('tab.group1', {
      url: '/group/step1',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-group1.html',
          controller: 'GroupCtrl'
        }
      }
    })
    .state('tab.group2', {
      url: '/group/step2',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-group2.html',
          controller: 'GroupCtrl'
        }
      }
    })
    .state('tab.group3', {
      url: '/group/step3',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-group3.html',
          controller: 'GroupCtrl'
        }
      }
    })
    .state('tab.group4', {
      url: '/group/step4',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-group4.html',
          controller: 'GroupCtrl'
        }
      }
    })
    .state('tab.group5', {
      url: '/group/step5',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-group5.html',
          controller: 'GroupCtrl'
        }
      }
    })
     .state('tab.spend', {
      url: '/spend',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-spend.html',
          controller: 'SpendCtrl'
        }
      }
    })

    .state('tab.choose', {
      url: '/choose',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-choose.html',
          controller: 'ChooseCtrl'
        }
      }
    })

    .state('tab.shorts', {
      url: '/shorts',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-shorts.html',
          controller: 'ShortsCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/group/step1');

});

