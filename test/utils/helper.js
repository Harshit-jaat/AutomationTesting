const fs = require("fs");
const path = require("path");

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

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

/**
 * Logs messages with timestamps.
 * @param {string} message - The message to log.
 */
function log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
}

module.exports = {
    getLatestAPK,
    log
};
