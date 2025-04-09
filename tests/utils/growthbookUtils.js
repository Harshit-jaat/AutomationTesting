const { spawn } = require("child_process");
const { broadcastMessage } = require("../../websocket/wsServer");

function readExperimentVariantFromLog(timeoutMs = 10000) {
    console.log("🔥 readExperimentVariantFromLog() called");
    return new Promise((resolve, reject) => {
        const logcat = spawn("adb", ["logcat", "*:S", "ReactNativeJS:V"]);
        broadcastMessage("🔍 Listening to logcat for experiment variant...");

        const timeout = setTimeout(() => {
            logcat.kill();
            broadcastMessage("⏰ Timed out waiting for experiment log.");
            reject(new Error("Timeout while waiting for experiment log"));
        }, timeoutMs);

        logcat.stdout.on("data", (data) => {
            const lines = data.toString().split("\n");
            lines.forEach((line) => {
                if (line.includes("Experiment aa-test=")) {
                    broadcastMessage(`🧪 Raw Log Found: ${line}`);
                    const match = line.match(/'Experiment aa-test=', '(\w+)'/);
                    console.log("aaaa",match);
                    if (match) {
                        clearTimeout(timeout);
                        logcat.kill();
                        broadcastMessage(`🧪 Variant detected: ${match[1].toLowerCase()}`);
                        resolve(match[1].toLowerCase()); // a or b
                    }
                }
            });
        });

        logcat.stderr.on("data", (err) => {
            clearTimeout(timeout);
            logcat.kill();
            reject(new Error(`logcat error: ${err}`));
        });
    });
}



function streamGrowthExperimentLogs() {
    const logcat = spawn("adb", ["logcat", "*:S", "ReactNative:V"]);

    logcat.stdout.on("data", (data) => {
        const line = data.toString();
        if (line.includes("Experiment aa-test=")) {
            broadcastMessage(`🧪 ${line.trim()}`);
        }
    });

    logcat.stderr.on("data", (err) => {
        broadcastMessage(`❌ Logcat Error: ${err.toString()}`);
    });

    logcat.on("close", () => {
        broadcastMessage("📴 Stopped streaming experiment logs");
    });

    return logcat; // return the process so you can stop it if needed
}

module.exports = {
    readExperimentVariantFromLog,
    streamGrowthExperimentLogs
};
