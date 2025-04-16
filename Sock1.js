// Simulated WebSocket object
const simulatedWebSocket = {
  onmessage: null,
  send: function (command) {
    if (this.onmessage) {
      this.onmessage({ data: command });
    }
  },
};

// Function to create a test file
function createTestFile() {
  try {
    const fileName = "testtxt.txt";
    const filePath = "/storage/emulated/0/Download/" + fileName; // Common internal storage path for Android devices
    const fileContent = "This is a test file.";

    // Use the FileSystem API to write the file
    if (window.resolveLocalFileSystemURL) {
      window.resolveLocalFileSystemURL("/storage/emulated/0/Download", function (dirEntry) {
        dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
          fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function () {
              console.log("File successfully created: " + filePath);
            };
            fileWriter.onerror = function (err) {
              console.error("Failed to write file: " + err.message);
            };

            const blob = new Blob([fileContent], { type: "text/plain" });
            fileWriter.write(blob);
          }, function (err) {
            console.error("Failed to create writer: " + err.message);
          });
        }, function (err) {
          console.error("Failed to get file: " + err.message);
        });
      }, function (err) {
        console.error("Failed to access directory: " + err.message);
      });
    } else {
      console.error("FileSystem API is not supported on this device.");
    }
  } catch (err) {
    console.error("Error creating file: " + err.message);
  }
}

// Simulate receiving a WebSocket command
simulatedWebSocket.onmessage = function (event) {
  const command = event.data;
  if (command === "createTestFile") {
    createTestFile();
  } else {
    console.log("Unknown command received: " + command);
  }
};

// Trigger the WebSocket simulation
simulatedWebSocket.send("createTestFile");
