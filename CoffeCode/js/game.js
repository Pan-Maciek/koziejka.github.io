var colors = ["aqua","aquamarine","blue","cadetBlue","chartreuse","cornflowerBlue","crimson",
              "darkOrange","forestGreen","gold","green","hotPink","indigo","khaki","orange",
              "olive","pink","red","SlateBlue","skyblue","SpringGreen","SteelBlue","Teal",
              "Tomato","YellowGreen"];
var styles = ["id","class","tag"];

function Generate(){
    $("#wynik").hide();
    var id = 0, clas = 0;
    for(i = 0; i < 10; i++){
        var liczby = [];
        $("#game").append("<div id='helper' class='game" + i + "'></div>");    
        $("#helper").append("<div class='answer'></div>");
        $("#helper .answer").append("<div><div><div><div>");
        for(j = 0; j < 5; j++){
            do {
                var liczba = Math.floor(Math.abs(Math.random() * colors.length));
            } while ($.inArray(liczba,liczby) != -1);
            liczby.push(liczba);
            var kolor = colors[liczby[liczby.length - 1]];
            $("#helper").append("<label style='background-color:" + kolor + "'><span>" + kolor + "</span><input type='radio' name='odp" + i + "'></label>");
        }
        var selektory = ["div","div","*"];
        
        // Generowanie identyfikatorów i klas
        var ob = $("#helper .answer>div");
        for(j = 0; j < 4; j++){
            for(z = 0; z < Math.floor(Math.abs(Math.random() * 2)+1); z++){
                switch(Math.floor(Math.abs(Math.random() * 3)+1)){
                    case 1:
                        ob.attr("id","id"+id);
                        selektory.push("#id"+id);
                        id++;
                        break;
                    case 2:
                        ob.attr("class","class"+clas);
                        selektory.push(".class"+clas);
                        clas++;
                        break;
                    case 3:
                        break;
                }
            }
            ob = $(ob).children("div");
        }
        
        // Generowanie połączeń kolorów i stylów
        var ob = $("#helper .answer>div");
        var rules = [];
        var selektory_ = [" ",">"];
        for(j = 0; j < 10; j++){
            var n = Math.floor(Math.abs(Math.random() * 3) + 1); // ilość elementów w selektorze
            var rule = ".game" + i + " .answer ";
            for(x = 0; x < n; x++){
                rule += selektory[Math.floor(Math.abs(Math.random() * selektory.length))];
                rule += selektory_[Math.floor(Math.abs(Math.random() * 2))];
            }
            rule = rule.substring(0, rule.length - 1)
            rule += "{background-color:" + colors[liczby[Math.floor(Math.abs(Math.random() * liczby.length))]];
            if(Math.floor(Math.abs(Math.random() * 50)) > 25){
                rule += " !important";
            }
            rule += "}";
            rules[j] = rule;
        }
        $.each(rules,function(){
            $("style").html($("style").html() + this + "\n");
        });
        $("#helper").append(translateToCode($("#helper .answer").html()));
        $("#helper").append("<br><pre class='css'></pre>");
        $.each(rules,function(){
            $("#helper .css").append(translateToCodeCss(this));
        });
        $("#helper").removeAttr("id");
    }
    $(".answer").hide();
}

function translateToCode(x){
    var r = "";
    r += "<pre class='html'>";
    x = x.replace(/>/g,">\n");
    x = x.substr(0,x.length - 1);
    var lines = x.split('\n');
    $.each(lines,function(){
        r += "\n<span>" + this.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/="/g,"=<i>'").replace(/"/g,"'</i>").replace(/'/g,"\"").replace(/id=/g,"<a>id=</a>").replace(/class=/g,"<a>class=</a>").replace(/&lt;/g,"<u>&lt;").replace(/&gt;/,"&gt;</u>") + " </span>";
    });
    r += "\n</pre>";
    return r;
}
function translateToCodeCss(x){
    x = x.replace(".answer","|");
    x = x.substring(x.indexOf("|") + 2);
    var r = "<span><a>" + x.substring(0,x.indexOf('{')) + "</a>{ <u>" + x.substring(x.indexOf('{')+1,x.indexOf(':')) + "</u>:<i>" + x.substring(x.indexOf(":")+1,x.indexOf("}")) +"</i> }</span>";
    return r.toLowerCase();
}

function showAnswers(){
    $(".answer").show();
    var points = 0;
    for(i = 0 ; i < 10 ; i++){
        if($(".game" + i + " .answer>div>div>div>div").css('background-Color') == $(".game" + i +" input[name=odp" + i+ "]:checked").parent().css('background-Color')){
            points++;
            $(".game" + i + " .answer").addClass("tak");
        }
        else
            $(".game" + i + " .answer").addClass("nie");
    }
    $("#wynik").show();
    $("#wynik h1").append("<span> " + points + " na 10</span>");
}
Generate();