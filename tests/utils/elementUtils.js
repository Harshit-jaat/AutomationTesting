/**
 * Wait for an element and interact.
 * @param {WebdriverIO.Browser} driver - The WebDriverIO browser instance.
 * @param {string} selector - The element selector.
 */
async function waitForElement(driver, selector, timeout = 5000) {
    const element = await driver.$(selector);
    await element.waitForDisplayed({ timeout });
    return element;
}

async function clickElement(driver, selector) {
    const element = await waitForElement(driver, selector);
    await element.click();
}

async function enterText(driver, selector, text) {
    const element = await waitForElement(driver, selector);
    await element.setValue(text);
}

module.exports = {
    waitForElement,
    clickElement,
    enterText
};
