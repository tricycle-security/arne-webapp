app.controller('dashboardController', function ($routeParams, $scope, $timeout)
{
    //test information
    this.allUsers = [];
//    this.allUsers.push(testUser);this.allUsers.push(testUser2);

    this.title = "Available BHV";

    var self = this;
    var statusinfo = database.ref().child('currentstatus');
    var userinfo = database.ref().child('userinfo/usergeninfo');

    //Gets users with their onLocation status
    statusinfo.on('child_added', function (snap) {
        var tempSnap = snap.val();
        userinfo.child(snap.val().uuid).on('value', user => {
            var tempUserInfo = user.val();
            var tempUser = {fname: tempUserInfo.fname, lname: tempUserInfo.lname, uuid: tempUserInfo.uuid, onLocation: tempSnap.onLocation};

            self.allUsers.push(tempUser); //allusers contains all userinfo + onLocation
            //console.log(self.allUsers);

            $timeout(function () {
                $scope.$apply();
            });
        });
    });
 });
