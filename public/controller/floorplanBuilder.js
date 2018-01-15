app.controller('floorplanbuilderController', function ($firebaseArray, $scope, $sce)
{
    var self = this;
    this.section = {}
    this.selectedSection = {};
    this.baseSections = {}
    var startRef = database.ref().child('building_sections').orderByChild("level").startAt(0).endAt(0);
    this.baseLevels = $firebaseArray(startRef);

    this.selectSection = function (section) {
        for (var i = 0; i < section.children.length; i++) {
            if (section.children[i].$id === section.selectedSectionId) {
                var tempSection = section.children[i];
                var tempRef = database.ref().child('building_sections').orderByChild("parentId").startAt(tempSection.$id).endAt(tempSection.$id);
                var tempSectionObject = {
                    id: section.selectedSectionId,
                    name: tempSection.name,
                    level: tempSection.level,
                    parentId: section.$id,
                    children: $firebaseArray(tempRef)
                }
                tempSectionObject.children.$watch(function (event) {
                        if (tempSectionObject.selectedSectionId !== null && tempSectionObject.selectedSectionId === event.key) {
                            if (event.event === 'child_changed') {                               
                                for(var j = 0; j < tempSectionObject.children.length; j++){
                                    if(tempSectionObject.children[j].$id === event.key){
                                        tempSectionObject.selectedSections[0].name = tempSectionObject.children[j].name;
                                    }
                                }
                            }
                            if (event.event === 'child_removed') {
                                delete tempSectionObject.selectedSectionId;
                                delete tempSectionObject.selectedSections;
                            }
                        }
                    });
                section.selectedSections = [tempSectionObject]
                console.log(section.children[i])
                //TODO remove section if it is removed
//                section.children[i].$watch(function (event) {
//                    console.log(event);
//                });

                break;
            }
        }
    }

    this.addSection = function (modalId, name, level, parentId) {
        var tempSection = {
            level: level,
            name: name,
        }
        if (parentId !== null)
            tempSection.parentId = parentId;

        var id = firebase.database().ref().child('building_sections').push().key.replace(/-/g, "").replace(/_/g, "");
        database.ref().child('building_sections').child(id).set(tempSection);

//        self.closeModal(modalId);
    }

    this.removeSection = function (section, modalId) {
        var sectionId = section.id;
        var removeSections = $firebaseArray(database.ref().child('building_sections').orderByChild("parentId").startAt(sectionId).endAt(sectionId));
        try {
            removeSections.$loaded()
                    .then(function (x) {
                        for (var i = 0; i < removeSections.length; i++) {
                            var tempSectionObject = {
                                id: removeSections[i].$id
                            };
                            self.removeSection(tempSectionObject, modalId)
                        }

                    })
                    .catch(function (error) {
                        console.log("Error:", error);
                    });
        }
        catch (err) {
            console.log(err)
        }
        finally {
            database.ref().child('building_sections').child(sectionId).remove();
            self.closeModal(modalId);
        }

    }


    this.baseLevels.$watch(function (event) {
        //add the block
        if (event.event === 'child_added') {
            for (var i = 0; i < self.baseLevels.length; i++) {
                //if section id equals the added one:
                if (self.baseLevels[i].$id === event.key) {
                    var tempSection = self.baseLevels[i];
                    var tempRef = database.ref().child('building_sections').orderByChild("parentId").startAt(tempSection.$id).endAt(tempSection.$id);
                    //fill the baselevel object with the info
                    var tempSectionObject = {
                        id: tempSection.$id,
                        name: tempSection.name,
                        level: tempSection.level,
                        parentId: -1,
                        children: $firebaseArray(tempRef)
                    }
                    tempSectionObject.children.$watch(function (event) {
                        if (tempSectionObject.selectedSectionId !== null && tempSectionObject.selectedSectionId === event.key) {
                            if (event.event === 'child_changed') {                               
                                for(var j = 0; j < tempSectionObject.children.length; j++){
                                    if(tempSectionObject.children[j].$id === event.key){
                                        self.baseSections[tempSectionObject.id].selectedSections[0].name = tempSectionObject.children[j].name;
                                    }
                                }
                            }
                            if (event.event === 'child_removed') {
                                delete tempSectionObject.selectedSectionId;
                                delete tempSectionObject.selectedSections;
                            }
                        }
                    });
                    self.baseSections[tempSection.$id] = tempSectionObject;
                }
            }
        }
        //update the block
        if (event.event === 'child_changed') {
            for (var i = 0; i < self.baseLevels.length; i++) {
                if (self.baseLevels[i].$id === event.key) {
                    //TODO check other things that can update
                    var tempSection = self.baseLevels[i];
                    self.baseSections[tempSection.$id].name = tempSection.name;
                }
            }
        }
        //remove the section
        if (event.event === 'child_removed') {
            delete self.baseSections[event.key];
        }
    });

    this.openModal = function (id) {//id is which modal to use
        $("#" + id).show();
    }

    this.openModal = function (id, section) {//index and user determines which user gets deleted
        $("#" + id).show();
        self.section = section;
    }

    this.closeModal = function (id) {
        $("#" + id).hide();
        self.section = {}
    }


});