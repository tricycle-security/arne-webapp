app.controller('logoutController', function ($rootScope)
{    
    firebase.auth().signOut().then(function() {
        $rootScope.privilege = "";
        $rootScope.privilegeLv = 0;
    }, function(error) {
        console.error('Sign Out Error', error);
    });
});