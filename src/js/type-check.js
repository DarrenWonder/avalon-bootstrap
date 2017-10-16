define(['jquery', 'avalon'], function ($, avalon){
    var vm = avalon.define({
        $id: "test",
        infoList: []
    });
    var dest = [];
    var type = 0;
    function screenCondition (className) {
        $(className).click(function(){
            var dataId = parseInt($(this).attr('data-id'));
            if (className == '.dest-list>li') {
                if ($(this).index() > 0) {
                    $(className).eq(0).removeClass('active-btn');
                    $(this).toggleClass('active-btn');
                    dest.push(dataId);
                } else if ($(this).index() == 0){
                    $(this).addClass('active-btn');
                    $(this).siblings().removeClass('active-btn');
                    dest = [];
                }
            } else if ((className == '.type-list>li')){
                $(this).addClass('active-btn');
                $(this).siblings().removeClass('active-btn');
                type = dataId
            }
        })
        console.log(dest)
        $.ajax({
            type: 'GET',
            url: 'http://devadmin.bmtrip.com/api/product/list?page=1&district_id='+dest+'&type='+type,
            dataType: 'json',
            async: false,
            success: function (result) {
                console.log(result)
            }
        })
    }
    return screenCondition
});
