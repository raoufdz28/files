// Test access to the Android JavaScript interface
if (typeof Android !== "undefined" && Android !== null) {
    document.getElementById('result').textContent = "Android interface is accessible!";
    try {
        // Test calling a method exposed by the Android API
        let result = Android.testMethod("Hello from JavaScript!");
        alert("Android method response: " + result);
    } catch (e) {
        alert("Error calling Android method: " + e.message);
    }
} else {
    document.getElementById('result').textContent = "No Android interface detected.";
}