app.controller('alertController', function ($routeParams, $scope, $timeout)
{
    console.log('alertController')
    this.title = "Alerts!"
    
    this.alerts = [
    ]
    

    
    var config = {
    apiKey: "AIzaSyB9vsnSG_L4Cc_io4Z0cGE8_rhR66QBEVk",
    authDomain: "tricycle-41751.firebaseapp.com",
    databaseURL: "https://tricycle-41751.firebaseio.com",
    projectId: "tricycle-41751",
    storageBucket: "tricycle-41751.appspot.com",
    messagingSenderId: "284978501316"
    };
//    firebase.initializeApp(config);
    
    
//
//    var email = "0889529@hr.nl";
//    var pass = "toor12";

    var database = null
    // Initialize the firebase
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
    }
    
    var email = "contact@tricycle-sec.nl"
    var pass = "<nope!>"
    
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("authError Here:");
        console.log(errorCode);
        console.log(errorMessage);
    });
    
    var self = this
    function retrieveAlerts(){
        var alertRef = database.ref().child('alerts');
        alertRef.on('child_added', function(snap){
        
            var tempAlert = snap.val();
            console.log(tempAlert)
//            var tempAlertObject = {active: tempAlert.active, description: tempAlert.description, id: tempAlert.id, kind: tempAlert.kind, location: tempAlert.location, time: tempAlert.time};

            self.alerts.push(snap.val()); //allusers contains all userinfo + onLocation

            $timeout(function (){
                $scope.$apply();
            });
        
        });
        alertRef.on('child_changed', function(snap){
            console.log(snap.val())
            for (var i = 0; i < self.alerts.length; i++) {
                if(self.alerts[i].id === snap.val().id){
                    self.alerts[i] = snap.val()
                    $timeout(function (){
                        $scope.$apply();
                    });
                    break;
                }
            }
        
        });
    }

    var notRunning = true

    firebase.auth().onAuthStateChanged(function(user) {
    if (user && notRunning) {
        notRunning = false;
        console.log('logged in!')
        retrieveAlerts();
        
    } else {
        console.log('not logged in!')
    }
    });
});
