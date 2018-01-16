app.controller('cardCoupleController', function ($firebaseArray, $firebaseObject, $scope) {
    var self = this;
    this.card = {}
    var userRef = database.ref().child('userinfo/usergeninfo');
    this.users = $firebaseArray(userRef);
    var cardRef = database.ref().child('cardinfo');
    this.cards = $firebaseArray(cardRef);

    this.cards.$watch(function (event) {
        //add the block
        if (event.event === 'child_added' || event.event === 'child_changed') {
            for (var j = 0; j < self.cards.length; j++) {
                if (self.cards[j].$id === event.key) {
                    if (self.cards[j].uuid !== 'none') {
                        self.cards[j].user = $firebaseObject(database.ref().child('userinfo/usergeninfo').child(self.cards[j].uuid));
                    } else {
                        self.cards[j].user = {
                            fname: 'No user on the card',
                            lname: ''
                        };
                    }
                }
            }
        }
    });
    
    this.selectUser = function (modalId, user) {
        var c = self.card;
        if(user !== 'none'){     
            database.ref().child('cardinfo').child(c.$id).child('status').set('active');
            database.ref().child('cardinfo').child(c.$id).child('uuid').set(self.selectedUser.uuid);
        }else{
            database.ref().child('cardinfo').child(c.$id).child('status').set('inactive');
            database.ref().child('cardinfo').child(c.$id).child('uuid').set('none');
        }
        self.closeModal(modalId);
    };

    this.disableCard = function (modalId) {
        var c = self.card;
        if(self.change === 'enable'){
            database.ref().child('cardinfo').child(c.$id).child('status').set('active');
        }else{
            database.ref().child('cardinfo').child(c.$id).child('status').set('inactive');
        }
        
        self.closeModal(modalId);
    };

    this.setCardUserId = function (modalId, userId) {
        var c = self.card;
        database.ref().child('cardinfo').child(c.$id).child(userId).set(userId);
        self.closeModal(modalId);
    };


    this.openCardModal = function (id, card, change) {//index and user determines which user gets deleted
        $("#" + id).show();
        self.change = change;
        self.card = card;
    }

    this.closeModal = function (id) {
        $("#" + id).hide();
        self.card = {}
    }
});


