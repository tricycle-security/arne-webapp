app.controller('errorController', function ($routeParams)
{    
    this.error = "error";

    if($routeParams.lv){
        this.error = "You do not have the privilege level required to access this page";
    }
});