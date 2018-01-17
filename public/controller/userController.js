app.controller('userController', ['$scope', '$firebaseArray', "$firebaseObject", function ($scope, $firebaseArray, $firebaseObject) {

        var userInfoRef = database.ref().child('userinfo/usergeninfo');
        this.newPrivileges = {
            responder: false,
            admin: false,
            manager: false
        }
        this.privileges = {}
        this.user = {}
        var self = this;

        // GET USERINFO AS AN ARRAY
        this.users = $firebaseArray(userInfoRef);


        self.users.$watch(function (event) {
            if (event.event === "child_added") {
                for (var i = 0; i < self.users.length; i++) {
                    if (self.users[i].uuid === event.key) {
                        self.users[i].enabled = $firebaseObject(database.ref().child('userinfo/userstatus/' + event.key + "/enabled"));
                        break;
                    }
                }
            }

        });

        var userStatus = database.ref().child('userinfo/userstatus');
        var userinfo = database.ref().child('userinfo/usergeninfo');

        firebase.auth().onAuthStateChanged(function (user) {
            var firebaseuid = user.uid;
            $scope.fireuid = firebaseuid;
        });

        // ADD USER
        this.addUser = function () {
            if (!$scope.createForm.$valid) {
                return;
            }

            //Use secondary app
            secondaryApp.auth().createUserWithEmailAndPassword(self.email, randomPassword(16)).then(function (firebaseUser) {
                //Send password reset email to currently registered email
                secondaryApp.auth().sendPasswordResetEmail(firebaseUser.email);
                //Set data in both paths with uuid that was returned by creation
                database.ref("/userinfo/usergeninfo/" + firebaseUser.uid).set({
                    fname: self.fname,
                    lname: self.lname,
                    uuid: firebaseUser.uid
                });
                database.ref("/userinfo/userstatus/" + firebaseUser.uid).set({
                    enabled: true,
                    responder: self.newPrivileges.responder,
                    alertmanager: self.newPrivileges.manager,
                    admin: self.newPrivileges.admin,
                    checkinpole: false,
                    cardwriter: false
                });

                //Logout the second app. Not the admin panel
                secondaryApp.auth().signOut();

                self.fname = "";
                self.lname = "";
                self.email = "";

                self.closeModal('custom-modal-add-user');
            })
        };

        //Remove user method
        self.removeUser = function (index, user) {
            // CHECK THAT USER IS VALID
            if (user.uuid === undefined)
                return;

            if (user.uuid.length >= 28 && $scope.fireuid != user.uuid) {
                // //Remove user from both paths
                remove('userinfo/usergeninfo/' + user.uuid);
                remove('userinfo/userstatus/' + user.uuid);
                remove('/currentstatus/' + user.uuid);

                self.closeModal('custom-modal-delete-user');
            }
            else {
            }
            ;
        };

        //UPDATE USER METHOD
        self.updateUser = function (user) {
            if (user != null) {
                //update privilege
                self.privileges.$save();
                //update username
                database.ref("/userinfo/usergeninfo/" + user.uuid).set({
                    fname: user.fname,
                    lname: user.lname,
                    uuid: user.uuid
                });
                self.closeModal('custom-modal-edit-user');
            }
        };

        function remove(remove) {
            database.ref().child(remove).remove()
                    .then(function () {
                    })
                    .catch(function (error) {
                    });
        }

        function randomPassword(length) {
            var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
            var pass = "";
            for (var x = 0; x < length; x++) {
                var i = Math.floor(Math.random() * chars.length);
                pass += chars.charAt(i);
            }
            return pass;
        }

        //enable or disable a user
        self.userEnabler = function (uuid, boolean) {
            if (boolean !== null) {

                var isEnabled = !boolean;

                //update enabled status
                database.ref().child('/userinfo/userstatus/' + uuid+'/enabled').set(isEnabled);
            }
        }

        self.openModal = function (id, user) {//index and user determines which user gets deleted
            $("#" + id).show();
            this.user = user;
            var userStatus = database.ref().child('userinfo/userstatus/' + user.uuid);

        }


        self.openModal = function (id, user) {//index and user determines which user gets deleted
            $("#" + id).show();
            self.user = user

            self.privileges = $firebaseObject(database.ref().child('userinfo/userstatus/' + user.uuid));
//            var userStatus = database.ref().child('userinfo/userstatus/' + user.uuid);

            if (id = "custom-modal-delete-user") {
                var fullName = user.fname + " " + user.lname;
                
                if($scope.LANG.LANGUAGE == "EN"){
                    $scope.LANG.AREYOUSUREYOUWANTTODELETE =  "Are you sure you want to delete user \'" + fullName + "\'?";
                } else if($scope.LANG.LANGUAGE == "NL"){
                    $scope.LANG.AREYOUSUREYOUWANTTODELETE =  "Weet u zeker dat u gebruiker \'" + fullName + "\' wilt verwijderen?";
                }
            }
            if (id = "custom-modal-enable-user") {
                var fullName = user.fname + " " + user.lname;
                if($scope.LANG.LANGUAGE == "EN"){
                    $scope.LANG.AREYOUSUREYOUWANTTOENABLE =  "Are you sure you want to enable user \'" + fullName + "\'?";
                    $scope.LANG.AREYOUSUREYOUWANTTODISABLE =  "Are you sure you want to disble user \'" + fullName + "\'?";
                } else if($scope.LANG.LANGUAGE == "NL"){
                    $scope.LANG.AREYOUSUREYOUWANTTOENABLE =  "Weet u zeker dat u gebruiker \'" + fullName + "\' wilt enablen?";
                    $scope.LANG.AREYOUSUREYOUWANTTODISABLE =  "Weet u zeker dat u gebruiker \'" + fullName + "\' wilt disablen?";
                }
                
            }
        }

        self.closeModal = function (id) {
            $("#" + id).hide();
            self.newPrivileges = {
                responder: false,
                admin: false,
                manager: false
            }
        }
    }]);