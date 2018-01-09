app.controller('errorController', function ($routeParams, $scope)
{
    this.error = $scope.LANG.ERROR;

    if($routeParams.lv){
        this.error = $scope.LANG.PRIVILEGES;
    }
});