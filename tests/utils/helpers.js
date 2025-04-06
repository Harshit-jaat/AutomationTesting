const fs = require("fs");
const path = require("path");

const UPLOADS_DIR = path.join(__dirname, "../../uploads");
const { execSync } = require("child_process");

/**
 * Get the latest uploaded APK file.
 * @returns {string|null} The full path of the latest APK.
 */
function getLatestAPK() {
    const files = fs.readdirSync(UPLOADS_DIR)
        .filter(file => file.endsWith(".apk")) // Only APK files
        .map(file => ({ file, time: fs.statSync(path.join(UPLOADS_DIR, file)).mtime.getTime() }))
        .sort((a, b) => b.time - a.time); // Sort by last modified

    return files.length > 0 ? path.join(UPLOADS_DIR, files[0].file) : null;
}

function getConnectedDevice() {
    try {
        const output = execSync("adb devices").toString();
        const lines = output.split("\n").filter(line => line.includes("\tdevice"));
        if (lines.length === 0) throw new Error("No Android device connected");
        return lines[0].split("\t")[0]; // return the device ID
    } catch (err) {
        console.error("❌ Failed to get connected device:", err.message);
        return null;
    }
}



/**
 * Logs messages with timestamps.
 * @param {string} message - The message to log.
 */
function log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
}

module.exports = {
    getConnectedDevice,
    getLatestAPK,
    log
};
