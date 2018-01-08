app.controller('loginController', function ($scope, $rootScope, $window, USER_ROLES)
{    
    this.title = "Log in";$rootScope.privilegeLv = USER_ROLES.adminLv;
    $scope.submit = function (){

        //submitted values
        var email = $scope.email;
        var password = $scope.password;

        //Submitted value must not be null, null values prevents code from executing onAuthStateChanged()
        if (email == null || password == null) {
            email = "email";
            password = "password";
        }

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            console.log("auth sign in Error Here:");
            console.log(error.code);
            console.log(error.message);
            
            //redirect if login fails
            $window.location.href = './#/error';
        });

        var user = firebase.auth().currentUser;
    }  

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userStatus = database.ref().child('userinfo/userstatus/' + user.uid);
        
            userStatus.on('value', function (statusSnap) {

                if(statusSnap.val().responder){
                    $rootScope.privilege = USER_ROLES.responder;
                    $rootScope.privilegeLv = USER_ROLES.responderLv;
                    if(statusSnap.val().alertmanager){
                        $rootScope.privilege = USER_ROLES.manager;
                        $rootScope.privilegeLv = USER_ROLES.managerLv;
                        if(statusSnap.val().admin){
                            $rootScope.privilege = USER_ROLES.admin;
                            $rootScope.privilegeLv = USER_ROLES.adminLv;
                        }
                    }
                }
            });

            //redirect after login
            $window.location.href = './#/';
        }
    });
});