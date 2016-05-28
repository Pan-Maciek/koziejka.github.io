var ready = $(document).ready;
$(document).ready(function(){
    ready();
    console.log("gyuguugg");
    $("#FBinfo").html("<p>Login to facebook?</p>");
    $("#FBinfo p").on("click",login);
});
function login() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            $("#FBinfo").html('<p>We are connected.</p>');
        }
    }, {scope: 'email'});
}

function getInfo() {
    FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
        document.getElementById('status').innerHTML = response.first_name;
    });
}
