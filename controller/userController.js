app.controller('userController', ['$scope', '$firebaseArray',
    function ($scope, $firebaseArray) {
        

        var userInfoRef = database.ref().child('userinfo/usergeninfo');
        var self = this
        this.fname = "Test"
        this.lname = "User"

        // GET USERINFO AS AN ARRAY
        $scope.users = $firebaseArray(userInfoRef);

        // ADD USER
        $scope.addUser = function () {
            
            //Use secondary app
            secondaryApp.auth().createUserWithEmailAndPassword($scope.userName, $scope.password).then(function (firebaseUser) {
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
                    bhver: true
                });
                //Logout the second app. Not the admin panel
                secondaryApp.auth().signOut();
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

            //Remove user from both paths
            remove('userinfo/usergeninfo/' + user.uuid);
            remove('userinfo/userstatus/' + user.uuid);
            remove('/currentStatus/' + user.uuid);
            //TODO last delete is not complete
            ///Cardinfo/" + "cardID"
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
    }]);