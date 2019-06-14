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
        //console.log("Client connected");
        ws.send("Player " + player + " connected");
    };

    // Captures messages from the server.
    //ws.onmessage = function (e) {
    //    var message = e.data;
    //    console.log(message + ' received');
    //};

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