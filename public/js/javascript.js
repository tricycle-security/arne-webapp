$('.event-nav-span').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    alert(2);
});






function cancelClick()
{
    if (!e)
        var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation)
        e.stopPropagation();
}



