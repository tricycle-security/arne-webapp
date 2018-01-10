app.controller('floorplanbuilderController', function ($firebaseArray, $scope, $sce)
{


    var self = this;
    this.test = "test";
    var firstLevelSectionRef = database.ref().child('building_sections').orderByChild("level").startAt(0).endAt(0);
    var sectionsRef = database.ref().child('building_sections');

    this.childSections = {}

    // GET SECTIONS AS AN ARRAY
    this.firstSections = $firebaseArray(firstLevelSectionRef);
    this.sections = $firebaseArray(sectionsRef);
    
    this.firstSections.$watch(function (event) {
        console.log(event)
        if(event.event === 'child_added'){
            self.childSections[event.key] = $firebaseArray(sectionsRef.orderByChild("parentId").startAt(event.key).endAt(event.key));
            self.childSections[event.key].$watch(function (event) {
                console.log("key")
            })
        }
        if(event.event === 'child_changed'){
            
        }
    });



});