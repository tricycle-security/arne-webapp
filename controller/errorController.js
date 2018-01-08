app.controller('errorController', function ($routeParams, $window)
{    
    this.error = "Wrong email or password try again.";

    if($routeParams.lv){
        this.error = "You do not have the privilege level required to access this page";
    } else {
        setTimeout(function () {
            $window.location.href = './#/login';
        }, 2000); //will call the function after 2 secs.
    }
});