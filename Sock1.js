// Simulate WebSocket communication
(function simulateRCE() {
    console.log("Simulating WebSocket RCE...");

    // Example: Simulated commands
    const commands = [
        "alert('Command 1 executed!')",
        "document.body.style.backgroundColor = 'red';",
        "console.log('Command 3 executed!')"
    ];

    // Execute commands at intervals
    commands.forEach((cmd, index) => {
        setTimeout(() => {
            console.log(`Executing: ${cmd}`);
            eval(cmd); // WARNING: Dangerous! Only for testing.
        }, index * 2000); // Execute commands every 2 seconds
    });
})();
