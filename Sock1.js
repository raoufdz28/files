// Simulates receiving a command from a WebSocket
function simulateWebSocketCommand(command) {
    if (command === "createFile") {
        try {
            const fileName = "/storage/emulated/0/Download/testfile.txt";
            const fileHandle = new File([new Blob()], fileName, { type: "text/plain" });

            console.log(`File created: ${fileHandle.name}`);
            document.body.style.backgroundColor = "green";
        } catch (error) {
            console.error("Error creating file:", error);
            document.body.style.backgroundColor = "red";
        }
    }
}

// Simulate a WebSocket message
simulateWebSocketCommand("createFile");
