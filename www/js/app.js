var myApp = angular.module('starter', ['ionic', 'ngAnimate','ngCordova','angular.filter']);
myApp.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('app', {
		cache: false,
		abstract: true,
		url: "/app",
		templateUrl: "templates/menu.html"
	}).state('app.search', {
		url: "/search",
		views: {
			'menuContent': {
				templateUrl: "templates/search.html",
			}
		}
	}).state('app.locate', {
		cache: false,
		url: "/locate",
		views: {
			'menuContent': {
				templateUrl: "templates/locate.html",
				// controller: "locateItemsController"
			}
		}
	}).state('app.browse', {
		cache: false,
		url: "/browse",
		views: {
			'menuContent': {
				templateUrl: "templates/browse.html",
			}
		}
	}).state('app.playlists', {
		cache: false,
		url: "/playlists",
		views: {
			'menuContent': {
				templateUrl: "templates/playlists.html"
			}
		}
	}).state('app.charts', {
		cache: false,
		url: "/charts",
		views: {
			'menuContent': {
				templateUrl: "templates/charts.html",
				controller: "chartsController"
			}
		}
	}).state('app.assistant', {
		cache: false,
		url: "/assistant",
		views: {
			'menuContent': {
				templateUrl: "templates/assistant.html",
				controller: "assistantController"
			}
		}
	})
	$urlRouterProvider.otherwise("/app/charts");
});
myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
		//just to to test it out quickly.
			// var speech = new SpeechSynthesisUtterance('hello world');
			// speech.lang = 'en-US';
			// speechSynthesis.speak(speech);
	    if(window.StatusBar) {
	      StatusBar.styleDefault();
	    }
  });
})
