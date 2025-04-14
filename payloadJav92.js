document.body.innerHTML = "<h1>Native Browser API Test Results</h1>";
const results = [];

// Geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        position => results.push(`Geolocation: Supported. Latitude=${position.coords.latitude}, Longitude=${position.coords.longitude}`),
        () => results.push("Geolocation: Permission Denied")
    );
} else {
    results.push("Geolocation: Not Supported");
}

// Camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => results.push("Camera: Supported"))
        .catch(() => results.push("Camera: Permission Denied"));
} else {
    results.push("Camera: Not Supported");
}

// Notifications
if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
        results.push(`Notifications: ${permission}`);
    });
} else {
    results.push("Notifications: Not Supported");
}

// LocalStorage
if (window.localStorage) {
    results.push("LocalStorage: Supported");
    localStorage.setItem("test", "value");
} else {
    results.push("LocalStorage: Not Supported");
}

// Fetch API
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(() => results.push("Fetch API: Supported"))
    .catch(() => results.push("Fetch API: Failed"));

// Display Results
setTimeout(() => {
    document.body.innerHTML += "<ul>" + results.map(r => `<li>${r}</li>`).join("") + "</ul>";
}, 3000);