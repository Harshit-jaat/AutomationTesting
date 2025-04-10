const express = require("express");
const path = require("path");
const os = require("os");
const axios = require("axios");
const { initWebSocket } = require("./websocket/wsServer");

const uploadRoutes = require("./routes/upload");
const testRoutes = require("./routes/test");

const app = express();

// ===== View Engine Setup =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== Static Files =====
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json()); // ✅ needed to parse JSON request bodies

// ===== Routes =====
app.use("/upload", uploadRoutes);
app.use("/test", testRoutes);
const testCaseApi = require("./routes/testcases");

//APIs
app.use("/api/testcases", testCaseApi);

// ===== Root Page View =====
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/testcases", async (req, res) => {
  try {
    const baseURL = `http://${LOCAL_IP}:${PORT}`;
    const { data } = await axios.get(`${baseURL}/api/testcases`);
    res.render("testcases", { testCases: data.testCases });
  } catch (err) {
    console.error("❌ Failed to load test cases", err);
    res.render("testcases", { testCases: [] });
  }
});

// ===== Start Server =====
const PORT = 3000;
const LOCAL_IP = getLocalIP();

const server = app.listen(PORT, LOCAL_IP, () => {
  console.log(`🚀 Server running at http://${LOCAL_IP}:${PORT}`);
});
initWebSocket(server);

// ===== WebSocket Server (optional setup) =====
// const { initWebSocket } = require("./websocket/wsServer");
// initWebSocket(server);

// ===== Helper: Get Local Network IP =====
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}
