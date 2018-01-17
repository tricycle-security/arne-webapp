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
}
finally {
    firebaseSet = true;
}