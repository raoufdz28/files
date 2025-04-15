let socket;

window.onload = function () {
    // Replace with your PC's IP address and WebSocket port
    const serverAddress = "ws://192.168.1.2:4444";

    // Initialize WebSocket connection
    socket = new WebSocket(serverAddress);

    socket.onopen = () => {
        document.getElementById("status").innerText = "Status: Connected";
    };

    socket.onmessage = (event) => {
        const output = document.getElementById("output");
        output.innerText += `Server: ${event.data}\n`;
    };

    socket.onerror = (error) => {
        document.getElementById("status").innerText = "Status: Error";
        console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
        document.getElementById("status").innerText = "Status: Disconnected";
    };
};

function sendCommand() {
    const command = document.getElementById("command").value;
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(command);
        const output = document.getElementById("output");
        output.innerText += `You: ${command}\n`;
    } else {
        alert("WebSocket is not connected.");
    }
}