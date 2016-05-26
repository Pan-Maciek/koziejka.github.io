// ZMIENNE PRZECHOWUJĄCE WYNIK GRACZY
var player1_s = 0,
    player2_s = 0;
var audio = new Audio("audio/Beep1.wav");

function select(e){
    console.log(e.which);
    switch(e.which){
        case 49:
        case 97:
            audio.volume = 1;
            playSingiel();
            break;
        case 50:
        case 98:
            audio.volume =1;
            playMulti();
            break;
        case 96:
        case 48:
            audio.volume =1;
            easterEagPlay();
            break;
    }
}
var gamerunning = false;
var ball;

var ballSpeed = 1;
var x = -1, y = 2;
var player1, player2;
function ballmove() {
    if (gamerunning) {
        ballSpeed += 0.001;
        var left = parseInt(ball.style.left);
        var top = parseInt(ball.style.top);
        // ZDOBYWANIE PUNKTÓW
        if (left < 0) score(2);
        else if (left > g.offsetWidth) score(1);
        // ODBIJANIE OD GÓRY I DOŁU
        if (top < 0 || top > g.offsetHeight - 45) {
            y *= -1;
            audio.play();
        }
        // ODBIJANIE OD PALETEK
        if (left <= 25){
            if (top >= player1.offsetTop && top <= player1.offsetTop + player1.offsetHeight && left > 15) {
                x = 1;
                y *= -1;
                audio.play();
            }
        }
        if (left >= g.offsetWidth - 35){
            if (top >= player2.offsetTop && top <= player2.offsetTop + player2.offsetHeight && left <= g.offsetWidth - 15) {
                x = -1;
                y *= -1;
                audio.play();
            }
        }
        ball.style.left = 1 * x + parseInt(ball.style.left) + "px";
        ball.style.top = 1 * y + parseInt(ball.style.top) + "px";
        setTimeout(ballmove, 10 / ballSpeed);
    }
}

function bot(dir) {
    if (player2.offsetTop == 0) dir = "down";
    if (player2.offsetTop == g.offsetHeight - player2.offsetHeight - 25) dir = "up";
    if (ball.offsetTop > player2.offsetTop) dir = "down";
    else dir = "up";
    playerMove(2, dir);
    if (gamerunning) setTimeout(function () { bot(dir); }, 35);
}
function bot1(dir) {
    if (player1.offsetTop == 0) dir = "down";
    if (player1.offsetTop == g.offsetHeight - player1.offsetHeight - 25) dir = "up";
    if (ball.offsetTop > player1.offsetTop) dir = "down";
    else dir = "up";
    playerMove(1, dir);
    if (gamerunning) setTimeout(function () { bot1(dir); }, 20);
}
function bot2(dir) {
    if (player2.offsetTop == 0) dir = "down";
    if (player2.offsetTop == g.offsetHeight - player2.offsetHeight - 25) dir = "up";
    if (ball.offsetTop > player2.offsetTop) dir = "down";
    else dir = "up";
    playerMove(2, dir);
    if (gamerunning) setTimeout(function () { bot2(dir); }, 22);
}

function score(palyernum) {
    ballSpeed = 1;
    console.log("Player " + palyernum + "scored point");
    if(palyernum == 1){
        player1_s++;
    }
    else{
        player2_s++;
    }
    x *= -1;
    ball.style.left = "";
    ball.style.left = ball.offsetLeft + "px";
    ball.style.top = "";
    ball.style.top = ball.offsetTop + "px";
    document.getElementById("leftScore").innerHTML = player1_s;
    document.getElementById("rightScore").innerHTML = player2_s;
}


function playSingiel(){
    gamerunning = true;
    muteLobbySound();
    document.getElementById("game").className = "play";
    ball = document.getElementById("ball");
    ball.style.left = ball.offsetLeft + "px";
    ball.style.top = ball.offsetTop + "px";
    document.getElementById("leftScore").innerHTML = 0;
    document.getElementById("rightScore").innerHTML = 0;
    ballmove();
    bot("down");
    window.onkeydown = function(e){
        switch (e.which) {
            case 87:
            case 38:
                playerMove(1, "up");
            break;
            case 83:
            case 40:
                playerMove(1, "down");
            break;
        case 27:
            endGame();
            break;
        }
    };

}

function easterEagPlay(){
    gamerunning = true;
    muteLobbySound();
    document.getElementById("game").className = "play";
    ball = document.getElementById("ball");
    ball.style.left = ball.offsetLeft + "px";
    ball.style.top = ball.offsetTop + "px";
    document.getElementById("leftScore").innerHTML = 0;
    document.getElementById("rightScore").innerHTML = 0;
    ballmove();
    bot2("down");
    bot1("up");
    window.onkeydown = function(e){
        if(e.which == 27)
            endGame();
    };

}

function playMulti(){
    gamerunning = true;
    muteLobbySound();
    document.getElementById("game").className = "play";
    ball = document.getElementById("ball");
    ball.style.left = ball.offsetLeft + "px";
    ball.style.top = ball.offsetTop + "px";
    document.getElementById("leftScore").innerHTML = 0;
    document.getElementById("rightScore").innerHTML = 0;
    ballmove();
    window.onkeydown = function(e){
        switch(e.which){
                case 87:
                playerMove(1, "up");
                break;
                case 38:
                playerMove(2, "up");
                break;
                case 83:
                playerMove(1, "down");
                break;
                case 40:
                playerMove(2, "down");
                break;
            case 27:
                endGame();
                break;
        }
    };
}

function endGame() {
    ballSpeed = 1;
    document.getElementById("game").className = "";
    window.onkeydown = select;
    gamerunning = false;
    LobbySound();
    player1_s = 0;
    player2_s = 0;
    ball.style.left = "";
    ball.style.top = "";
    ball.style.left = ball.offsetLeft + "px";
    ball.style.top = ball.offsetTop + "px";
    ballSpeed = 1;
    
    gamerunning = true;
    muteLobbySound();
    ball = document.getElementById("ball");
    ball.style.left = ball.offsetLeft + "px";
    ball.style.top = ball.offsetTop + "px";
    document.getElementById("leftScore").innerHTML = 0;
    document.getElementById("rightScore").innerHTML = 0;
    ballmove();
    audio.volume = 0;
    bot2("down");
    bot1("up");
    window.onkeydown = function(e){
        if(e.which == 27)
            endGame();
    };
}

function audioVolumeIn(q){
    if(q.volume){
        var InT = 0;
        var setVolume = 1;
        var speed = 0.005;
        q.volume = InT;
        var eAudio = setInterval(function(){
            InT += speed;
            q.volume = InT.toFixed(1);
            if(InT.toFixed(1) >= setVolume){
                clearInterval(eAudio);
            };
        },30);
    };
};

function audioVolumeOut(q){
    if(q.volume){
        var InT = 1;
        var setVolume = 0.2;
        var speed = 0.005;
        q.volume = InT;
        var fAudio = setInterval(function(){
            InT -= speed;
            q.volume = InT.toFixed(1);
            if(InT.toFixed(1) <= setVolume){
                clearInterval(fAudio);
            };
        },30);
    };
};

function muteLobbySound(){
    audioVolumeOut(document.getElementById("lobbyAudio"));
}
function LobbySound() {
    audioVolumeIn(document.getElementById("lobbyAudio"));
}

function playerMove(playernum, dir){
    var p = document.getElementById("player" + playernum);
    var top = parseInt(p.style.top);
    if(dir == "up"){
        top -= 10;
        p.style.top = top + "px";
    }
    else{
        top = eval(top) +10;
        p.style.top = top + "px";
    }
    p.style.top += "px";
    if (p.offsetTop < 0) p.style.top = "0px";
    if (p.offsetTop > g.offsetHeight - 25 - p.offsetHeight) p.style.top = g.offsetHeight - p.offsetHeight - 25 + "px";
}
var g;
window.onload = function() {
    g = document.getElementById("game");
    var p = document.getElementById("player1").style.top = 0;
    var p = document.getElementById("player2").style.top = 0;
    player1 = document.getElementById("player1");
    player2 = document.getElementById("player2");
    window.onkeydown = select;
    ball = document.getElementById("ball");
};
