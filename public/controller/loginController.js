app.controller('loginController', function ($timeout, $scope, $rootScope, $window, USER_ROLES) {
    var self = this;
    this.title = "Log in";


    self.submit = function () {
        console.log("submit");
        //submitted values
        var email = self.email;
        var password = self.password;

        console.log(self.email);

        //Submitted value must not be null, null values prevents code from executing onAuthStateChanged()
        if (email == null || password == null) {
            email = "email";
            password = "password";
        }

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            console.log("auth sign in Error Here:");
            console.log(error.code);
            console.log(error.message);

            $scope.errorMsg = error.message;
            $timeout(function () {
                $scope.errorMsg = error.message;
                console.log($scope.errorMsg);
                //  $window.location.href = './#/login';
            }, 1000);

            //redirect if login fails

        });

        var user = firebase.auth().currentUser;
    }  

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("statechanged")
            var userStatus = database.ref().child('userinfo/userstatus/' + user.uid);
            
            userStatus.on('value', function (statusSnap) {

                $rootScope.privilege = USER_ROLES.viewer;
                $rootScope.privilegeLv = USER_ROLES.viewerLv;
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