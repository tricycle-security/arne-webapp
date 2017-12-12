app.service('Auth', function() {
    this.isLoggedIn = function (x) {
		if(x){
			console.log("Logged in right now");
		} else{
			console.log("Logged out right now");
		}
    }
});