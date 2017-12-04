app.controller('sidemenuController', function ($routeParams)
    {
        this.title = "appelpop";
        this.showMenu = false;
        this.toggle = function()
        {
            this.showMenu = !this.showMenu;
        };
        this.activeTab = 'Timetable';
        
        this.isActive = function(tab)
        {
            if(tab === this.activeTab)
            {
                return 'active';
            }
            return '';
        };
        
        this.removeOnLoad = function()
        {
            $("#menuinput").prop('checked', false);
        };
        
    }
    );




