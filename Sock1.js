// Simulates receiving a command from a WebSocket
function simulateWebSocketCommand(command) {
    if (command === "createFile") {
        try {
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

            // Request persistent storage on the device
            window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {
                console.log("File system accessed successfully.");

                // Create a file in the directory
                fs.root.getFile("testfile.txt", { create: true, exclusive: false }, function (fileEntry) {
                    console.log("File created: " + fileEntry.fullPath);
                    document.body.style.backgroundColor = "green";
                }, function (err) {
                    console.error("File creation error:", err);
                    document.body.style.backgroundColor = "red";
                });
            }, function (err) {
                console.error("File system error:", err);
                document.body.style.backgroundColor = "red";
            });
        } catch (error) {
            console.error("Unexpected error:", error);
            document.body.style.backgroundColor = "red";
        }
    }
}

// Simulate a WebSocket message
simulateWebSocketCommand("createFile");
