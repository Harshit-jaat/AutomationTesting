const { initDriver, quitDriver } = require("../../../utils/helpers");
const { click } = require("../../../utils/mainfunction"); // adjust path properly

async function home_bottom_bar_clicks() {
  await initDriver();

  try {
    await click("LET'S Go");
    await click("Student");
    await click("CONTINUE");
    await click("Skip this question");
    await click("LOWER PRIMARY SCHOOL");
    await click("4");
    await click("CONTINUE");
    await click("MATHEMATICS");
    await click("CONTINUE");
  } catch (error) {
    console.error(error);
  } finally {
    await quitDriver();
  }
}

if (require.main === module) {
  (async () => {
    await home_bottom_bar_clicks();
  })();
}

module.exports = {
  home_bottom_bar_clicks,
};