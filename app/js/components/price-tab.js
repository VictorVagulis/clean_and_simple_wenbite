$(document).ready(function () {
    $('.tabTrigger').click(function (e){
        e.preventDefault();

        $('.textTab').removeClass('textTabActive');

        $($(this).attr('href')).addClass('textTabActive');

    });

    $('.tabTrigger:first').click();

});
