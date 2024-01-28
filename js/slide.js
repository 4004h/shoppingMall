$(document).ready(function(){
    //slide
    let slideIndex = 0;
    let slidePage = $("#slide li");
    let slide;
    slidePage.eq(slideIndex).css({ transition:'left 0s ease',left: "0%"});
    StartSlide();


    $(".naxt").click(function(){
        NaxtSlide();
    })
    $(".prev").click(function(){
        PrevSlide();
    })

    $("#slideHidn").mouseover(function () {
        $(".naxt").stop().fadeIn(300)
        $(".prev").stop().fadeIn(300)
    })
    $("#slideHidn").mouseleave(function () {
        $(".naxt").stop().fadeOut(300)
        $(".prev").stop().fadeOut(300)
    })

    
    function NaxtPromise() {
        return new Promise(function(resolve) {
            slidePage.eq(slideIndex).css({transition:'left 0s ease', left: "0%"});
            slidePage.eq(Overflow(slideIndex+1)).css({transition:'left 0s ease', left: "100%"});
            if(slidePage.eq(slideIndex).css("left")=='0px')
                resolve();
        })
    }
    function NaxtSlide() {
        StopSlide(); StartSlide();

        NaxtPromise().then(function() {
            
            slidePage.eq(slideIndex).css({transition:'left 1s ease', left: "-100%"});
            slidePage.eq(Overflow(slideIndex+1)).css({transition:'left 1s ease', left: "0%"}); 
    
            slideIndex < slidePage.length-1 ? slideIndex++ : slideIndex = 0;
        })

    }

    function PrevPromise() {
        return new Promise(function(resolve) {
            slidePage.eq(slideIndex).css({transition:'left 0s ease', left: "0%"});
            slidePage.eq(Overflow(slideIndex-1)).css({transition:'left 0s ease', left: "-100%"});
            if(slidePage.eq(slideIndex).css("left")=='0px')
                resolve();
        })
    }
    function PrevSlide() {
        StopSlide(); StartSlide();
        
        PrevPromise().then(function() {
            slidePage.eq(slideIndex).css({transition:'left 1s ease', left: "100%"});
            slidePage.eq(Overflow(slideIndex-1)).css({transition:'left 1s ease', left: "0%"}); 

            slideIndex > 0 ? slideIndex-- :  slideIndex = slidePage.length-1;
        })
    }

    function StopSlide() {
        clearInterval(slide)
        
    }

    function StartSlide() {
        slide = setTimeout(() => {
            NaxtSlide()
        }, 7000);
    }

    function Overflow(params) {
        if(params < 0)
        {
            if(slidePage.length + params < 0)
                return Overflow(slidePage.length + params);

            return slidePage.length + params;
        }
        else if(params >= slidePage.length)
        {
            if(params - slidePage.length >= slidePage.length)
                return Overflow(params - slidePage.length);

            return params - slidePage.length;
        }
        return params;
        
    }

    let old = 0;
    let mew = 0;
    let active = false;
    
    slidePage.each((s)=>{
        slidePage.eq(s)[0].addEventListener("touchstart", dragstart)
        slidePage.eq(s)[0].addEventListener("touchend", dragEnd)
        slidePage.eq(s)[0].addEventListener("touchmove", drag)
        
    })

    function dragstart(e) {
        active = true;
        old = e.touches[0].clientX
    }

    function dragEnd(e) {
        active = false;
        old = 0;
        mew = 0;
    }

    function drag(e) {
        if(active)
        {
            mew = e.touches[0].clientX
            if(mew - old < -50) 
            {
                NaxtSlide()
                active = false;
            }
            if(mew - old > 50)
            {
                PrevSlide()
                active = false;
            }
        }
        
    }

})









