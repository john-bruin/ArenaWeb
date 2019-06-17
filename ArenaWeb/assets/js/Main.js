var contentWidth = 600;
var contentHeight = 390;

var p1_x = 55;
var p1_y = 290;
var p2_x = 55 + 445;
var p2_y = 290;

var mainCanvas;
var mainContext;

var player1Animation;
var player1BulletAnimation;
var player2Animation;
var player2BulletAnimation;

var player1Idle = 0;
var player2Idle = 0;

var isIntroPlaying = true;

function HeartBeat(player) {
    //console.log("Heartbeat player " + player);
    if (player === "1") {
        player1Idle = 0;
    }
    else {
        player2Idle = 0;
    }
}

function Join(player) {
    console.log("Player " + player + " joined.");
    if (player === "1") {
        $("#QRPlayer1").hide();        
        player1Animation.Init();
        if (!player2Animation.IsPlaying()) {
            $("#QRPlayer2").show();
            $('#message').html("PLAYER 2 SCAN TO PLAY");
        }
    }
    else {
        $("#QRPlayer2").hide();
        player2Animation.Init();
        if (!player1Animation.IsPlaying()) {
            $("#QRPlayer1").show();   
            $('#message').html("PLAYER 1 SCAN TO PLAY");
        }
    }
    if (player1Animation.IsPlaying() && player2Animation.IsPlaying()) {
        $('#content').removeClass("backgroundIntro");
        $('#content').addClass("background" + Math.floor((Math.random() * 2) + 1));

        $('#message').html("GET READY!");

        $('#logo').removeClass("show");
        $('#logo').addClass("hide");

        window.setTimeout(function () { $('#message').html(""); isIntroPlaying = false; }, 5000);
    }
}

function Shoot(player) {
    if (isIntroPlaying) {
        return;
    }

    if (player === "1" && player1Animation.IsPlaying()) {
        player1Idle = 0;
        if (!player1BulletAnimation.IsPlaying()) {
            player1BulletAnimation.Init(p1_x + 43, p1_y + 30);
        }
    }
    else if (player === "2" && player2Animation.IsPlaying()) {
        player2Idle = 0;
        if (!player2BulletAnimation.IsPlaying()) {
            player2BulletAnimation.Init(p2_x, p2_y + 30);
        }
    }
}

function Move(player, direction) {
    var step = 3;
    if (player === "1") {
        player1Idle = 0;
        switch (direction) {
            case "U":
                p1_y = p1_y - step;
                break;
            case "D":
                p1_y = p1_y + step;
                break;
            case "L":
                p1_x = p1_x - step;
                break;
            case "R":
                p1_x = p1_x + step;
                break;
            default:
        }

        if (p1_x < 50) { p1_x = 50; }
        if (p1_x > contentWidth / 2 - 44 - 30) { p1_x = contentWidth / 2 - 44 - 30; }
        if (p1_y < 0) { p1_y = 0; }
        if (p1_y > 295) { p1_y = 295; }

        if (player1Animation.IsPlaying()) {
            mainContext.drawImage(player1Animation.Draw(p1_x, p1_y), 0, 0, mainCanvas.width, mainCanvas.height);
        }
    }
    else if (player === "2") {
        player2Idle = 0;
        switch (direction) {
            case "U":
                p2_y = p2_y - step;
                break;
            case "D":
                p2_y = p2_y + step;
                break;
            case "L":
                p2_x = p2_x - step;
                break;
            case "R":
                p2_x = p2_x + step;
                break;
            default:
        }
        if (p2_x > contentWidth - 50 - 44) { p2_x = contentWidth - 50 - 44; }
        if (p2_x < contentWidth / 2 + 30) { p2_x = contentWidth / 2 + 30; }
        if (p2_y < 0) { p2_y = 0; }
        if (p2_y > 295) { p2_y = 295; }

        if (player2Animation.IsPlaying()) {
            mainContext.drawImage(player2Animation.Draw(p2_x, p2_y), 0, 0, mainCanvas.width, mainCanvas.height);
        }
    }
}

function GameOver(player) {
    ws.send("GAME OVER");
    if (player === 1) {
        $("#message").html("PLAYER 2 HAS WON!");
    }
    else {
        $("#message").html("PLAYER 1 HAS WON!");
    }
    window.setTimeout(function () { Init(); }, 5000);
}

function Init() {
    //Initial positions
    p1_x = 55;
    p1_y = 290;
    p2_x = 55 + 445;
    p2_y = 290;

    isIntroPlaying = true;

    $('#logo').removeClass("hide");
    $('#logo').addClass("show");

    $("#energyPlayer1").html("");
    $("#energyPlayer2").html("");

    $('#message').html("PLAYER 1 SCAN TO PLAY");
    $("#QRPlayer1").show();
    $("#QRPlayer2").hide();

    initCanvas();
    initAnimations();
}

function initAnimations() {
    player1Animation = new Player(1);
    player1BulletAnimation = new Bullet(1);
    player2Animation = new Player(2);
    player2BulletAnimation = new Bullet(2);
}

function initCanvas() {
    var W = window.innerWidth;
    var H = window.innerHeight;

    //Scale content
    scale = 0.8 * (window.innerWidth / contentWidth);
    $('#content').css('transform', 'scale(' + scale + ',' + scale + ')');

    mainCanvas = document.getElementById('mainCanvas');
    mainContext = mainCanvas.getContext('2d');

    //Make the maincanvas occupy the content div
    mainCanvas.width = contentWidth * scale;
    mainCanvas.height = contentHeight * scale;
    $("#mainCanvas").css({ 'left': (W - mainCanvas.width) / 2, 'top': (H - mainCanvas.height) / 2 });
}

$(window).resize(function () {
    initCanvas();
});

$(document).ready(function () {
    var fps = 60;
       
    function Start() {
        Init();
        draw();
    }

    var now;
    var then = Date.now();
    var interval = 1000 / fps;
    var delta;

    function draw() {      

        requestAnimationFrame(draw);

        now = Date.now();
        delta = now - then;

        interval = 1000 / fps;
        if (delta > interval) {

            then = now - (delta % interval);
            
            mainContext.beginPath();
            mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
            
            if (player1Animation.IsPlaying()) {
                player1Idle++;
                if (player1Idle > fps * 30) {
                    player1Animation.Stop();
                    GameOver(1);
                }
                mainContext.drawImage(player1Animation.Draw(p1_x, p1_y), 0, 0, mainCanvas.width, mainCanvas.height);
            }
            if (player1BulletAnimation.IsPlaying()) {
                mainContext.drawImage(player1BulletAnimation.Draw(), 0, 0, mainCanvas.width, mainCanvas.height);
            }
            if (player2Animation.IsPlaying()) {
                player2Idle++;
                if (player2Idle > fps * 30) {
                    player2Animation.Stop();
                    GameOver(2);
                }
                mainContext.drawImage(player2Animation.Draw(p2_x, p2_y), 0, 0, mainCanvas.width, mainCanvas.height);
            }
            if (player2BulletAnimation.IsPlaying()) {
                mainContext.drawImage(player2BulletAnimation.Draw(), 0, 0, mainCanvas.width, mainCanvas.height);
            }
        }
    }    
    
    Start();
});