// Simulating WebSocket connection
const fakeWebSocket = {
  onmessage: null,
  send: function (command) {
    if (this.onmessage) {
      this.onmessage({ data: command });
    }
  },
};

// Command to detect Android version
fakeWebSocket.onmessage = function (event) {
  if (event.data === "getAndroidVersion") {
    try {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      let androidVersion = "Unknown";

      // Extract Android version from the User-Agent string
      if (/Android/.test(userAgent)) {
        const versionMatch = userAgent.match(/Android\s([0-9\.]*)/);
        if (versionMatch && versionMatch[1]) {
          androidVersion = versionMatch[1];
        }
      }

      // Log or display the detected version
      console.log("Detected Android Version: " + androidVersion);

      // Visual feedback
      const resultElement = document.createElement("div");
      resultElement.textContent = "Android Version: " + androidVersion;
      resultElement.style.backgroundColor = "green";
      resultElement.style.color = "white";
      resultElement.style.padding = "10px";
      document.body.appendChild(resultElement);
    } catch (e) {
      console.error("Error detecting Android version:", e);
    }
  }
};

// Trigger the fake WebSocket command
fakeWebSocket.send("getAndroidVersion");
