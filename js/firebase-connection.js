//Jordi's Firebase
var config = {
    apiKey: "AIzaSyB9vsnSG_L4Cc_io4Z0cGE8_rhR66QBEVk",
    authDomain: "tricycle-41751.firebaseapp.com",
    databaseURL: "https://tricycle-41751.firebaseio.com",
    projectId: "tricycle-41751",
    storageBucket: "tricycle-41751.appspot.com",
    messagingSenderId: "284978501316"
};

var email = "contact@tricycle-sec.nl";
var pass = "Test123!";

console.log("API: Jordi's firebase");

// Initialize the firebase
try {
    firebase.initializeApp(config);
    var database = firebase.database();
    var secondaryApp = firebase.initializeApp(config, "Secondary");
}
catch (Exception)
{
    console.log('firebase already exists');
    console.log(Exception);
}
finally {
    firebaseSet = true;
}

//Sign in
firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
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