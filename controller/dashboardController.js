app.controller('dashboardController', function ($routeParams, $scope, $timeout)
{
    //test information
    this.allUsers = [];
//    this.allUsers.push(testUser);this.allUsers.push(testUser2);

    this.title = "Available BHV";

    var config = {
        apiKey: "AIzaSyB9vsnSG_L4Cc_io4Z0cGE8_rhR66QBEVk",
        authDomain: "tricycle-41751.firebaseapp.com",
        databaseURL: "https://tricycle-41751.firebaseio.com",
        projectId: "tricycle-41751",
        storageBucket: "tricycle-41751.appspot.com",
        messagingSenderId: "284978501316"
    };

    var database = null
    // Initialize the firebase
    try {
        firebase.initializeApp(config);
    }
    catch (Exception)
    {
        console.log('firebase already exists');
        console.log(Exception);
    }
    finally {
        database = firebase.database();
    }

    var email = "contact@tricycle-sec.nl"
    var pass = "nope"

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("authError Here:");
        console.log(errorCode);
        console.log(errorMessage);
    });


    console.log("API: Jordi's firebase");

    var self = this;
    var statusinfo = database.ref().child('currentstatus');
    var userinfo = database.ref().child('userinfo/usergeninfo');

    //Gets users with their onLocation status
    statusinfo.on('child_added', function (snap) {
        var tempSnap = snap.val();
        userinfo.child(snap.val().uuid).on('value', user => {
            var tempUserInfo = user.val();
            var tempUser = {fname: tempUserInfo.fname, lname: tempUserInfo.lname, uuid: tempUserInfo.uuid, onLocation: tempSnap.onLocation};

            self.allUsers.push(tempUser); //allusers contains all userinfo + onLocation
            console.log(self.allUsers);

//            $timeout(function () {
//                $scope.$apply();
//            });
        });
    });
 });
