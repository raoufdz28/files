// Replace this with your WebSocket server address
const serverAddress = "ws://192.168.1.2:4444";

// Create a new WebSocket connection
const socket = new WebSocket(serverAddress);

// Event when the connection is successfully opened
socket.onopen = () => {
  console.log("WebSocket connection established successfully.");
  document.body.innerHTML = "<h1>Connected to WebSocket server</h1>";
};

// Event when there's an error with the connection
socket.onerror = (error) => {
  console.log("WebSocket connection error:", error);
  document.body.innerHTML = "<h1>Failed to connect to WebSocket server</h1>";
};

// Event when the connection is closed
socket.onclose = () => {
  console.log("WebSocket connection closed.");
  document.body.innerHTML = "<h1>WebSocket connection closed</h1>";
};