app.controller('logoutController', function ($scope, $rootScope)
{    
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
});

 /*$scope.submit = function() {
      if ($scope.username) {
        database.ref('userinfo/usergeninfo/').on("child_added", function (data){
            var tempData = data.val();
            var tempUser = {fname: tempData.fname, lname: tempData.lname, uuid: tempData.uuid};

            if(tempData.fname == $scope.username && tempData.lname == $scope.password){
                $rootScope.isLoggedIn = true;
                $rootScope.privilege = USER_ROLES.admin;
                console.log(AUTH_EVENTS.loginSuccess);
                //redirect after login
                $window.location.href = './#/';
            } else {
                console.log(AUTH_EVENTS.loginFailed);
            }
        });
        //empty input fields
        //$scope.username = '';
        //$scope.password = '';
      }
    };*/