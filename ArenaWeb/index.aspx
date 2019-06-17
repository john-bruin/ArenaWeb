<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>Arena</title>

    <link href="assets/css/main.css" rel="stylesheet" />

    <script src="assets/js/jquery-2.1.0.min.js"></script>
    <script src="assets/js/WebSocketGame.js"></script>
    <script src="assets/js/Main.js"></script>
    <script src="assets/js/Player.js"></script>
    <script src="assets/js/Bullet.js"></script>
    <script>
        var WebSocketServerURL = '<%=System.Configuration.ConfigurationManager.AppSettings("WebSocketServerURL").ToString() %>';
    </script>
</head>
<body oncontextmenu="return false;">
    <div id="content" class="background1">
        <div id="energyPlayer1"></div>   
        <div id="energyPlayer2"></div>
        <div id="QRPlayer1"></div>
        <div id="QRPlayer2"></div>
        <div id="message">WELCOME TO ARENA</div>
        <div id="logo" class="show"></div>
    </div>
    <canvas id="mainCanvas"></canvas>
</body>
</html>