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

//test info

var uuid = 2;

database.ref("/Userinfo/" + "usergeninfo/" + uuid).set({
  fname: 'Jordi',
  lname: 'Luijk',
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

//read Database example

function getUserByUuid(userUuid) {
  database.ref('/Userinfo/' + 'usergeninfo/' + userUuid).once('value').then(function(snapshot) {
    var uuid = (snapshot.val() && snapshot.val().uuid) || 'Anonymous';
    console.log("Getting username from DB: " + uuid);
    console.log(snapshot.val().uuid);

    snapshot.forEach(function(child) {
      console.log(child.key+': '+child.val());
      /*var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.innerText = child.val().email + " --- " + JSON.stringify(child.val());
      tr.appendChild(td);
      table.appendChild(tr);*/
    });
  });
}

getUserByUuid(2);


//example angularJS controllers
var app = angular.module('dashboardApp', []).controller('dashboardCtrl', function($scope) {
  $scope.firstName = "John";
  $scope.lastName = "Doe";
  $scope.fullName = function() {
      return $scope.firstName + " " + $scope.lastName;
  };
  $scope.cars = ["BMW", "Volvo", "Saab"];
});