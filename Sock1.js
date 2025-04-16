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

    // Command to create the file in "Internal storage/Folder 1"
    const simulatedCommand = "echo 'RCE Test Success' > /storage/emulated/0/Folder 1/rce.txt";

    fetch(`/exec?cmd=${encodeURIComponent(simulatedCommand)}`)
      .then((response) => response.text())
      .then((result) => {
        console.log("Command executed:", result);
      })
      .catch((error) => {
        console.error("Error executing command:", error);
      });
  }
};
