app.controller('alertController', function ($scope, $timeout)
{
    this.editableAlert = {
    }
    
    this.title = "Alerts!"

    this.alerts = []

    var self = this
    function retrieveAlerts() {
        var alertRef = database.ref().child('alerts');
        alertRef.on('child_added', function (snap) {

            var tempAlert = snap.val();
            self.alerts.push(snap.val()); //allusers contains all userinfo + onLocation

            $timeout(function () {
                $scope.$apply();
            });

        });
        alertRef.on('child_changed', function (snap) {
            for (var i = 0; i < self.alerts.length; i++) {
                if (self.alerts[i].id === snap.val().id) {
                    self.alerts[i] = snap.val()
                    $timeout(function () {
                        $scope.$apply();
                    });
                    break;
                }
            }

        });
        alertRef.on('child_removed', function (snap) {
            for (var i = 0; i < self.alerts.length; i++) {
                if (self.alerts[i].id === snap.val().id) {
                    self.alerts.splice(i, 1);
                    $timeout(function () {
                        $scope.$apply();
                    });
                    break;
                }
            }

        });
    }
    
    this.createAlert = function (alert) {
        if (alert != null) {
            alert.active = true
            var id = firebase.database().ref().child('alerts').push().key;
            alert.id = id;
            alert.time = (new Date).getTime();
            self.sendAlert(alert)
        }
    }

    this.sendAlert = function (alert) {
        if (alert != null) {
            firebase.database().ref('alerts/' + alert.id).set(alert);
        }
    }
    this.selectAlert = function (alert) {
        self.editableAlert = alert
        
    }
    this.editAlert = function (alert) {
        self.editableAlert = alert
        self.sendAlert(alert)
        
    }

    var notRunning = true

    firebase.auth().onAuthStateChanged(function (user) {
        if (user && notRunning) {
            notRunning = false;
            retrieveAlerts();
        }
    });
});
