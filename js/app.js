/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('dashboardapp', ['angular.filter', 'firebase', 'ngMap', 'ngStorage', 'ngRoute']);
app.constant('USER_ROLES', {
	all : '*',
	admin : 'admin',
	responder : 'responder',
	viewer : 'viewer'
}).constant('AUTH_EVENTS', {
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized'
});
app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "dashboard-index.html"
            })
            .when("/login", {
                templateUrl: "login-index.html"
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