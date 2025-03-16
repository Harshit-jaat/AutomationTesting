const express = require("express");
const app = express();
const os = require("os");

const uploadRoutes = require("./routes/upload");
const testRoutes = require("./routes/test");

app.use(express.static("public"));
app.use("/upload", uploadRoutes);
app.use("/test", testRoutes);

const PORT = 3000;
const LOCAL_IP = getLocalIP(); // Get local network IP

app.listen(PORT, LOCAL_IP, () => {
    console.log(`🚀 Server running at http://${LOCAL_IP}:${PORT}`);
});

// Function to get the local network IP address
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "localhost";
}
