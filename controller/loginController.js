app.controller('loginController', function ($scope, $rootScope, $window)
{    
    this.title = "Log in";
    
    $scope.submit = function (){
        console.log("logging in...");
        var email = "contact@tricycle-sec.nl";
        var password = "Test123!";

        this.signIn = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            console.log("auth sign in Error Here:");
            console.log(error.code);
            console.log(error.message);
        });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //redirect after login
                $window.location.href = './#/';
            } else {
                console.log('not logged in!')
            }
        });
    }

    var user = firebase.auth().currentUser;
    
    if (user) {// User is signed in.
        console.log("Logged in");
    } else {// No user is signed in.
        console.log("Logged out");
    }
});