const WebSocket = require("ws");

let wss;
let testProcess = null;

function initWebSocket(server) {
    wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("✅ WebSocket Client Connected");
        ws.send("💡 Ready to receive test logs...");
    });
}

function broadcastMessage(message) {
    if (!wss) return;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message.toString());
        }
    });
}

function setProcess(proc) {
    testProcess = proc;
}

module.exports = {
    initWebSocket,
    broadcastMessage,
    setProcess
};