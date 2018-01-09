app.controller('logoutController', function ($rootScope, $location)
{    
    firebase.auth().signOut().then(function() {
        $rootScope.privilege = "";
        $rootScope.privilegeLv = 0;
        $location.path("/login");
    }, function(error) {
        console.error('Sign Out Error', error);
    });
});