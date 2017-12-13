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

this.restrictUser = function($location,$q) {
    var user = firebase.auth().currentUser;
    var deferred = $q.defer();
    if (user) {// User is signed in.
        deferred.resolve();
    } else {
        deferred.reject();
        $location.path('/login');
    }
    return deferred.promise;
  }

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "dashboard-index.html",
            resolve:{
                loggedIn: restrictUser
            }
        })
        .when("/login", {
            templateUrl: "login-index.html"
        })
        .when("/alerts", {
            templateUrl: "alerts-index.html",
            resolve:{
                loggedIn: restrictUser
            }
        })
        .when("/user", {
            templateUrl: "user.html",
            resolve:{
                loggedIn: restrictUser
            }
        })
        .when("/logout", {
            templateUrl: "logout-index.html",
            resolve:{
                loggedIn: restrictUser
            }
        })
        .otherwise({
            templateUrl: "dashboard-index.html",
            resolve:{
                loggedIn: restrictUser
            }
        });
});