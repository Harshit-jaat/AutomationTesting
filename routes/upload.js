const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure 'uploads' folder exists
const UPLOADS_DIR = path.join(__dirname, "../uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

// Multer storage configuration to save the uploaded APK with its original filename
const storage = multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (req, file, cb) => {
        const apkFileName = `binogi_latest.apk`; // Always use the same filename
        cb(null, apkFileName);
    }
});

const upload = multer({ storage });

router.post("/", upload.single("apk"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No APK uploaded." });
    }

    const apkPath = path.join(UPLOADS_DIR, req.file.filename);
    console.log(`📂 APK uploaded: ${apkPath}`);

    res.json({ message: "✅ APK Uploaded Successfully!", apkPath });
});

module.exports = router;
