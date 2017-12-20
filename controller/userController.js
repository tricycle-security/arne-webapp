app.controller('userController', ['$scope', '$firebaseArray',
    function ($scope, $firebaseArray) {


        var userInfoRef = database.ref().child('userinfo/usergeninfo');
        var self = this;
        
        // GET USERINFO AS AN ARRAY
        $scope.users = $firebaseArray(userInfoRef);


        firebase.auth().onAuthStateChanged(function (user) {
            var firebaseuid = user.uid;
            $scope.fireuid = firebaseuid;
            console.log(firebaseuid);
        });

        // ADD USER
        $scope.addUser = function () {
            if (!$scope.userForm.$valid) {
                console.log("invalid");
                return;
            }
            //Use secondary app
            secondaryApp.auth().createUserWithEmailAndPassword(self.email, randomPassword(16)).then(function (firebaseUser) {
                console.log("User " + firebaseUser.uid + " created successfully!");
                //Send password reset email to currently registered email
                secondaryApp.auth().sendPasswordResetEmail(firebaseUser.email);
                //Set data in both paths with uuid that was returned by creation
                console.log("Firstname : " + self.fname + "Lastname : " + self.lname + "uid : " + firebaseUser.uid)
                database.ref("/userinfo/usergeninfo/" + firebaseUser.uid).set({
                    fname: self.fname,
                    lname: self.lname,
                    uuid: firebaseUser.uid
                });
                database.ref("/userinfo/userstatus/" + firebaseUser.uid).set({
                    responder: true
                });
                //Logout the second app. Not the admin panel
                secondaryApp.auth().signOut();

                self.fname = "";
                self.lname = "";
                self.email = "";


            })
        };

        //Remove user method
        $scope.removeUser = function (index, user) {
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
            }
            else {
                console.log("You can't delete yourself")
            }
            ;
        };

        //UPDATE USER METHOD
        $scope.updateUser = function (index, user) {
            // // CHECK THAT ITEM IS VALID
            // if (user.id === undefined)return;
            //
            // // UPDATE STATUS TO IN PROGRESS AND SAVE
            // user.status = 'in progress';
            // $scope.users.$save(user);
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


        this.openModal = function (id) {
            $("#" + id).show();
        }

        this.closeModal = function (id) {
            $("#" + id).hide();
        }
    }]);