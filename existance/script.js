var tab = []
var last = "0"
var date = new Date(1998,0,1)
$(document).ready(function(){
    
    for (var i = 0; i < 12; i++){
        var temp = $("<div class='num'><div class='old'></div><div class='new'>0</div></div>")
        $("#timer").append(temp)
        tab.push(temp)
    }
    $("#timer").append("<div class='num'><div class='old'>s</div></div>")
    tab = tab.reverse()
    setInterval(function(){
        display()
    },1000)
    
    $("input").on("change", function(){
        date = new Date($("input").val())
        for(var i = 0; i < tab.length; i++){
            changeNum(tab[i], 0)
        }
    })
})

function display(){
    
    var sec = Math.floor((Date.now() - date) / 1000).toString().split("").reverse().join("")
    
    var l = tab.length
    for(var i = 0; i < sec.length; i++){
        if (tab[i].children(".old").text() != sec[i]){
            changeNum(tab[i], sec[i])
        }
    }
}


function changeNum(el, num){
    var o = $(el).children(".old"),
        n = $(el).children(".new")
    
    o.text(n.text())
    n.text(num).css("top","100%")
    setTimeout(function(){
        o.animate({top: "-100%"}, function(){o.css("top", 0).text(n.text())})
        n.animate({top: 0}, 500)
    }, 100)    
        
}
