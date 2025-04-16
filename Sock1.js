// Simulate WebSocket for command communication
const ws = {
    send: (msg) => console.log("WebSocket Message Sent: " + msg),
    onmessage: null,
};

// Simulate receiving a command from the WebSocket
setTimeout(() => {
    console.log("Simulating WebSocket message...");
    ws.onmessage({
        data: "store_and_compare",
    });
}, 2000);

// Variables to simulate memory storage
let memorySlot1 = null;
let memorySlot2 = null;

// Command handler
ws.onmessage = (event) => {
    console.log("Received command: " + event.data);

    if (event.data === "store_and_compare") {
        // Step 1: Store values in "memory"
        memorySlot1 = "Value123";
        memorySlot2 = "Payload456";

        console.log("Stored in memorySlot1:", memorySlot1);
        console.log("Stored in memorySlot2:", memorySlot2);

        // Step 2: Retrieve and compare
        const retrievedValue1 = memorySlot1;
        const retrievedValue2 = memorySlot2;

        if (retrievedValue1 === "Value123" && retrievedValue2 === "Payload456") {
            console.log("Memory test succeeded. Values match!");
            document.body.style.backgroundColor = "green"; // Visual confirmation
        } else {
            console.log("Memory test failed. Values do not match.");
            document.body.style.backgroundColor = "red"; // Visual confirmation
        }
    }
};
