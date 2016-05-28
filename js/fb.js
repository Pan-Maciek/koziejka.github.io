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
            $("#FBinfo .hidden").removeAttr("hidden");
            console.log("conected");
            console.log($("#FBinfo .hidden"));
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
