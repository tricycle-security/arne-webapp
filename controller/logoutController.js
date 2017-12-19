app.controller('logoutController', function ($scope, $rootScope)
{    
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        $rootScope.privilege = "";
    }, function(error) {
        console.error('Sign Out Error', error);
    });
});