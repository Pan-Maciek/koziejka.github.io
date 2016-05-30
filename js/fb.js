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
            FB.api('/me', 'GET', {fields: 'name,picture,id'}, function(response) {
                console.log(response);
                $("#FBinfo").parent().children("a").children("div").html("<img src='" + response.picture.data.url + "'><p><a href='https://www.facebook.com/" + response.id +  "'>" + response.name + "</a></p>").removeClass("hidden");
                if (response.name.length > 17){
                    $("#FBinfo").parent().children("a").children("div").children("p").css("animation", "textSlide 15s infinite");
                }
                $("#FBinfo").html("<p></p>");
            });
        } else {
            $("#FBinfo").html("<p onclick='login()'>Login to facebook?</p>")
        }
    });
});
function login() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            getInfo();
            $("#FBinfo").html("<p>Welcome <span id='imie'>" + _name + "</span>.</p>");
        }
    }, {scope: 'email,publish_actions'});
}

function getInfo() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
        _name = response.name;
        $("#imie").html(response.first_name);
    });
}
