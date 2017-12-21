app.controller('menuController', function ($scope, $rootScope, USER_ROLES)
{    
    $scope.userRoles = USER_ROLES;

    $scope.titleLogin = "Login";
    $scope.titleHome = "Home";
    $scope.titleAlerts= "Alerts";
    $scope.titleUsers = "Users";

    $rootScope.privilege = "";
    $rootScope.privilegeLv = 0;

    $rootScope.$watch(function(rootScope) {
        return $rootScope.privilege;
    }, function(newValue, oldValue) {
        setTimeout(function(){
            $rootScope.$apply(function(){
                $scope.privilege = $rootScope.privilege;
                $scope.privilegeLv = $rootScope.privilegeLv;
            })
        }, 1000);
    }, true);
});