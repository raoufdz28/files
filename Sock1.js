// Access camera to take a photo
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        // Optionally capture frames or stream to a server
    })
    .catch(error => console.error("Camera access error", error));
