const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const { broadcastMessage, setProcess } = require("../websocket/wsServer");

const router = express.Router();
let testProcess = null;

// Start any test by path
router.post("/start", (req, res) => {
    
    if (testProcess) {
        return res.status(400).json({ message: "⚠️ A test is already running" });
    }

    const scriptPath = req.body?.script;
    if (!scriptPath) {
        return res.status(400).json({ message: "❌ No script specified" });
    }

    const resolvedScript = path.resolve(__dirname, "../", scriptPath);
    testProcess = exec(`node "${resolvedScript}"`);

    setProcess(testProcess);

    testProcess.stdout.on("data", (data) => {
        const cleanLines = data
            .toString()
            .split("\n")
            .filter(line => {
                return (
                    line.includes("Clicked") ||
                    line.includes("Element found") ||
                    line.includes("✅") ||
                    line.includes("❌") ||
                    line.includes("Selected") ||
                    line.includes("Test finished") ||
                    line.includes("Waiting") ||
                    line.includes("Continuing")
                );
            });
    
        cleanLines.forEach(line => broadcastMessage(`📢 ${line}`));
    });

    testProcess.stderr.on("data", (error) => {
        broadcastMessage(`❌ ${error}`);
    });

    testProcess.on("exit", (code) => {
        broadcastMessage(`✅ Test finished with exit code ${code}`);
        testProcess = null;
        setProcess(null);
    });

    res.json({ message: `🚀 Started test: ${scriptPath}` });
});

// Stop currently running test
router.post("/stop", (req, res) => {
    if (!testProcess) {
        return res.status(400).json({ message: "⚠️ No test is running" });
    }

    testProcess.kill("SIGTERM");
    testProcess = null;
    setProcess(null);
    broadcastMessage("⛔ Test stopped by user.");
    res.json({ message: "⛔ Test Stopped" });
});

module.exports = router;