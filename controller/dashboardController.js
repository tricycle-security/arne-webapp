app.controller('dashboardController', function ($routeParams, $scope, $timeout)
{
    var testUser = {fname: "Test", lname: "Testing", uuid: 1}
    var testUser2 = {fname: "Test", lname: "Testing", uuid: 1}
    this.allUsers = [];
    this.allUsers.push(testUser);this.allUsers.push(testUser2);

    this.text = "hello world";

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
    try{
        firebase.initializeApp(config);
        var database = firebase.database();
    }
    catch(Exception)
    {
        console.log('firebase already exists');
        console.log(Exception);
    }
    finally {
        firebaseSet = true;
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
    
    var self = this;
    database.ref('Userinfo/usergeninfo').on("child_added", function (data){
        var tempData = data.val();
        var tempUser = {fname: tempData.fname, lname: tempData.lname, uuid: tempData.uuid};

        self.allUsers.push(tempUser);
        //console.log(self.allUsers);

        $timeout(function (){
            $scope.$apply();
        });

    });
});
