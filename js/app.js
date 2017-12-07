/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('dashboardapp', ['angular.filter', 'firebase', 'ngMap', 'ngStorage', 'ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "dashboard-index.html"
            })
            .when("/login", {
                templateUrl: "login.html"
            })
            .when("/alerts", {
                templateUrl: "alerts-index.html"
            })
            .when("/map", {
                templateUrl: "map-index.html"
            })
            .when("/disclaimer", {
                templateUrl: "disclaimer-index.html"
            });
});

// Configure the main application module.
var loginApp = angular.module('loginApp', ['ui.router', 'ui.bootstrap'])
/*Constants regarding user login defined here*/
.constant('USER_ROLES', {
	all : '*',
	admin : 'admin',
	editor : 'editor',
	guest : 'guest'
}).constant('AUTH_EVENTS', {
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized'
})
/* Adding the auth interceptor here, to check every $http request*/
.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})
