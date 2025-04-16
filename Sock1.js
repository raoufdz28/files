// Simulate WebSocket
const ws = {
  send: (msg) => console.log("Sending: " + msg),
  onmessage: null,
};

// Simulate receiving a command from the WebSocket
setTimeout(() => {
  console.log("Simulating WebSocket message...");
  ws.onmessage({
    data: "run_command",
  });
}, 2000);

// Define the command handler
ws.onmessage = (event) => {
  console.log("Received command: " + event.data);

  if (event.data === "run_command") {
    // Display a picture stored in a specific path
    const imagePath = "/storage/emulated/0/DCIM/Camera/photo.jpg"; // Example path
    const imgElement = document.createElement("img");
    imgElement.src = `file://${imagePath}`;
    imgElement.style.maxWidth = "100%";
    imgElement.style.maxHeight = "100%";
    document.body.appendChild(imgElement);

    console.log("Image displayed from path:", imagePath);
  }
};
