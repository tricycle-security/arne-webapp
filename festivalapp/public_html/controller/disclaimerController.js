app.controller('disclaimerController', function ($scope) {
    this.event = '/appelpop';
    var self = this;
    this.disclaimer = '<div>test</div>';
    
    
    var config = {
        apiKey: "AIzaSyD8suoQjYrq58S3yHoA7HoXqIVy3HJiJYM",
        authDomain: "festivalapp-9e0ae.firebaseapp.com",
        databaseURL: "https://festivalapp-9e0ae.firebaseio.com",
        storageBucket: "festivalapp-9e0ae.appspot.com",
        messagingSenderId: "423570948804"
    };

    try {
        firebase.initializeApp(config);
    } catch (Exception)
    {
        console.log('firebase already exists');
        console.log(Exception);
    } finally {
        firebaseSet = true;
    }

    var disclaimerFb = firebase.database().ref(this.event);
    disclaimerFb.on('child_added', function (data) {
        var htmlstring = '';
//        console.log(data.val());
        if (data.val()[0] === '<') {
            for (var i = 0; i < data.val().length; i++) {
                htmlstring += data.val()[i];
               
            }
            
//            htmlstring = htmlstring.substring(htmlstring.indexOf("</head>") + 7);
            htmlstring = htmlstring.replace("padding: 20px", "");
            //console.log("htmlstring: " + htmlstring);
//            console.log(htmlstring);
//            console.log(self.disclaimer);
////            self.disclaimer = htmlstring;
//            $scope.$apply();
            document.getElementById('disclaimer-div').innerHTML = htmlstring;
        }

        
    });
});
