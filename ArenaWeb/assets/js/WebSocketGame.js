var ws,
    // Note: There is also wss:// for secure WebSocket connection
    url = 'wss://arenaweb.azurewebsites.net/WebSocketServer/WebSocketServer.ashx',
    //url = 'ws://localhost:17255/WebSocketServer/WebSocketServer.ashx',
    tests = {
        websocket: 'WebSocket' in window
    };

function setupWebSocket() {
    // Instantiate a new WebSocket, passing in server url.
    // A handshake is made and a connection is established.
    ws = new WebSocket(url);
    
    // Captures errors
    ws.onerror = function (e) {
        console.log('Problem with connection: ' + e.message);
    };

    // When connection opens
    ws.onopen = function () {
        //console.log('Server connected');
        //ws.send('Server connected');
    };

    // Captures messages from the server.
    ws.onmessage = function (e) {
        //console.log(e.data + ' received');
        var player = e.data.slice(1, 2);
        var direction = e.data.slice(0, 1);
        if (direction === "S") {
            Shoot(player);
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

function init() {
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
document.addEventListener('DOMContentLoaded', init, false);