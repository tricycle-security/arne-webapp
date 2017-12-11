app.controller('loginController', function ($scope, $window, Auth, USER_ROLES, AUTH_EVENTS)
{
    //get Constants from app
    //this.text = USER_ROLES.admin;
    //this.text = AUTH_EVENTS.loginSuccess;

    //Use service Auth
    //Auth.setUser('her');
    //console.log(Auth.isLoggedIn());
    
    if(Auth.isLoggedIn()){
        console.log("Logged in right now");
    }

    $scope.submit = function() {
      if ($scope.username) {
        database.ref('Userinfo/usergeninfo/').on("child_added", function (data){
            var tempData = data.val();
            var tempUser = {fname: tempData.fname, lname: tempData.lname, uuid: tempData.uuid};

            if(tempData.fname == $scope.username && tempData.lname == $scope.password){
                console.log("OK");
                //redirect after login
                $window.location.href = './#/login';
            }
        });
        //empty input fields
        $scope.username = '';
        $scope.password = '';
      }
    };
});
