var ws;
var tests = {
        websocket: 'WebSocket' in window
    };

function setupWebSocket() {
    // Instantiate a new WebSocket, passing in server url.
    // A handshake is made and a connection is established.
    ws = new WebSocket(WebSocketServerURL);
    
    // Captures errors
    ws.onerror = function (e) {
        console.log('Problem with connection: ' + e.message);
    };

    // When connection opens
    ws.onopen = function () {
        console.log('Server connected');
        ws.send("SERVER");
    };

    // Captures messages from the server.
    ws.onmessage = function (e) {
        if (e.data === "SERVER" || e.data == "GAME OVER") {
            return;
        }

        var player = e.data.slice(1, 2);
        var direction = e.data.slice(0, 1);
        if (direction === "S") {
            Shoot(player);
        }
        else if (direction === "J") {
            Join(player);
        }
        else if (direction === "H") {
            HeartBeat(player);
        }
        else {
            Move(player, direction);
        }
    };

    // When connection closes
    ws.onclose = function () {
        console.log('Closed connection');
    };
}

function initWS() {
    // WebSocket support test
    if (tests.websocket) {
        // Setting up the WebSocket
        setupWebSocket();
    } else {
        console.log('Your browser doesn´t support WebSocket!');
        return;
    }
}

// Run init function when DOM  content has been loaded
document.addEventListener('DOMContentLoaded', initWS, false);