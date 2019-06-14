<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Virtual joystick</title>
    <link rel="stylesheet" href="assets/css/virtualjoystick.css" />
    <script>
        var player = "2";
        var WebSocketServerURL = '<%=System.Configuration.ConfigurationManager.AppSettings("WebSocketServerURL").ToString() %>';
    </script>
    <script src="assets/js/hand.minified.js"></script>
    <script src="assets/js/Collection.js"></script>
    <script src="assets/js/Vector2.js"></script>
    <script src="assets/js/TouchControl.js"></script>
    <script src="assets/js/WebSocketPlayer.js"></script>
</head>
<body>
    <div class="container">
        <canvas id="canvasJoystick"></canvas>
    </div>
</body>
</html>