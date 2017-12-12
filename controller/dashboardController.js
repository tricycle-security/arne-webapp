app.controller('dashboardController', function ($routeParams, $scope, $timeout)
{
    //test information
    var testUser = {fname: "Test", lname: "Testing", uuid: 1, onLocation: true}
    var testUser2 = {fname: "Test", lname: "Testing", uuid: 1, onLocation: false}
    this.allUsers = [];
    this.allUsers.push(testUser);this.allUsers.push(testUser2);

    this.title = "Available BHVs";
    
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
            //console.log(self.allUsers);

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