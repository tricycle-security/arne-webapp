app.controller('alertController', function ($routeParams, $scope, $timeout, $sce)
{
    this.title = "Current alerts: ";

    this.editableAlert = {
    }
    
    $scope.CHESTPAINSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M78.247,93.46c0,0,1.215,0.089,1.575-0.408c0.412-0.568,0.389-1.565,0.389-1.565v-38.86c0-7.522-5.613-13.228-15.59-16.116  c-3.608,4.282-8.737,6.965-14.422,6.965c-5.724,0-10.886-2.72-14.498-7.054c-10.177,2.857-15.913,8.602-15.913,16.205v38.015  c0,2.096,0.31,2.818,3.045,2.818 M31.406,86.904h-5.917V53.577c0-5.853,0.938-7.445,5.917-9.466V86.904z M46.105,65.789H40.14  l-1.764-22.231L46.105,65.789z M51.262,86.904h-9.447l-1.334-16.82h9.83c5.288,0,9.126,3.041,9.126,8.539  C59.436,84.656,55.033,86.904,51.262,86.904z M34.143,22.391c0-8.758,7.1-15.857,15.857-15.857s15.857,7.099,15.857,15.857  c0,8.758-7.1,15.857-15.857,15.857S34.143,31.149,34.143,22.391z"/></svg>'    
    $scope.EDITSVG ='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#B52828;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}</style><g><path d="M20.5,75.9l-0.7,4.9c0,0.1,0,0.2,0.1,0.3c0,0,0.1,0.1,0.3,0.1l4.5-0.6c0.5-0.1,0.8-0.6,0.6-1.1c-0.7-1.7-2-3.2-3.6-4.2   C21.2,75.1,20.6,75.4,20.5,75.9z"/><path d="M59.8,29.9c-1.8-0.7-3.7-1.1-5.6-1.1c-0.2,0-0.4,0.1-0.6,0.2L24.8,57.7c-0.5,0.5-0.2,1.2,0.4,1.4c1.7,0.3,3.3,0.8,4.9,1.6   c0.3,0.1,0.7,0.1,0.9-0.2l29.2-29.2C60.6,30.8,60.4,30.1,59.8,29.9z"/><path d="M63,19.8l-0.7,0.7l-5.3,5.3c-0.5,0.5-0.2,1.2,0.4,1.4c3.9,0.7,7.5,2.7,10.4,5.6c3.1,3.1,5.1,7.1,5.7,11.3   c0.1,0.7,0.9,0.9,1.4,0.4l5.6-5.6c0.1-0.1,0.2-0.3,0.2-0.6c0.2-4.9-1.8-9.7-5.3-13.2C71.9,21.7,67.6,19.8,63,19.8z"/><path d="M39.6,78c-0.2-4.4-2-8.7-5.3-12c-3-3-6.8-4.8-10.8-5.2c-0.4,0-0.8,0.3-0.9,0.7l-1.6,10.6c-0.1,0.4,0.1,0.7,0.5,0.9   c2.8,1.3,5,3.7,5.9,6.6c0.1,0.4,0.5,0.6,0.9,0.6l10.6-1.4C39.4,78.8,39.7,78.4,39.6,78z"/><path d="M66.3,34.1c-0.9-0.9-1.9-1.7-2.9-2.4c-0.3-0.2-0.7-0.2-1,0.1L33,61.2c-0.4,0.4-0.3,0.9,0.1,1.2c0.9,0.7,1.8,1.4,2.6,2.2   c1,1,1.9,2.1,2.7,3.3c0.3,0.4,0.9,0.5,1.3,0.1L69,38.8c0.3-0.3,0.3-0.7,0.1-1C68.4,36.5,67.4,35.2,66.3,34.1z"/><path d="M69.5,41.1L40.3,70.3c-0.2,0.2-0.3,0.6-0.2,0.9c0.6,1.5,1.1,3.1,1.3,4.8c0.1,0.7,0.9,0.9,1.4,0.4l28.5-28.5   c0.1-0.1,0.2-0.3,0.2-0.6c0.1-2-0.2-3.9-0.8-5.8C70.6,40.9,69.9,40.7,69.5,41.1z"/></g></svg>'
    $scope.DESCRIPTIONSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 90 112.5" version="1.1" x="0px" y="0px"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill-rule="nonzero" fill="#000000"><path d="M8.04955162,61.619788 C7.46990027,61.619788 7,61.1499243 7,60.570318 C7,59.9907118 7.46990027,59.5208481 8.04955162,59.5208481 L80.9504484,59.5208481 C81.5300997,59.5208481 82,59.9907118 82,60.570318 C82,61.1499243 81.5300997,61.619788 80.9504484,61.619788 L8.04955162,61.619788 Z M8.04955162,72 C7.46990027,72 7,71.5301363 7,70.95053 C7,70.3709238 7.46990027,69.9010601 8.04955162,69.9010601 L43.2928439,69.9010601 C43.8724952,69.9010601 44.3423955,70.3709238 44.3423955,70.95053 C44.3423955,71.5301363 43.8724952,72 43.2928439,72 L8.04955162,72 Z M8.04955162,51.239576 C7.46990027,51.239576 7,50.7697123 7,50.190106 C7,49.6104998 7.46990027,49.140636 8.04955162,49.140636 L80.9504484,49.140636 C81.5300997,49.140636 82,49.6104998 82,50.190106 C82,50.7697123 81.5300997,51.239576 80.9504484,51.239576 L8.04955162,51.239576 Z M8.04955162,40.859364 C7.46990027,40.859364 7,40.3895002 7,39.809894 C7,39.2302877 7.46990027,38.760424 8.04955162,38.760424 L80.9504484,38.760424 C81.5300997,38.760424 82,39.2302877 82,39.809894 C82,40.3895002 81.5300997,40.859364 80.9504484,40.859364 L8.04955162,40.859364 Z M8.04955162,30.4791519 C7.46990027,30.4791519 7,30.0092882 7,29.429682 C7,28.8500757 7.46990027,28.380212 8.04955162,28.380212 L80.9504484,28.380212 C81.5300997,28.380212 82,28.8500757 82,29.429682 C82,30.0092882 81.5300997,30.4791519 80.9504484,30.4791519 L8.04955162,30.4791519 Z M8.04955162,20.0989399 C7.46990027,20.0989399 7,19.6290762 7,19.04947 C7,18.4698637 7.46990027,18 8.04955162,18 L80.9504484,18 C81.5300997,18 82,18.4698637 82,19.04947 C82,19.6290762 81.5300997,20.0989399 80.9504484,20.0989399 L8.04955162,20.0989399 Z"/></g></g></svg>'
    $scope.INJURYSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M78.247,93.46c0,0,1.215,0.089,1.575-0.408c0.412-0.568,0.389-1.565,0.389-1.565v-38.86c0-7.522-5.613-13.228-15.59-16.116  c-3.608,4.282-8.737,6.965-14.422,6.965c-5.724,0-10.886-2.72-14.498-7.054c-10.177,2.857-15.913,8.602-15.913,16.205v38.015  c0,2.096,0.31,2.818,3.045,2.818 M31.406,86.904h-5.917V53.577c0-5.853,0.938-7.445,5.917-9.466V86.904z M46.105,65.789H40.14  l-1.764-22.231L46.105,65.789z M51.262,86.904h-9.447l-1.334-16.82h9.83c5.288,0,9.126,3.041,9.126,8.539  C59.436,84.656,55.033,86.904,51.262,86.904z M34.143,22.391c0-8.758,7.1-15.857,15.857-15.857s15.857,7.099,15.857,15.857  c0,8.758-7.1,15.857-15.857,15.857S34.143,31.149,34.143,22.391z"/></svg>'
    $scope.HEADINJURYSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><path d="M50.7254028,21.4718628l6.6448364-3.9120483c-1.2418213-0.546875-2.4689941-0.9049683-3.569397-1.1350708   l-6.9833984,4.6206665L50.7254028,21.4718628z"/><path d="M73.3339844,71.046875c-9.078125-2.284668-13.6806641-7.1035156-13.6806641-14.3212891   c0-3.7358398,1.4267578-7.6123047,1.4882812-7.7753906c0.2578125-0.6918945,0.9814453-1.0913086,1.7011719-0.9472656   c0.5351562,0.1098633,1.7998047,0.3662109,3.4199219-3.7563477c1.4121094-3.5961914-0.3603516-4.5073242-0.3779297-4.515625   c-0.6318359-0.2822266-0.9882812-0.9599609-0.8632812-1.6401367c0.0455933-0.2480469,0.0678711-0.4780884,0.1083984-0.72229   L34.4536743,33.821106c0.0906372,1.357605,0.2487793,2.7681885,0.5248413,4.2697144   c0.125,0.6801758-0.2314453,1.3579102-0.8632812,1.6401367c-0.1503906,0.0800781-1.7460938,1.03125-0.3779297,4.515625   c1.6181641,4.1225586,2.8808594,3.8662109,3.4199219,3.7563477c0.7226562-0.144043,1.4443359,0.2553711,1.7011719,0.9472656   c0.0615234,0.1630859,1.4882812,4.0395508,1.4882812,7.7753906c0,7.2177734-4.6025391,12.0366211-13.6806641,14.3212891   C15.3232422,73.9023438,12.4169922,78.0083008,12.0439453,84h75.9121094   C87.5830078,78.0083008,84.6767578,73.9023438,73.3339844,71.046875z"/><path d="M60.326416,19.2977295c-0.0060425,0.0036621-0.0107422,0.008728-0.0168457,0.0123291l-4.5964355,2.7061157   l7.7747803,0.8483887c-0.3458252-0.5858154-0.7246094-1.1439819-1.1539307-1.6594849   C61.7180786,20.4657593,61.0369873,19.8423462,60.326416,19.2977295z"/><path d="M42.1497192,20.5360718l6.793457-4.4949951c-2.2150879,0.1501465-6.8515015,0.8692627-10.2794189,4.114624   L42.1497192,20.5360718z"/><path d="M65.4242554,28.7973633c-0.1295166-0.972168-0.3155518-1.8986816-0.5740356-2.7661133l-28.3743286-3.0963135   c-0.4175415,0.7172241-0.7589111,1.4978027-1.0521851,2.3181152L65.4242554,28.7973633z"/><path d="M34.3964844,30.7943115l31.1064453,3.597168c0.0743408-0.880249,0.1102905-1.7301636,0.1090698-2.5509033   l-30.9606323-3.6577148C34.5148315,29.0119019,34.4346924,29.8864136,34.3964844,30.7943115z"/></g></svg>'
    $scope.FIRESVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M89.085,68.352c-8.186-7.921-8.748-17.386-7.061-27.573c0.495-2.998,1.456-5.916,2.24-9.013  c-2.252,0.119-3.648,0.814-4.75,2.409c-2.162,3.132-4.451,6.177-6.789,9.181c-2.056,2.636-3.697,1.667-4.842-0.861  c-0.499-1.101-0.816-2.338-0.952-3.544c-0.639-5.644-1.297-11.29-1.74-16.952C64.568,13.993,59.306,7.23,51.37,5  c6.895,14.707-2.387,24.716-9.772,36.043c-0.853-6.915-1.721-13.066-6.147-17.961c-1.349,1.281-1.448,2.743-1.265,4.228  c0.42,3.434-0.496,6.757-1.654,9.793C29.56,44.906,24.738,51.714,19.98,58.52c-2.63,3.762-5.658,7.323-8.1,11.204l0.005-0.017  c-9.039,12.537-5.18,20.812-5.18,20.812l0.001-0.01c0.306,0.83,0.74,1.666,1.357,2.514c1.389-2.172,3.158-4.214,5.241-6.1  c1.813-2.446,4.486-3.967,6.783-5.883c3.442-2.873,6.79-5.82,9.413-9.641c1.271,1.171-0.111,2.772,0.946,3.774  c4.368-1.938,7.932-7.221,10.807-16.227c2.588,5.413-0.589,10.234-0.639,15.166l0.277,0.26c7.204-6.527,9.166-15.043,9.239-24.284  c0.03-3.935,0.247-7.829,3.62-11.727c0.138,9.871,3.742,18.219,5.737,27.831c1.742-4.171,2.318-8.061,5.648-11.372  c0.397,4.725-0.326,8.87,0.782,12.892c1.097,3.979,3.14,7.114,6.168,9.421c1.019,0.777,2.152,1.463,3.398,2.052  c0.757,0.359,1.73,1.132,2.536,0.165c0.012-0.014,0.025-0.021,0.037-0.036c0.594-0.755-0.058-1.543-0.328-2.286  c-1.508-4.167-2.956-8.341-1.384-12.991c0.395,6.849,4.022,11.508,9.258,15.496c1.958,1.492,3.528,3.427,4.648,5.654  c0.082,1.133,1.056,13.894,2.426,8.483c0.536-2.121,0.809-3.443,0.943-4.271C95.004,82.167,93.475,72.602,89.085,68.352z"/></svg>'
    $scope.FLOORPLANSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 156.25" style="enable-background:new 0 0 100 125;" xml:space="preserve"><path d="M86,24.5H14c-1.1,0-2,0.9-2,2v71.9c0,1.1,0.9,2,2,2h43.6c1.1,0,2-0.9,2-2s-0.9-2-2-2h-8.9v-2.3c0-0.6-0.5-1.1-1.1-1.1  s-1.1,0.5-1.1,1.1v2.3H16V63.6h30.3v17.6c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1V63.6h1.5c0.6,0,1.1-0.5,1.1-1.1  c0-0.3-0.1-0.5-0.3-0.7l14.4-14.4v5.5c0,0-0.1,0.1-0.1,0.1l-8.7,8.7c-0.2,0.2-0.3,0.5-0.3,0.8c0,0.3,0.1,0.6,0.3,0.8  c0.2,0.2,0.5,0.3,0.8,0.3s0.6-0.1,0.8-0.3l0.8-0.8l6.5-6.5v0.6v4.5L65,61.5H63c-0.6,0-1.1,0.5-1.1,1c0,0,0,0.1,0,0.1  c0,0.6,0.5,1.1,1.1,1.1h2.3v4.9v6v5.9c0,0.6,0.5,1.1,1.1,1.1s1.1-0.5,1.1-1.1v-4.8H84v20.8h-8.7c-1.1,0-2,0.9-2,2s0.9,2,2,2h10.5  c0,0,0.1,0,0.1,0c0,0,0.1,0,0.1,0c1.1,0,2-0.9,2-2V26.5C88,25.4,87.1,24.5,86,24.5z M16,45.9l17.4-17.4h5.3L16,51.2V45.9z M16,37.5  l8.9-8.9h5.3L16,42.7V37.5z M16,29l0.5-0.5h5.3L16,34.3V29z M41.9,28.5h5.3L16,59.6v-5.3L41.9,28.5z M50.3,28.5h5.3L22.8,61.4h-5.3  L50.3,28.5z M58.8,28.5h5.3L31.2,61.4h-5.3L58.8,28.5z M65.3,30.5v5.3L39.7,61.4h-5.3L65.3,30.5z M67.5,63.7H68h8.2  c0.6,0,1.1-0.5,1.1-1.1c0-0.6-0.5-1.1-1.1-1.1H68h-0.4v-3.7h3.8c0.6,0,1.1-0.5,1.1-1.1s-0.5-1.1-1.1-1.1h-3.8v-27H84v38.9H67.5V63.7  z M48.1,61.4h-0.7h-4.6l22.4-22.4v5.3L48.1,61.4z M67.5,73.4v-3.7H84v3.7H67.5z"/></svg>'
        
    this.svg = $sce.trustAsHtml(this.HTML);
    
    this.buttons = [
        {
            svg: $sce.trustAsHtml($scope.CHESTPAINSVG),
            text: "Chestpain"
        },
        {
            svg: $sce.trustAsHtml($scope.FIRESVG),
            text: "Fire"
        },
        {
            svg: $sce.trustAsHtml($scope.INJURYSVG),
            text: "Injury"
        },
        {
            svg: $sce.trustAsHtml($scope.HEADINJURYSVG),
            text: "Headinjury"
        },
        {
            svg: $sce.trustAsHtml($scope.FLOORPLANSVG),
            text: "Floorplan"
        },
        {
            svg: $sce.trustAsHtml($scope.DESCRIPTIONSVG),
            text: "Description"
        },
        {
            svg: $sce.trustAsHtml($scope.EDITSVG),
            text: "Edit"
        }
    ]
    
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
            $scope.sendAlert(alert)
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


    self.removeAlert = function () {
        alert = self.alert;
        // CHECK THAT ALERT IS PRESENT
        if (alert.id === undefined) return;
        remove('alerts/' + alert.id);
        self.closeModal('custom-modal-delete-alert');
    };

    this.toggleAlertStatus = function (alert) {
        if (alert.id === undefined) return;
        alert.active = !alert.active;
        self.sendAlert(alert);
    };


    function remove(remove) {
        console.log("starting delete");
        database.ref().child(remove).remove()
            .then(function () {
                console.log("Remove succeeded.")
            })
            .catch(function (error) {
                console.log("Remove failed: " + error.message)
            });
    }

    this.openModal = function (id) {//id is which modal to use
        $("#" + id).show();
    }

    this.openModal = function (id, alert) {//index and user determines which user gets deleted
        $("#" + id).show();
        self.alert = alert;
    }

    this.closeModal = function (id) {
        $("#" + id).hide();
    }
});
