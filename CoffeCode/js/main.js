function moblie_menu_show(){
    if($(".mobile").length){
        $(".mobile").addClass("mobile_m");
        $(".mobile").removeClass("mobile");
    }
    else{
        $(".mobile_m").addClass("mobile");
        $(".mobile_m").removeClass("mobile_m"); 
    }
}

$(document).ready(function(){
    
    $(window).resize(function(){
        
        if($(window).width() < $("header ul").width()){
            if(!$("header mobile_m").length)
                $("header").addClass("mobile");
        }
        else{
            $("header").removeClass("mobile");
            $("header").removeClass("mobile_m");
        }
        
        if($(window).width() < 900){
            $(".blok").addClass("ext");
            $("pre").addClass("ext");
        }
        else{
            $(".blok").removeClass("ext");
            $("pre").removeClass("ext");
        }
        
    });
});