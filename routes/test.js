const express = require("express");
const { exec } = require("child_process");
const WebSocket = require("ws");

const router = express.Router();
let testProcess = null;

// WebSocket Server for real-time updates
const wss = new WebSocket.Server({ port: 8081 });
console.log("✅ WebSocket Server running on ws://localhost:8081");

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Start Onboarding Test API
router.post("/start", (req, res) => {
    if (testProcess) {
        return res.status(400).json({ message: "Test is already running" });
    }

    const testScript = "node tests/binogi/testcases/onboarding/onboarding.js";
    testProcess = exec(testScript);

    testProcess.stdout.on("data", (data) => {
        console.log(`📢 Test Output: ${data}`);
        broadcastMessage(data);
    });

    testProcess.stderr.on("data", (error) => {
        console.error(`❌ Test Error: ${error}`);
        broadcastMessage(`❌ ${error}`);
    });

    testProcess.on("exit", (code) => {
        broadcastMessage(`🚀 Test finished with exit code ${code}`);
        testProcess = null;
    });

    res.json({ message: "✅ Onboarding Test Started!" });
});

// Stop Test API
router.post("/stop", (req, res) => {
    if (!testProcess) {
        return res.status(400).json({ message: "No test is currently running" });
    }

    testProcess.kill("SIGTERM");
    testProcess = null;
    broadcastMessage("🚨 Test Stopped by user.");
    res.json({ message: "⛔ Test Stopped!" });
});

module.exports = router;
