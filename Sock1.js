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
    // Visible RCE Command: Change background color
    document.body.style.backgroundColor = "red";

    // Command to trigger device vibration
    if (navigator.vibrate) {
      navigator.vibrate(1000); // Vibrate for 1 second
      console.log("Device vibration triggered.");
    } else {
      console.error("Vibration API not supported or permission denied.");
    }
  }
};
