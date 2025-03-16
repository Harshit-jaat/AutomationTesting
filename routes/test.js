const express = require("express");
const { exec } = require("child_process");
const WebSocket = require("ws");

const router = express.Router();
const wss = new WebSocket.Server({ port: 8080 });

router.post("/", (req, res) => {
    const testScript = "node testScripts/binogiTest.js"; // Run Appium test

    const process = exec(testScript);

    process.stdout.on("data", (data) => {
        console.log(`📢 Test Output: ${data}`);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    process.stderr.on("data", (error) => {
        console.error(`❌ Test Error: ${error}`);
    });

    res.json({ message: "✅ Test Started!" });
});

module.exports = router;
