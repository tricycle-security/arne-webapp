var app = angular.module('dashboardapp', ['angular.filter', 'firebase', 'ngRoute', 'ngSanitize']);
app.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    manager: 'alertmanager',
    responder: 'responder',
    viewer: 'viewer',
    adminLv: 3,
    managerLv: 2,
    responderLv: 1,
    viewerLv: 0
}).constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});


app.factory('restrictUserByLevel', ['$q', '$location', 'USER_ROLES', function ($q, $location, USER_ROLES) {
        this.action = function (minPrivilegeLevel) {
            var deferred = $q.defer();
            var user = firebase.auth().currentUser;

            if (user) {//is user logged in?
                var userStatus = database.ref().child('userinfo/userstatus/' + user.uid);

                userStatus.once('value', function (statusSnap) {

                    var privilegeLevel = 0;//viewer
                    if (statusSnap.val().responder) {
                        privilegeLevel = 1;//responder
                    }
                    if (statusSnap.val().alertmanager) {
                        privilegeLevel = 2;//manager
                    }
                    if (statusSnap.val().admin) {
                        privilegeLevel = 3;//admin
                    }



                    //is user the right privilege level for this page?
                    if (privilegeLevel >= minPrivilegeLevel) {
                        deferred.resolve();//allow access to page
                    } else {//if user is logged in but doesn't have enough privilege level, redirect to error page explaining that
                        $location.path('/error/:' + privilegeLevel);
                        deferred.reject();
                    }
                });
            } else {//user is not logged in. Redirect to login page
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
                resolve: {
                    restrictUser: function (restrictUserByLevel) {
                        return restrictUserByLevel.action(USER_ROLES.viewerLv);//0
                    }
                }
            })
            .when("/login", {
                templateUrl: "login-index.html"
            })
            .when("/alerts", {
                templateUrl: "alerts-index.html",
                resolve: {
                    restrictUser: function (restrictUserByLevel) {
                        return restrictUserByLevel.action(USER_ROLES.responderLv);//2
                    }
                }
            })
            .when("/user", {
                templateUrl: "user.html",
                resolve: {
                    restrictUser: function (restrictUserByLevel) {
                        return restrictUserByLevel.action(USER_ROLES.adminLv);//3
                    }
                }
            })
            .when("/card", {
                templateUrl: "card-index.html",
                resolve: {
                    restrictUser: function (restrictUserByLevel) {
                        return restrictUserByLevel.action(USER_ROLES.adminLv);//3
                    }
                }
            })
            .when("/floorplanbuilder", {
                templateUrl: "floorplanbuilder-index.html",
                resolve: {
                    restrictUser: function (restrictUserByLevel) {
                        return restrictUserByLevel.action(USER_ROLES.adminLv);//3
                    }
                }
            })
            .when("/logout", {
                templateUrl: "logout-index.html",
                resolve: {
                    restrictUser: function (restrictUserByLevel) {
                        return restrictUserByLevel.action(USER_ROLES.responderLv);//1
                    }
                }
            })
            .when("/error", {
                templateUrl: "error-index.html"
            })
            .when("/error/:lv", {
                templateUrl: "error-index.html"
            })
            .when("/error/:lv/:page", {
                templateUrl: "error-index.html"
            })
            .otherwise({
                templateUrl: "dashboard-index.html",
                resolve: {
                    restrictUser: function (restrictUserByLevel) {
                        return restrictUserByLevel.action(USER_ROLES.responderLv);//1
                    }
                }
            });
});