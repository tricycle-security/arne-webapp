app.controller('stageController', function ($scope, $timeout)
{
    this.event = '/appelpop';
    this.associations =
            [
            ];
    this.stages = [];

    var config = {
        apiKey: "AIzaSyD8suoQjYrq58S3yHoA7HoXqIVy3HJiJYM",
        authDomain: "festivalapp-9e0ae.firebaseapp.com",
        databaseURL: "https://festivalapp-9e0ae.firebaseio.com",
        storageBucket: "festivalapp-9e0ae.appspot.com",
        messagingSenderId: "423570948804"
    };

    try{
        firebase.initializeApp(config);
    }
    catch(Exception)
    {
        console.log('firebase already exists');
        console.log(Exception);
    }
    finally {
        firebaseSet = true;
    }

    var associationsFb = firebase.database().ref(this.event + '/associations');

    var self = this;

    try {
        associationsFb.on('child_added', function (data) {

            //console.log(data.val());

            //console.log(JSON.stringify(data.val()));
            var addAssociation =
                    {
                        description: data.val().description,
                        lat: data.val().latitude,
                        lng: data.val().longitude,
                        id: data.val().id,
                        name: data.val().name

                    };
            self.associations.push(addAssociation);
            $timeout(function () {
                $scope.$apply();
            });

        });
    } catch (er)
    {
        console.log("firebase error");
    }

    this.getStages = function ()
    {
        while (this.associations.length === null)
        {
        }
        this.stages = this.associations;
    };



}
);