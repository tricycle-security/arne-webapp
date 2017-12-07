app.controller('dashboardController', function ($routeParams, $scope, $timeout)
{
    //test information
    var testUser = {fname: "Test", lname: "Testing", uuid: 1, onLocation: true}
    var testUser2 = {fname: "Test", lname: "Testing", uuid: 1, onLocation: false}
    this.allUsers = [];
    this.allUsers.push(testUser);this.allUsers.push(testUser2);

    this.title = "Available HBVs";

    /*var config = {
        apiKey: "AIzaSyD8suoQjYrq58S3yHoA7HoXqIVy3HJiJYM",
        authDomain: "festivalapp-9e0ae.firebaseapp.com",
        databaseURL: "https://festivalapp-9e0ae.firebaseio.com",
        storageBucket: "festivalapp-9e0ae.appspot.com",
        messagingSenderId: "423570948804"
    };

    try{
        firebase.initializeApp(config);
    }
    catch(Exception)
    {
        console.log('firebase already exists');
        console.log(Exception);
    }
    finally {
        firebaseSet = true;
    }*/

    //Jordi's Firebase
    var config = {
        apiKey: "AIzaSyByv741uQXo8RsFtML7ASYpYvMeYmOadfg",
        authDomain: "ye-olde-project.firebaseapp.com",
        databaseURL: "https://ye-olde-project.firebaseio.com",
        projectId: "ye-olde-project",
        storageBucket: "ye-olde-project.appspot.com",
        messagingSenderId: "1006813715006"
    };

    var email = "0889529@hr.nl";
    var pass = "toor12";

    console.log("API: Jordi's firebase");

    // Initialize the firebase
    var database = null;
    try{
        firebase.initializeApp(config);
    }
    catch(Exception)
    {
        console.log('firebase already exists');
        console.log(Exception);
    }
    finally {
        database = firebase.database();
//        firebaseSet = true;
    }

    //Sign in
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("authError Here:");
        console.log(errorCode);
        console.log(errorMessage);
    });
    
    //create basic tables and info
    var uuid = 2;

    database.ref("/Userinfo/" + "usergeninfo/" + uuid).set({
    fname: 'Arne',
    lname: 'Lname',
    uuid: uuid
    });

    database.ref("/Userinfo/" + "userstatus/" +  uuid).set({
    admin: 'active',
    bhver: true,
    checkinpole: false
    });

    database.ref("/Cardinfo/" + "cardID").set({
    status: 'active',
    uuid: uuid
    });

    database.ref("/CurrentStatus/" + uuid).set({
    onLocation: true,
    uuid: uuid
    });

    var self = this;
    var statusinfo = database.ref().child('CurrentStatus');
    var userinfo = database.ref().child('Userinfo/usergeninfo');

    //Gets users with their onLocation status
    statusinfo.on('child_added', function(snap){
        var tempSnap = snap.val();
        userinfo.child(snap.val().uuid).on('value', user => {
            var tempUserInfo = user.val();
            var tempUser = {fname: tempUserInfo.fname, lname: tempUserInfo.lname, uuid: tempUserInfo.uuid, onLocation: tempSnap.onLocation};

            self.allUsers.push(tempUser); //allusers contains all userinfo + onLocation
            console.log(self.allUsers);

            $timeout(function (){
                $scope.$apply();
            });
        });
    });
});




//helper
//get all users
    /*database.ref('Userinfo/usergeninfo').on("child_added", function (data){
        var tempData = data.val();
        var tempUser = {fname: tempData.fname, lname: tempData.lname, uuid: tempData.uuid};

        console.log(tempUser);
        self.allUsers.push(tempUser);
        
        $timeout(function (){
            $scope.$apply();
        });
    });*/



    /*database.ref('CurrentStatus').on("child_added", function (data){
        var tempData = data.val();
        var tempStatus = {onLocation: tempData.onLocation, uuid: tempData.uuid};

        self.availabilityUsers.push(tempStatus);
        console.log(self.availabilityUsers);

        $timeout(function (){
            $scope.$apply();
        });

    });*/

    /*
        var tempUuid = data.val().uuid;
var tempAvailability = []; 
database.ref('CurrentStatus').child('uuid').child(tempUuid).once('value', function(mediaSnap) {
    console.log(tempUuid + ":");// + mediaSnap.val().onLocation);
    console.log(mediaSnap.val());
});*/
/*
database.ref('CurrentStatus/' + tempUuid).once('value', function(mediaSnap) {
    console.log(tempUuid + ":");// + mediaSnap.val().onLocation);
    console.log(mediaSnap.val());
    tempAvailability = mediaSnap.val();
});*/

        //tempUser += tempAvailability;

//console.log("here "+tempUser);