app.controller('errorController', function ($routeParams, $window, $scope)
{    
    this.error =  $scope.LANG.ERROR;

    if($routeParams.lv){
        this.error =  $scope.LANG.PRIVILEGES;
    } else {
        setTimeout(function () {
            $window.location.href = './#/login';
        }, 2000); //will call the function after 2 secs.

    }
});