$(document).ready(function () {
    $('.tabTrigger').click(function (e){
      e.preventDefault();

    $('.tabTrigger').removeClass('tabTriggerActive');
    $('.textTab').removeClass('textTabActive');

     $(this).addClass('tabTriggerActive');
     $($(this).attr('href')).addClass('textTabActive');

    });

    //$('.tabTrigger:first').click();
});
