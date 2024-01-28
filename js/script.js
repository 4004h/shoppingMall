let json

$(document).ready(function(){
    Basket()

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

    const io = new IntersectionObserver((entry) => {

        let sidebar = $(".sidebar")

        // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
        if (!entry[0].isIntersecting) {
            sidebar[0].classList.remove('false');

        } else {
            sidebar[0].classList.add('false');

        }

    });

    const item = document.querySelector(".mainMenu>li:last-of-type")
    io.observe(item)


    // $(".mainMenu>li:not(:first-of-type)") 120px
    

    
    let maxdrag = 0;
    let mindrag = ($(".mainMenu>li:not(:first-of-type)").length * 120 + 50) - $("body").width();
    mindrag = mindrag > 0? -mindrag : 0;

    let old = 0;
    let mew = 0;

    let isX = 0
    let menus = document.querySelectorAll(".mainMenu>li:not(:first-of-type)");
    let menuT = document.querySelectorAll(".mainMenu>li:not(:first-of-type)>a");;
    let active = false;

    menus.forEach((menu)=>{
        menu.addEventListener("dragstart", dragStart)
        menu.addEventListener("dragend", dragEnd)
        menu.addEventListener("mouseup", dragEnd)
        menu.addEventListener("mouseleave", dragEnd)
        menu.addEventListener("mousemove", drag)

        menu.addEventListener("touchstart", dragStart)
        menu.addEventListener("touchend", dragEnd)
        menu.addEventListener("touchmove", drag)
        //touchstart touchend touchmove
    })

    function dragStart(e)
    {
        active = true;

        menuT.forEach((t)=>{
            t.classList.add('dragging')
        })
        

        mindrag = ($(".mainMenu>li:not(:first-of-type)").length * 120 + 50) - $("body").width()
        mindrag = mindrag > 0? -mindrag : 0;

        if (e.type === "touchstart")
            old = (e.touches[0].clientX - 50);
        else
            old = (e.clientX - 50);

        // console.log(active)
    }
    
    function dragEnd(e)
    {
        menuT.forEach((t)=>{
            if(t.classList.contains('dragging')) 
                t.classList.remove('dragging');
        })

        active = false;
        isX = isX + mew - old;

        if(isX >= maxdrag) isX = maxdrag
        if(isX <= mindrag) isX = mindrag

        mew=0;
        old=0;


 
        // console.log(active, isX, mew, old)

    }

    function drag(e)
    {   


        // console.log(mew,old)


        if(active)
        {
            if (e.type === "touchmove")
                mew = (e.touches[0].clientX - 50);
            else
                mew = (e.clientX - 50);

            if(isX + mew - old <= maxdrag && isX + mew - old >= mindrag)
            {
                $(".mainMenu>li:not(:first-of-type)").css("transform", `translateX(${isX + mew - old}px)`)
            }

        }
    }

    // console.log(($(".mainMenu>li:not(:first-of-type)").length * 120 + 50) - $("body").width())

})

function Basket() {
    if(localStorage.length > 0)
    {
        $(".Basket").show()
        $(".Basket").text(JSON.parse(localStorage.getItem("cart")).length)
    }
    else
    {
        $(".Basket").hide()
    }
}

function select() {
    location.href = `${$("#searchimg img")[0].id}search.html?select=${$("#search").val()}&page=1`

}






