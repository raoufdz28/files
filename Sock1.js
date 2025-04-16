// Simulates receiving a command from a WebSocket
function simulateWebSocketCommand(command) {
    if (command === "storeData") {
        try {
            // Write data to localStorage
            localStorage.setItem("testKey", "testValue");

            // Read the data back to verify
            const storedValue = localStorage.getItem("testKey");

            if (storedValue === "testValue") {
                console.log("Data stored successfully: " + storedValue);
                document.body.style.backgroundColor = "green";
            } else {
                console.error("Failed to store data.");
                document.body.style.backgroundColor = "red";
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            document.body.style.backgroundColor = "red";
        }
    }
}

// Simulate a WebSocket message
simulateWebSocketCommand("storeData");
