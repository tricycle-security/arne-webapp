app.controller('languageController', function ($scope) {
    var NL = {
        HOME: "Home",
        ALERTS: "Meldingen",
        USERS: "Gebruikers",
        LOGIN: "Inloggen",
        LOGOUT: "Uitloggen",
        FLOORPLANBUILDER: "Plattegrond opbouw",
//Login
        EMAIL: "Email: ",
        PASSWORD: "Password: ",
        SUBMITLOGIN: "Inloggen",
//Home dashboard
        AVAILABLEBHV: "Beschrikbare BHV'ers",
        NAME: "Naam",
        AVAILABILITY: "Beschikbaar",
        AVAILABLE: "Aanwezig",
        UNAVAILABLE: "Afwezig",
//Buttons
        CHESTPAIN: "Borstpijn",
        FIRE: "Vuur",
        INJURY: "Letsel",
        HEADINJURY: "Hoofdletsel",
        CUSTOM: "Eigen text",
        FLOORPLAN: "Plattegrond",
        BACK: "Terug",
        DESCRIPTION: "Beschrijving",
        SUBMITALERT: "Voeg toe",
        EDIT: "Aanpassen",
        //Alert
        INACTIVE: "Non-actief",
        ACTIVE: "Actief",
        ALERTTYPE: "Wat is het alert type",
        ADDALERT: "Voeg alert toe",
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
        AREYOUSUREYOUWANTTOENABLE: "Weet u zeker dat u deze gebuiker wilt enablen?",
        AREYOUSUREYOUWANTTODISABLE: "Weet u zeker dat u deze gebruiker wilt disablen?"
    };
    
    $scope.LANG = NL;
});
