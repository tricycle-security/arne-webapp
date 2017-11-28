// Initialize Firebase
var email = "";
var pass = "";

if (0) {
  //Tricycle
  var config = {
    apiKey: "AIzaSyB9vsnSG_L4Cc_io4Z0cGE8_rhR66QBEVk",
    authDomain: "tricycle-41751.firebaseapp.com",
    databaseURL: "https://tricycle-41751.firebaseio.com",
    projectId: "tricycle-41751",
    storageBucket: "tricycle-41751.appspot.com",
    messagingSenderId: "284978501316"
  };     

  email = "contact@tricycle-sec.nl"
  pass = "Test123!";

  console.log("API: Tricycle firebase");
} else{
  //Jordi's Firebase
  var config = {
    apiKey: "AIzaSyByv741uQXo8RsFtML7ASYpYvMeYmOadfg",
    authDomain: "ye-olde-project.firebaseapp.com",
    databaseURL: "https://ye-olde-project.firebaseio.com",
    projectId: "ye-olde-project",
    storageBucket: "ye-olde-project.appspot.com",
    messagingSenderId: "1006813715006"
  };

  email = "0889529@hr.nl";
  pass = "toor12";

  console.log("API: Jordi's firebase");
}

// Initialize the default app
var defaultApp = firebase.initializeApp(config);
//console.log(defaultApp.name);  // get default name "[DEFAULT]"
var database = firebase.database();

//example angularJS controllers
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    };

    $scope.test = "here";

    var ref = firebase.database().ref();

    ref.on("value", function(snapshot) {
      // This isn't going to show up in the DOM immediately, because
      // Angular does not know we have changed this in memory.
      // $scope.data = snapshot.val();
      // To fix this, we can use $scope.$apply() to notify Angular that a change occurred.
      $scope.$apply(function() {
        $scope.data = snapshot.val();
      });
    });
  });

//Sign in

firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log("authError Here:");
  console.log(errorCode);
  console.log(errorMessage);
  // ...
});

//Sign out

/*firebase.auth().signOut().then(function() {
  console.log("Sign-out successful.");
}).catch(function(error) {
  console.log("An error happened.");
});*/

//Database

var userId = "alovelace";
var name = "Ada Lovelace";
var email = "abc";
var imageUrl = "hereeeeee";

//set() query

function writeUserData(userId, name) {
  database.ref('/users/' + userId).set({
    username: name
  });
  console.log("performing set() function on /users/*");
}
writeUserData(userId, name);

//read Database

database.ref('/users/' + userId).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  
  console.log("getting username for DB: ");
  console.log(username);
});
