// Check if the WebView provides a JavaScript interface
if (window.AndroidInterface && typeof window.AndroidInterface.executeCommand === 'function') {
    // Try executing a basic command
    try {
        window.AndroidInterface.executeCommand("ls /"); // List the root directory as a test
        console.log("Command executed successfully.");
    } catch (error) {
        console.error("Error executing command:", error);
    }
} else {
    console.warn("JavaScript interface not available or executeCommand method not exposed.");
}