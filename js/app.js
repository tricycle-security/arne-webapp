var app = angular.module('dashboardapp', ['angular.filter', 'firebase', 'ngMap', 'ngStorage', 'ngRoute']);
app.constant('USER_ROLES', {
	all : '*',
    admin : 'admin',
    manager : 'alertmanager',
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

app.factory('restrictUserByLevel',['$q', '$location', 'USER_ROLES', function($q, $location, USER_ROLES){
    this.action = function(minPrivilegeLevel) {
        var deferred = $q.defer();
        var user = firebase.auth().currentUser;
    
        if (user){//is user logged in?
            var userStatus = database.ref().child('userinfo/userstatus/' + user.uid);
    
            userStatus.once('value', function (statusSnap) {
    
                var privilegeLevel = "";
                if(statusSnap.val().responder){
                    privilegeLevel = USER_ROLES.responder;
                    if(statusSnap.val().alertmanager){
                        privilegeLevel = USER_ROLES.manager;
                        if(statusSnap.val().admin){
                            privilegeLevel = USER_ROLES.admin;
                        }
                    }
                }
                //is user the right privilege level for this page?
                if (privilegeLevel == minPrivilegeLevel) {
                    deferred.resolve();
                } else {
                    $location.path('/login');
                    deferred.reject();
                }
            });
        } else {
            $location.path('/login');
            deferred.reject();
        }
        return deferred.promise;
    }
    return this;
}]);

app.config(function ($routeProvider, USER_ROLES) {
    $routeProvider
        .when("/", {
            templateUrl: "dashboard-index.html",
            resolve:{
                restrictUser: function(restrictUserByLevel) {
                    return restrictUserByLevel.action(USER_ROLES.admin);
                }
            }
        })
        .when("/login", {
            templateUrl: "login-index.html"
        })
        .when("/alerts", {
            templateUrl: "alerts-index.html",
            resolve:{
                restrictUser: function(restrictUserByLevel) {
                    return restrictUserByLevel.action(USER_ROLES.admin);
                }
            }
        })
        .when("/user", {
            templateUrl: "user.html",
            resolve:{
                restrictUser: function(restrictUserByLevel) {
                    return restrictUserByLevel.action(USER_ROLES.admin);
                }
            }
        })
        .when("/logout", {
            templateUrl: "logout-index.html",
            resolve:{
                restrictUser: function(restrictUserByLevel) {
                    return restrictUserByLevel.action(USER_ROLES.admin);
                }
            }
        })
        .otherwise({
            templateUrl: "dashboard-index.html",
            resolve:{
                restrictUser: function(restrictUserByLevel) {
                    return restrictUserByLevel.action(USER_ROLES.admin);
                }
            }
        });
});