app.controller('languageController', function ($rootScope, $scope) {
    var NL = {
//Current Language
        LANGUAGE: "NL",
        
//Menu
        HOME: "Home",
        ALERTS: "Meldingen",
        USERS: "Gebruikers",
        LOGIN: "Inloggen",
        LOGOUT: "Uitloggen",
        FLOORPLANBUILDER: "Plattegrond",
        CARD:"Kaarten",
//Login
        EMAIL: "Email: ",
        PASSWORD: "Password: ",
        SUBMITLOGIN: "Inloggen",
//Home dashboard
        AVAILABLEBHV: "Beschikbare BHV'ers",
        NAME: "Naam",
        AVAILABILITY: "Beschikbaar",
        AVAILABLE: "Aanwezig",
        UNAVAILABLE: "Afwezig",
//Alert clickthrough
        ALERTTYPE: "Wat voor een soort melding?",
        ALERTLOCATION: "Wat is de locatie?",
        ALERTDESC: "Wil je de beschrijving aanpassen?",
        ALERTSEND: "Wil je de melding versturen?",
        ALERTSUCCESS: "Melding verstuurd!",
        
        
//Buttons
        SENDALERT: "Verstuur melding",
        CHESTPAIN: "Borstpijn",
        FIRE: "Brand",
        INJURY: "Letsel",
        HEADINJURY: "Hoofdletsel",
        CUSTOM: "Eigen text",
        FLOORPLAN: "Plattegrond",
        BACK: "Terug",
        DESCRIPTIONBUTTON: "Gebruik standaard",
        SUBMITALERT: "Voeg toe",
        EDIT: "Aanpassen",
//Alert
        INACTIVE: "Non-actief",
        ACTIVE: "Actief",
        ADDALERT: "Voeg alert toe",
        DESCRIPTION:"Beschrijving",
//Floorplan popup
        SELECTLOCATION: "Selecteer uw locatie",
        CANCEL: "Annuleer",
        SUBMITCUSTOM: "Verstuur",
//Custom popup
        CUSTOMPOPUPENTER: "Voeg hier uw eigen tekst toe",
        CUSTOMPOPUPTEXTFIELD: "Uw tekst",
        KIND: "Type",
        TIME: "Datum",
        LOCATION: "Locatie",
        REMOVEUSER: "Verwijder gebruiker",
//Popup alert
        NO: "Nee",
        YES: "Ja",
        DELETEALERTCONFIRM: "Weet u zeker dat u deze alert wil verwijderen",
//USERS
        ADDUSER: "Voeg toe",
        UUID: "Unieke key",
        ACTIONS: "Acties",
        FIRSTNAME: "Voornaam",
        LASTNAME: "Achternaam",
        AREYOUSUREYOUWANTTODELETE: "Weet u zeker dat u deze gebruiker wilt verwijderen",
        ERROR: "Error",
        PRIVILEGES: "U heeft niet de juiste gebruikers rechten",
        LOGGEDOUT: "U bent uitgelogd",
//CONFIRM ENABLE/DISABLE
        AREYOUSUREYOUWANTTOENABLE: "Weet u zeker dat u deze gebruiker wilt enablen?",
        AREYOUSUREYOUWANTTODISABLE: "Weet u zeker dat u deze gebruiker wilt disablen?",
//FOOTER
        ABOUT: 'Over ARNE',
        CONTACT: 'Contacteer Tricycle',
        COPYRIGHT: 'Copyright © 2017 ',
        COMPANYNAME: 'Tricycle',
        COMPANYWEBSITESIG: 'ARNE een website door Tricycle'
    };
    
    var EN = {
//Current Language
        LANGUAGE: "EN",
//Menu
        HOME: "Home",
        ALERTS: "Alerts",
        USERS: "Users",
        LOGIN: "Login",
        LOGOUT: "Logout",
        FLOORPLANBUILDER: "Floorplanbuilder",
        CARD:"Cards",
//Login
        EMAIL: "Email: ",
        PASSWORD: "Password: ",
        SUBMITLOGIN: "Submit",
//Home dashboard
        AVAILABLEBHV: "Available Emergency Personnel",
        NAME: "Name",
        AVAILABILITY: "Availability",
        AVAILABLE: "Available",
        UNAVAILABLE: "Unavailable",
        //Alert clickthrough
        ALERTTYPE: "What is the alert type?",
        ALERTLOCATION: "What is the location?",
        ALERTDESC: "Do you want to adjust the description?",
        ALERTSEND: "Do you want to send the alert?",
        ALERTSUCCESS: "Send alert!",   
        
//Buttons
        SENDALERT: "Send alert",
        CHESTPAIN: "Chestpain",
        FIRE: "Fire",
        INJURY: "Injurity",
        HEADINJURY: "Head injury",
        CUSTOM: "Custom",
        FLOORPLAN: "Floorplan",
        BACK: "Back",
        DESCRIPTIONBUTTON: "Use generated",
        SUBMITALERT: "Create alert",
        EDIT: "Edit",
//Alert
        INACTIVE: "Inactive",
        ACTIVE: "Active",
        ADDALERT: "Add alert",
        DESCRIPTION:"Description",
//Floorplan popup
        SELECTLOCATION: "Select your location",
        CANCEL: "Cancel",
        SUBMITCUSTOM: "Submit",
//Custom popup
        CUSTOMPOPUPENTER: "Add your own text",
        CUSTOMPOPUPTEXTFIELD: "Your text",
        KIND: "Type",
        TIME: "Date",
        LOCATION: "Location",
        REMOVEUSER: "Remove user",
//Popup alert
        NO: "No",
        YES: "Yes",
        DELETEALERTCONFIRM: "Are you sure you want to delete this alert?",
//USERS
        ADDUSER: "Add",
        UUID: "Unique ID",
        ACTIONS: "Actions",
        FIRSTNAME: "Firstname",
        LASTNAME: "Lastname",
        AREYOUSUREYOUWANTTODELETE: "Are you sure you want to delete this user?",
        ERROR: "Error",
        PRIVILEGES: "You do not have required user privileges for this action",
        LOGGEDOUT: "You have been logged out",
//CONFIRM ENABLE/DISABLE
        AREYOUSUREYOUWANTTOENABLE: "Are you sure you want to enable this alert?",
        AREYOUSUREYOUWANTTODISABLE: "Are you sure you want to disable this alert?",
//FOOTER
        ABOUT: 'About ARNE',
        CONTACT: 'Contact Tricycle',
        COPYRIGHT: 'Copyright © 2017 ',
        COMPANYNAME: 'Tricycle',
        COMPANYWEBSITESIG: 'ARNE a website by Tricycle'
    };

    //default language
    $rootScope.LANG = NL;

    //languages
    $rootScope.NL = NL;
    $rootScope.EN = EN;
});
