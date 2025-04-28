const { click } = require("./mainfunction"); // adjust the correct path
const intro = require("../binogi/elements/onboarding/intro"); // your element page

async function clickContinue(options = {delay : 500}) {
  const text = intro.continue?.en || "Continue";
  await click(text, options);
}