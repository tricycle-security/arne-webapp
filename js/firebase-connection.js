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

//create basic tables and info
/*var uuid = 4;

database.ref("/Userinfo/" + "usergeninfo/" + uuid).set({
fname: '123',
lname: '456',
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
});*/