const DEFAULT_TIMEOUT = 5000;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryAction(actionFn, { retries = RETRY_ATTEMPTS, delay = RETRY_DELAY, label = "" } = {}) {
    let attempt = 0;

    while (attempt < retries) {
        try {
            const result = await actionFn();
            // ✅ DON'T log success here. Let the test control that.
            return result;
        } catch (err) {
            attempt++;
            console.warn(`⚠️ ${label || "Action"} failed (attempt ${attempt}): ${err.message}`);
            if (attempt < retries) {
                await wait(delay);
            } else {
                console.error(`❌ ${label || "Action"} failed after ${retries} attempts`);
                throw err; // propagate final failure
            }
        }
    }
}

// 🧠 Retry-enabled element fetch with display check
async function waitForElement(driver, selector, timeout = DEFAULT_TIMEOUT) {
    return await retryAction(async () => {
        const element = await driver.$(selector);
        await element.waitForDisplayed({ timeout });
        return element;
    }, {
        label: `Wait for element ${selector}`
    });
}

// 🔁 Retry-enabled click
async function clickElement(driver, selector) {
    return await retryAction(async () => {
        const el = await waitForElement(driver, selector);
        await el.click();
    }, {
        label: `Click ${selector}`,
        retries: 3,
        delay: 2000
    });
}

async function enterText(driver, selector, text, label = null) {
    return await retryAction(async () => {
        const el = await waitForElement(driver, selector);
        await el.setValue(text);
    }, {
        label: label ? `Enter: ${label}` : `Enter text into ${selector}`
    });
}

async function getText(driver, selector, label = null) {
    return await retryAction(async () => {
        const el = await waitForElement(driver, selector);
        return await el.getText();
    }, {
        label: label ? `Get: ${label}` : `Get text from ${selector}`
    });
}

module.exports = {
    waitForElement,
    clickElement,
    enterText,
    getText,
    retryAction // expose if needed elsewhere
};