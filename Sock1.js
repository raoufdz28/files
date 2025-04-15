const serverAddress = "wss://echo.websocket.org";

// Create a new WebSocket connection
const socket = new WebSocket(serverAddress);

// Event when the connection is successfully opened
socket.onopen = () => {
  console.log("WebSocket connection established successfully.");
  document.body.innerHTML = "<h1>Connected to WebSocket server</h1>";

  // Send a test message
  socket.send("Hello, WebSocket!");
};

// Event when a message is received
socket.onmessage = (event) => {
  console.log("Message from server:", event.data);
  document.body.innerHTML += `<p>Received message: ${event.data}</p>`;
};

// Event when there's an error with the connection
socket.onerror = (error) => {
  console.log("WebSocket connection error:", error);
  document.body.innerHTML = "<h1>Failed to connect to WebSocket server</h1>";
};

// Event when the connection is closed
socket.onclose = () => {
  console.log("WebSocket connection closed.");
  document.body.innerHTML += "<h1>WebSocket connection closed</h1>";
};
