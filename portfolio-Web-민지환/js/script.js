$(document).ready(function(){
    //Menu over/leave
    $(".mainMenu>li").mouseover(function () {
        $(this).children(".subMenu").stop().fadeIn(200);
    });

    $(".mainMenu>li").mouseleave(function () {
        $(this).children(".subMenu").stop().fadeOut(200);
    });



    //toggle Btn/Menu
    let toggleOn = false;
    $("#toggleBtn").click(function () {
        toggleOn = !toggleOn;
        if(toggleOn)
        {
            $("#toggleBtn span:first-child").css({'top':'50%','transform':'translate(-50%,-50%) rotate(-45deg)'});
            $("#toggleBtn span:last-child").css({'top':'50%','transform':'translate(-50%,-50%) rotate(45deg)'});
            $("#toggleBtn span:nth-child(2)").css({'opacity':'0'});
            $("#toggleMenu").show();
        }
        else
        {
            $("#toggleBtn span:first-child").css({'top':'30%','transform':'translate(-50%,-50%) rotate(0deg)'});
            $("#toggleBtn span:last-child").css({'top':'70%','transform':'translate(-50%,-50%) rotate(0deg)'});
            $("#toggleBtn span:nth-child(2)").css({'opacity':'1'});
            $("#toggleMenu").hide();
        }
    });
    
})

function select() {
    location.href = `${$("#searchimg img")[0].id}search.html?select=${$("#search").val()}`

}






