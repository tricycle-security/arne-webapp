app.controller('eventController', function ($scope, $localStorage, $timeout)
{


    $scope.$storage = $localStorage;
    try
    {
        var length = $scope.$storage.favEvents.length;
        console.log(length);
    } catch (Exception)
    {
        $scope.$storage.favEvents = [];
    } //find if favEvents exists, if not define it

    this.getTimeHeader = function (dateString)
    {
        var date = new Date(dateString);
        var days = [
            'Zondag',
            'Maandag',
            'Dinsdag',
            'Woensdag',
            'Donderdag',
            'Vrijdag',
            'Zaterdag'
        ];
        var months = [
            'Januari',
            'Februari',
            'Maart',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Augustus',
            'September',
            'Oktober',
            'November',
            'December'
        ];

        return days[date.getDay()] + " - " + date.getDate() + " " + months[date.getMonth()];

    };

    this.isFav = function (stage)
    {
        for (var i = 0; i < $scope.$storage.favEvents.length; i++)
        {
            if ($scope.$storage.favEvents[i].title === stage.title)
            {
                return true;
            }
        }
        return false;
    };


    this.addToFav = function (stage)
    {
        if (!this.isFav(stage))
        {
            $scope.$storage.favEvents.push(stage);
            $scope.$storage.favEvents.sort();
        }
        else
        {
            for (var i = 0; i < $scope.$storage.favEvents.length; i++)
            {
                if ($scope.$storage.favEvents[i].title === stage.title)
                {
                    $scope.$storage.favEvents.splice(i, 1);
                }
            }
        }

    };

    this.currentTab = 'all';


    this.event = '/appelpop';
    this.content =
            {
                events:
                        [
                        ]
            };

    this.events = this.content.events;
    this.associations =
            [
            ];

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

//    '/appelpop/disclaimer'
    var eventsFb = firebase.database().ref(this.event + '/events');
    var associationsFb = firebase.database().ref(this.event + '/associations');
    $scope.events = this.content;
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
    
    var self = this;

    try {
        eventsFb.orderByChild('startTime').on('child_added', function (data) {
            var startDate = new Date(data.val().startTime);
            var endDate = new Date(data.val().endTime);
            var addEvent =
                    {
                        image: data.val().thumbnail,
                        title: data.val().title,
                        beginTime: (startDate.getHours() < 10 ? '0' : '') + startDate.getHours() + ":" + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes(),
                        endTime: (endDate.getHours() < 10 ? '0' : '') + endDate.getHours() + ":" + (endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes(),
                        stage: data.val().associationId,
                        startDate: startDate,
                        endDate: endDate,
                        headerImage: data.val().image,
                        description: data.val().description,
                    };
            
            try{
                self.events.push(addEvent);
                //console.log(JSON.stringify(self.events));
            }
            catch(e)
            {
                console.log(JSON.stringify(self.events));
                self.events = [];
                self.events.push(addEvent);
            }
            $timeout(function () {
                $scope.$apply();
            });
        });
    } catch (er)
    {
        console.log("firebase error");
        console.log(er);
    }




    this.getAllStages = function ()
    {
        return this.content.events;
    };

    this.getStageName = function (stage)
    {
        while (this.associations.length === 0)
        {
        }
        ;

        for (var i = 0; i < this.associations.length; i++)
        {
            if (this.associations[i].id === stage)
            {
                return this.associations[i].name;
            }
        }
    };

    this.getStageData = function (stage)
    {
        while (this.associations.length === 0)
        {
        }
        ;
        for (var i = 0; i < this.associations.length; i++)
        {
            if (this.associations[i].id === stage)
            {
                return this.associations[i];
            }
        }
    };

    this.getLatLong = function (stage)
    {
        while (this.associations.length === 0)
        {
        }
        ;
        for (var i = 0; i < this.associations.length; i++)
        {
            if (this.associations[i].id === stage)
            {
                var array = [];
                array.push(this.associations[i].lat);
                array.push(this.associations[i].lng);
                return array;
            }
        }
    };


    this.getStage = function (stage)
    {
        if (stage === "all")
        {
//            console.log('all');
            this.events = this.content.events;
        }
        else
        {
            if (stage === "fav") {

                this.events = $scope.$storage.favEvents.sort(function(a, b){
                return new Date(a.startDate) - new Date(b.startDate);
            });
            
                for (var i = 0; i < this.events.length; i++)
                {
                    this.events[i].startDate = new Date(this.events[i].startDate);
                }
            }
            else
            {
//            console.log(stage);

                var returnValue = [];
                for (var i = 0; i < this.content.events.length; i++)
                {
                    if (this.content.events[i].stage === stage)
                    {
                        returnValue.push(this.content.events[i]);
                    }
                }
                this.events = returnValue;
           


            }
        }
//        console.log(JSON.stringify(this.events));
    };
    $scope.toDay = function (e) {
        console.log(e.startDate.getDay());
        return e.startDate.getDay();
    };

    this.replaceAllSpaces = function (string)
    {
        var newStr = string.replace(/\s/g, "");
        return newStr;
    };
    
    this.eventNotEnded = function(eventEndDate)
    {
        if(Date.parse(new Date) - Date.parse(eventEndDate) < 0)
        {
            return 'not-ended';
        }
        
    };
    
    this.eventRunning = function(eventStart, eventEnd)
    {
        if(Date.parse(new Date) - Date.parse(eventEnd) < 0 && Date.parse(eventStart) - Date.parse(new Date) < 0)
        {
            return 'running';
        }
    };

//    $scope.minDate = function (arr) {
//        return $filter('minDate')
//                ($filter('map')(arr, 'startDate'));
//    };



});
