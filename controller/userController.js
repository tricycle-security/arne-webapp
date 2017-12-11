app.controller('userController', ['$scope', '$firebaseArray',
    function ($scope, $firebaseArray) {
        //Jordi's Firebase
        var config = {
            apiKey: "AIzaSyByv741uQXo8RsFtML7ASYpYvMeYmOadfg",
            authDomain: "ye-olde-project.firebaseapp.com",
            databaseURL: "https://ye-olde-project.firebaseio.com",
            projectId: "ye-olde-project",
            storageBucket: "ye-olde-project.appspot.com",
            messagingSenderId: "1006813715006"
        };

        // Initialize the firebase
        try {
            //start second app to create a user later
            var secondaryApp = firebase.initializeApp(config, "Secondary");
            var database = firebase.database();
        }
        catch (Exception) {
            console.log('firebase already exists');
            console.log(Exception);
        }
        finally {
            firebaseSet = true;
        }

        var userInfoRef = database.ref().child('Userinfo/usergeninfo');

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
                database.ref("/Userinfo/usergeninfo/" + firebaseUser.uid).set({
                    fname: $scope.firstName,
                    lname: $scope.lastName,
                    uuid: firebaseUser.uid
                });
                database.ref("/Userinfo/userstatus/" + firebaseUser.uid).set({
                    admin: 'active',
                    bhver: true,
                    checkinpole: false
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
            remove('Userinfo/usergeninfo/' + user.uuid);
            remove('Userinfo/userstatus/' + user.uuid);
            remove('/CurrentStatus/' + user.uuid);
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