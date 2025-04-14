(function testWebViewCapabilities() {
    // Log test initialization
    console.log("Testing WebView Capabilities...");

    // Basic test: Confirm JavaScript execution
    alert("JavaScript execution is working!");

    // Test for AndroidInterface and its methods
    if (window.AndroidInterface) {
        console.log("AndroidInterface is available.");
        alert("AndroidInterface detected!");

        // Check for specific methods
        if (typeof window.AndroidInterface.executeCommand === 'function') {
            alert("Found executeCommand method! Testing...");
            try {
                let commandResult = window.AndroidInterface.executeCommand("ls /");
                alert("Command executed! Result: " + commandResult);
                console.log("Command Output:", commandResult);
            } catch (error) {
                alert("Error executing command: " + error.message);
                console.error("Command Execution Error:", error);
            }
        } else {
            alert("No executeCommand method found in AndroidInterface.");
        }
    } else {
        alert("No AndroidInterface detected.");
    }

    // Test for local storage access
    try {
        localStorage.setItem("testKey", "testValue");
        let testValue = localStorage.getItem("testKey");
        if (testValue === "testValue") {
            alert("LocalStorage is accessible!");
            console.log("LocalStorage Test Passed: Value =", testValue);
        } else {
            alert("LocalStorage test failed.");
        }
    } catch (error) {
        alert("Error accessing LocalStorage: " + error.message);
        console.error("LocalStorage Error:", error);
    }

    // Test for file upload capabilities (if any input elements exist)
    let fileInputTest = document.createElement("input");
    fileInputTest.type = "file";
    if (fileInputTest) {
        alert("File input element can be created. File uploads may be possible.");
    } else {
        alert("File input element cannot be created. File uploads not possible.");
    }

    // Test for network fetch capabilities
    try {
        fetch("https://jsonplaceholder.typicode.com/posts/1")
            .then(response => response.json())
            .then(data => {
                alert("Fetch request succeeded! Check console for response.");
                console.log("Fetch Response:", data);
            })
            .catch(error => {
                alert("Fetch request failed: " + error.message);
                console.error("Fetch Error:", error);
            });
    } catch (error) {
        alert("Fetch not supported: " + error.message);
        console.error("Fetch Error:", error);
    }

    // Test for DOM manipulation
    try {
        let testDiv = document.createElement("div");
        testDiv.id = "testDiv";
        testDiv.textContent = "DOM manipulation is working!";
        document.body.appendChild(testDiv);
        alert("DOM manipulation succeeded! Check the page for changes.");
    } catch (error) {
        alert("DOM manipulation failed: " + error.message);
        console.error("DOM Error:", error);
    }
})();