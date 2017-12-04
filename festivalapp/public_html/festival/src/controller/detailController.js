app.controller('detailController', function ()
{
    this.showDetailPage = '';

    this.disableScroll = function () {
        document.documentElement.style.overflow = 'hidden';
    };

    this.enableScroll = function () {
        document.documentElement.style.overflow = 'auto';
    };
}
);



