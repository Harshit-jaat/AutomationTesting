const { remote } = require("webdriverio");
const appiumConfig = require( "../../../../config/appium.config");

async function clickByText(driver, text) {
    const tiers = [
      { retries: 5, delay: 0 },
      { retries: 5, delay: 500 },
      { retries: 5, delay: 1000 },
      { retries: 2, delay: 5000 },
    ];
  
    for (const tier of tiers) {
      for (let i = 0; i < tier.retries; i++) {
        try {
          const el = await driver.$(`android=new UiSelector().text("${text}")`);
          if (await el.isDisplayed()) {
            await el.click();
            console.log(`✅ Clicked element with exact text "${text}"`);
            return;
          }
        } catch {}
  
        try {
          const el = await driver.$(`android=new UiSelector().textContains("${text}")`);
          if (await el.isDisplayed()) {
            await el.click();
            console.log(`✅ Clicked element containing text "${text}"`);
            return;
          }
        } catch {}
  
        if (tier.delay > 0) await driver.pause(tier.delay);
      }
    }
  
    throw new Error(`❌ Element with text "${text}" not found or not clickable after all retries`);
  }
  


async function home_bottom_bar_clicks() {
    const driver = await remote({
      ...appiumConfig.server,
      capabilities: {
        alwaysMatch: appiumConfig.capabilities,
        firstMatch: [{}],
      },
    });
    try {
        await driver.pause(10000);
        clickByText(driver,"LET'S Go");
        // await driver.pause(2000);
        clickByText(driver,"Student");
        clickByText(driver,"CONTINUE");
        // await driver.pause(5000);
        clickByText(driver,"Skip this question");
        // await driver.pause(5000);
        clickByText(driver,"LOWER PRIMARY SCHOOL");
        clickByText(driver,"4");
        await driver.pause(1000);
        clickByText(driver,"CONTINUE");
        await driver.pause(10000);
        clickByText(driver,"MATHEMATICS");
        clickByText(driver,"CONTINUE");
        await driver.pause(10000);


        
    } catch (error) {
        console.log(error);
    }
};

if (require.main === module) {
    (async () => {
      await home_bottom_bar_clicks();

    })();
  }
  
  module.exports = {
    home_bottom_bar_clicks,

  };
