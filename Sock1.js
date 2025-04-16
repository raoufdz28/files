// Simulates a WebSocket server sending commands
function simulateWebSocketServer() {
    setTimeout(() => {
        executeCommand("alert('Test command executed');"); // Example command
    }, 2000);
}

// Executes the received command
function executeCommand(command) {
    try {
        eval(command); // Executes the command
        console.log("Command executed successfully.");
        document.body.style.backgroundColor = "green";
    } catch (error) {
        console.error("Command execution failed:", error);
        document.body.style.backgroundColor = "red";
    }
}

// Start simulating WebSocket communication
simulateWebSocketServer();
