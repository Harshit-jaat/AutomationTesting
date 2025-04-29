// utils/deviceUtils.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const UPLOADS_DIR = path.join(__dirname, "../uploads");

function getLatestAPK() {
  const files = fs
    .readdirSync(UPLOADS_DIR)
    .filter((file) => file.endsWith(".apk"))
    .map((file) => ({
      file,
      time: fs.statSync(path.join(UPLOADS_DIR, file)).mtime.getTime(),
    }))
    .sort((a, b) => b.time - a.time);

  return files.length > 0 ? path.join(UPLOADS_DIR, files[0].file) : null;
}

function getConnectedDevice() {
  try {
    const output = execSync("adb devices").toString();
    const lines = output
      .split("\n")
      .filter((line) => line.includes("\tdevice"));
    if (lines.length === 0) throw new Error("No Android device connected");
    return lines[0].split("\t")[0];
  } catch (err) {
    console.error("❌ Failed to get connected device:", err.message);
    return null;
  }
}

module.exports = {
  getConnectedDevice,
  getLatestAPK,
};
