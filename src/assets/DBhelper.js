//test info
var tableName = "/users/";
var userIds = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
var names = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
var availabilties = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];

//example set() query:

function writeUserData(tableName, userId, name) {
  database.ref(tableName + userId).set({
    username: name,
    availabilty: 1
  });
  console.log("performing set() function on /users/" + userId);
}

for (var i = 0; i < userIds.length; i++) {
  //example structure
  //users
  //--userId
  //----name
  writeUserData(tableName, userIds[i], names[i], 1);
}

//read Database example

function getUserById(userId) {
  database.ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    
    console.log("Getting username from DB: " + username);
  });
}

for (var i = 0; i < userIds.length; i++) {
  getUserById(userIds[i]);
}