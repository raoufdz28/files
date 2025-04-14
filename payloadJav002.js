function testAndroidInterface() {
    try {
        if (typeof Android !== 'undefined') {
            // Try invoking a test method
            Android.showToast("Hello from JavaScript!");
            return "Android interface detected and working!";
        } else {
            return "No Android interface detected.";
        }
    } catch (error) {
        return "Error calling Android interface: " + error.message;
    }
}

// Display the result in the console or on the page
console.log(testAndroidInterface());