define(['jquery'], function ($){
    var dest = [];
    var type = [];
    function screenCondition (className) {
        $(className).click(function(){
            if ($(this).index() > 0) {
                $(className).eq(0).removeClass('active-btn');
                $(this).toggleClass('active-btn');
            } else if ($(this).index() == 0){
                $(this).addClass('active-btn');
                $(this).siblings().removeClass('active-btn');
            }
        })
    }
    return screenCondition
});
