app.controller('dashboardController', function ($scope, $timeout)
{
    //test information
    this.allUsers = [];

    this.title = "Available BHV";

    var self = this;
    var statusinfo = database.ref().child('currentstatus');
    var userinfo = database.ref().child('userinfo/usergeninfo');
    

    //Gets users with their onLocation status
    statusinfo.on('child_added', function (snap) {
        var tempSnap = snap.val();
        userinfo.child(snap.val().uuid).on('value', user => {
            var tempUserInfo = user.val();
        if (tempUserInfo != null) {
            var tempUser = {fname: tempUserInfo.fname, lname: tempUserInfo.lname, uuid: tempUserInfo.uuid, onLocation: tempSnap.onLocation};

            self.allUsers.push(tempUser); //allusers contains all userinfo + onLocation

            $timeout(function () {
                $scope.$apply();
            });
        }
        });
    });
    statusinfo.on('child_changed', function (snap) {
        var tempSnap = snap.val();
        var users = self.allUsers;
        for(var i = 0; i < users.length; i++){
            if(tempSnap.uuid === users[i].uuid){
                users[i].onLocation = tempSnap.onLocation
                $timeout(function () {
                $scope.$apply();
                });
                break;
            }
        }
        
    });
    

 });
