const DEFAULT_TIMEOUT = 5000;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000;
const fs = require("fs");
const path = require("path");

const { broadcastMessage } = require("../../websocket/wsServer");
const appiumConfig = require(
    path.resolve(__dirname, "../../config/appium.config.js"),
  );

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryAction(
  actionFn,
  { retries = RETRY_ATTEMPTS, delay = RETRY_DELAY, label = "" } = {},
) {
  let attempt = 0;

  while (attempt < retries) {
    try {
      const result = await actionFn();
      // ✅ DON'T log success here. Let the test control that.
      return result;
    } catch (err) {
      attempt++;
      console.warn(
        `⚠️ ${label || "Action"} failed (attempt ${attempt}): ${err.message}`,
      );
      if (attempt < retries) {
        await wait(delay);
      } else {
        console.error(
          `❌ ${label || "Action"} failed after ${retries} attempts`,
        );
        throw err; // propagate final failure
      }
    }
  }
}

// 🧠 Retry-enabled element fetch with display check
async function waitForElement(driver, selector, timeout = DEFAULT_TIMEOUT) {
  return await retryAction(
    async () => {
      const element = await driver.$(selector);
      await element.waitForDisplayed({ timeout });
      return element;
    },
    {
      label: `Wait for element ${selector}`,
    },
  );
}

// 🔁 Retry-enabled click
async function clickElement(driver, selector) {
  return await retryAction(
    async () => {
      const el = await waitForElement(driver, selector);
      await el.click();
    },
    {
      label: `Click ${selector}`,
      retries: 3,
      delay: 2000,
    },
  );
}

async function enterText(driver, selector, text, label = null) {
  return await retryAction(
    async () => {
      const el = await waitForElement(driver, selector);
      await el.setValue(text);
    },
    {
      label: label ? `Enter: ${label}` : `Enter text into ${selector}`,
    },
  );
}

async function getText(driver, selector, label = null) {
  return await retryAction(
    async () => {
      const el = await waitForElement(driver, selector);
      return await el.getText();
    },
    {
      label: label ? `Get: ${label}` : `Get text from ${selector}`,
    },
  );
}

// utils/errorUtils.js
function handleTestError(error, testName = "Unknown Test") {
  const msg = error.message || "Unknown error";
  const trace = error.stack || "No stack trace available";

  let friendly = "💥 Unexpected error occurred.";
  if (msg.includes("NoSuchElement")) {
    friendly = "❗ UI Element not found.";
  } else if (msg.includes("timeout")) {
    friendly = "⏳ Timeout while waiting for element.";
  }

  broadcastMessage(
    [
      `🚨 ${testName} Failed`,
      `🧾 Message: ${friendly}`,
      `🧠 Raw Error: ${msg}`,
      `📄 Stack Trace:\n${trace}`,
    ].join("\n"),
  );
}


async function restartDriver(driverRef) {
    await driverRef.deleteSession();
    return await remote({
      ...appiumConfig.server,
      capabilities: appiumConfig.capabilities,
    });
  }

module.exports = {
  waitForElement,
  clickElement,
  enterText,
  getText,
  retryAction,
  handleTestError,
  restartDriver,
};
