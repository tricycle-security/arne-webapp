app.controller('loginController', function ($scope, $rootScope, $window)
{    
    this.title = "Log in";
    $scope.submit = function (){
        console.log("logging in...");

        //submitted values
        var email = $scope.email;
        var password = $scope.password;

        //Submitted value must not be null, null values prevents code from executing onAuthStateChanged()
        if (email == null || password == null) {
            email = "email";
            password = "password";
        }

        this.signIn = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            console.log("auth sign in Error Here:");
            console.log(error.code);
            console.log(error.message);
        });

        var user = firebase.auth().currentUser;

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("Logged in");
                //redirect after login
                $window.location.href = './#/';
            } else {
                console.log('not logged in!')
                this.error = "Error: not logged in!";
            }
        });
    }  
});