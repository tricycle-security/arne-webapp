app.controller('userController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
    var userInfoRef = database.ref().child('userinfo/usergeninfo');
    var self = this;
    
    // GET USERINFO AS AN ARRAY
    self.users = $firebaseArray(userInfoRef);
    self.allUsersPlusPrivileges = [];

    var userStatus = database.ref().child('userinfo/userstatus');
    var userinfo = database.ref().child('userinfo/usergeninfo');

    firebase.auth().onAuthStateChanged(function (user) {
        var firebaseuid = user.uid;
        $scope.fireuid = firebaseuid;
    });

    userinfo.on('child_added', function (snap) {
        var tempUserInfo = snap.val();
        userStatus.child(snap.val().uuid).on('value', userStat => {
            var tempStatusInfo = userStat.val();
            if (tempStatusInfo != null) {
                var tempUser = {fname: tempUserInfo.fname, lname: tempUserInfo.lname, uuid: tempUserInfo.uuid, 
                    admin: tempStatusInfo.admin, alertmanager: tempStatusInfo.alertmanager, responder: tempStatusInfo.responder, enabled: tempStatusInfo.enabled};
                self.allUsersPlusPrivileges.push(tempUser); //allusers contains all userinfo + onLocation
            }

            //don't repeat any users in list
            for (var i in self.allUsersPlusPrivileges) {
                for (var j in self.allUsersPlusPrivileges) {
                    if(self.allUsersPlusPrivileges[i].uuid == self.allUsersPlusPrivileges[j].uuid && i != j){
                        self.allUsersPlusPrivileges.splice(i, 1);
                    }
                }
            }
        });
    });

    userinfo.on('child_changed', function (snap) {
        var tempUserInfo = snap.val();
        userStatus.child(snap.val().uuid).on('value', userStat => {
            var tempStatusInfo = userStat.val();
            if (tempStatusInfo != null) {
                var tempUser = {fname: tempUserInfo.fname, lname: tempUserInfo.lname, uuid: tempUserInfo.uuid, 
                    admin: tempStatusInfo.admin, alertmanager: tempStatusInfo.alertmanager, responder: tempStatusInfo.responder, enabled: tempStatusInfo.enabled};
                self.allUsersPlusPrivileges.push(tempUser); //allusers contains all userinfo + onLocation
            }

            //don't repeat any users in list
            for (var i in self.allUsersPlusPrivileges) {
                for (var j in self.allUsersPlusPrivileges) {
                    if(self.allUsersPlusPrivileges[i].uuid == self.allUsersPlusPrivileges[j].uuid && i != j){
                        self.allUsersPlusPrivileges.splice(i, 1);
                    }
                }
            }
        });
    });

    // ADD USER
    self.addUser = function () {
        if (!$scope.createForm.$valid) {
            console.log("invalid");
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
                responder: self.privilegeResponder, 
                alertmanager: self.privilegeManager,
                admin: self.privilegeAdmin,
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
        if (user.uuid === undefined) return;
        //DISABLE USER
        // database.ref().child('Userinfo/userstatus/'+ user.uuid).set({
        // bhver: false,
        // admin: null,
        // checknpole: false
        // });


        if (user.uuid.length >= 28 && $scope.fireuid != user.uuid) {
            // //Remove user from both paths
            remove('userinfo/usergeninfo/' + user.uuid);
            remove('userinfo/userstatus/' + user.uuid);
            remove('/currentstatus/' + user.uuid);

            self.closeModal('custom-modal-delete-user');
        }
        else {
            console.log("You can't delete yourself")
        };
    };

    //UPDATE USER METHOD
    self.updateUser = function (user) {
        if (user != null) {
            //update privilege
            database.ref().child('/userinfo/userstatus/'+ user.uuid).set({
                enabled: true,
                admin: user.admin,
                alertmanager: user.alertmanager,
                responder: user.responder,
                checkinpole: false,
                cardwriter: false
            });
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
        console.log("starting delete");
        database.ref().child(remove).remove()
            .then(function () {
                console.log("Remove succeeded.")
            })
            .catch(function (error) {
                console.log("Remove failed: " + error.message)
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
    self.userEnabler = function (user) {
        if (user != null) {
            var isEnabled = true;
            if(user.enabled){
                isEnabled = false;
            }

            //update enabled status
            database.ref().child('/userinfo/userstatus/'+ user.uuid).set({
                enabled: isEnabled
            });
        }
    }

    self.openModal = function (id) {//id is which modal to use
        $("#" + id).show();
    }

    self.openModal = function (id, user) {//index and user determines which user gets deleted
        $("#" + id).show();
        this.user = user;
        var userStatus = database.ref().child('userinfo/userstatus/' + user.uuid);
    }

    self.closeModal = function (id) {
        $("#" + id).hide();
    }
}]);