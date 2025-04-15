var socket = new WebSocket("wss://echo.websocket.events"); // Online WebSocket echo server

socket.onopen = function () {
    console.log("WebSocket connection established!");
    socket.send("Hello from WebView!"); // Send a test message
};

socket.onmessage = function (event) {
    console.log("Message from server: " + event.data); // Should echo the message back
};

socket.onclose = function () {
    console.log("WebSocket connection closed.");
};