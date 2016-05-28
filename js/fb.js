var ready = $(document).ready;
$(document).ready(function(){
    ready();
    console.log("gyuguugg");
    $("FBinfo").html("Zaloguj się ... ");
});
function login() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            $("FBinfo").html('We are connected.');
        } else if (response.status === 'not_authorized') {
            $("FBinfo").html('We are not logged in.');
        } else {
            $("FBinfo").html('You are not logged into Facebook.');
        }
    }, {scope: 'email'});
}

function getInfo() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
        document.getElementById('status').innerHTML = response.first_name;
    });
}
