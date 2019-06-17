<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Virtual joystick</title>
    <link rel="stylesheet" href="assets/css/virtualjoystick.css" />
    <script>
        var player = "1";
        var WebSocketServerURL = '<%=System.Configuration.ConfigurationManager.AppSettings("WebSocketServerURL").ToString() %>';
    </script>
    <script src="assets/js/jquery-2.1.0.min.js"></script>
    <script src="assets/js/VirtualJoystick/hand.minified.js"></script>
    <script src="assets/js/VirtualJoystick/Collection.js"></script>
    <script src="assets/js/VirtualJoystick/Vector2.js"></script>
    <script src="assets/js/VirtualJoystick/TouchControl.js"></script>
    <script src="assets/js/VirtualJoystick/WebSocketPlayer.js"></script>
    <script src="assets/js/VirtualJoystick/Orientation.js"></script>
</head>
<body>
    <div class="container">        
        <canvas id="canvasJoystick"></canvas>
    </div>
    <div id="rotateDevice"></div>
</body>
</html>