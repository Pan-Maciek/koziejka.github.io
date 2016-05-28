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
            $("#FBinfo").parent().children("a").children("div").removeAttr("hidden");
            FB.api('/me', 'GET', {fields: 'name,picture'}, function(response) {
                console.log(response);
                //$("#FBinfo").parent().children("a").children("div").html("<img src='" + response.picture.data.src + "'>" + response.name);
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
