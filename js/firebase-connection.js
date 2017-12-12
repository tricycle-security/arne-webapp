//Jordi's Firebase
var config = {
    apiKey: "AIzaSyB9vsnSG_L4Cc_io4Z0cGE8_rhR66QBEVk",
    authDomain: "tricycle-41751.firebaseapp.com",
    databaseURL: "https://tricycle-41751.firebaseio.com",
    projectId: "tricycle-41751",
    storageBucket: "tricycle-41751.appspot.com",
    messagingSenderId: "284978501316"
};

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
var developerMode = true;
if(developerMode){//if true no need to log in every time while testing
    console.log("Developer Mode");
    
    var email = "contact@tricycle-sec.nl";
    var pass = "Test123!";

    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("authError Here:");
        console.log(errorCode);
        console.log(errorMessage);
    });
} else{
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}