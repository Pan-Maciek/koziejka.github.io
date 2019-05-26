function resizer(){
    $("#game").width($("#game").height() * 4 / 3);
    $("#game").css("left", ($(window).width() - $("#game").width())/2 );
}

var canvas, ctx;
var ready = $(document).ready;
$(document).ready(function(){
    ready();
    $(window).resize(resizer);
    resizer();
    canvas = $("#game");
    console.log(canvas)
    ctx = canvas.getContext("2d");
});
