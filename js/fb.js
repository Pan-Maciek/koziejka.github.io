var ready = $(document).ready;
var _name;
$(document).ready(function(){
    ready();
    console.log("gyuguugg");
    $("#FBinfo").html("<p>Login to facebook?</p>");
    $("#FBinfo p").on("click",login);
    $("#FBinfo p").css("cursor","pointer");
    FB.getLoginStatus(function(r){
        if(r.status === 'connected'){
            FB.api('/me', 'GET', {fields: 'name,picture'}, function(response) {
                console.log(response);
                $("#FBinfo").parent().children("a").children("div").html("<img src='" + response.picture.data.url + "'><p>" + response.name + "</p>").removeClass("hidden");
                console.log($("#FBinfo").parent().children("a").children("div").children("p"));
                if (response.name.length > 10){
                    $("#FBinfo").parent().children("a").children("div").children("p").css("animation: textSlide 15s infinite;");
                }
            });
        }
    });
});
function login() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            getInfo();
            $("#FBinfo").html("<p>Welcome <span id='imie'>" + _name + "</span>.</p>");
        }
    }, {scope: 'email'});
}

function getInfo() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
        _name = response.name;
        $("#imie").html(response.first_name);
    });
}
