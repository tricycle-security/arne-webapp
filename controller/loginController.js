app.controller('loginController', function ($scope, $rootScope, $window, Auth, USER_ROLES, AUTH_EVENTS)
{    
    this.text = "title";
    this.isLoggedIn = $rootScope.isLoggedIn;
    console.log($rootScope.isLoggedIn);

    $scope.submit = function() {
      if ($scope.username) {
          database.ref('userinfo/usergeninfo/').on("child_added", function (data) {
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
    };
});
