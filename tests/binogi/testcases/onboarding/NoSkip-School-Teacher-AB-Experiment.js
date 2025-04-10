const { remote } = require("webdriverio");
const path = require("path");
const {
  clickElement,
  waitForElement,
  handleTestError,
  restartDriver,
} = require("../../../utils/elementUtils");

const {
  readExperimentVariantFromLog,
} = require("../../../utils/growthbookUtils");

const appiumConfig = require(
  path.resolve(__dirname, "../../../../config/appium.config"),
);
const onboardingIntro = require(
  path.resolve(__dirname, "../../elements/onboarding/onboardingintro"),
);
const onboardingRole = require(
  path.resolve(__dirname, "../../elements/onboarding/onboardingrole"),
);
const onboardingGrade = require(
  path.resolve(__dirname, "../../elements/onboarding/onboardinggrade/india"),
);
const onboardingSubject = require(
  path.resolve(__dirname, "../../elements/onboarding/onboardingsubject"),
);
const onboardingSchool = require(
  path.resolve(__dirname, "../../elements/onboarding/onboardingschool"),
);

let locationPopupShown = false;

async function runNormalOnboardingTest() {
  const driver = await remote({
    ...appiumConfig.server,
    capabilities: {
      alwaysMatch: appiumConfig.capabilities,
      firstMatch: [{}],
    },
  });

  try {
    console.log("🚀 Starting Normal Onboarding Flow");

    // Step 1: Allow pop-up and press Let's Go
    const allowPopup = await driver.$(onboardingIntro.allowpopup.path);
    if (await allowPopup.isExisting()) {
      await clickElement(driver, onboardingIntro.allow.path);
      console.log("✅ Clicked Allow button");
    }

    // Click Let's Go (any of the available options)
let letsGoClicked = false;

for (const option of onboardingIntro.letsgoOptions) {
    const letsGoEl = await driver.$(option.path);
    if (await letsGoEl.isExisting()) {
        await letsGoEl.click();
        console.log(`✅ Clicked '${option.desc}'`);
        letsGoClicked = true;
        break;
    }
}

if (!letsGoClicked) {
    throw new Error("❌ Could not find any 'Let's Go' button variant");
}

    // Select Role
    await driver.$(onboardingRole.teacher.path).then((el) => el.click());
    await driver.$(onboardingRole.continue.path).then((el) => el.click());
    console.log("✅ Selected Role: Teacher");

    const locationPopup = await driver.$(onboardingSchool.locationPrompt.path);
    if (await locationPopup.isExisting()) {
      if (!locationPopupShown) {
        await clickElement(driver, onboardingSchool.whileUsingApp.path);
        locationPopupShown = true;
        console.log("🌍 Location permission allowed");
      } else {
        throw new Error(
          "❌ Location permission popup appeared again! It should only appear once.",
        );
      }
    }

   // After detecting the variant
console.log("🧪 Checking GrowthBook variant from logs...");
const variant = await readExperimentVariantFromLog();
console.log(`🧪 Experiment variant detected: ${variant}`);

// Handle school page based on experiment variant
if (variant === "a") {
  const skipExists = await driver
    .$$(onboardingSchool.skipQuestionText.path);

  if (skipExists.length > 0) {
    throw new Error("❌ 'Skip this question' should be hidden for Variant A (Teacher role)");
  }

  console.log("✅ Verified: 'Skip this question' is hidden for Variant A");

  // Type and select a school (replace 'Test School' with a real value if needed)
  const schoolInput = await waitForElement(driver, onboardingSchool.schoolSearchInput.path);
  await schoolInput.setValue("Test School");
  console.log("🏫 Entered school name: Test School");

  await driver.pause(1000); // Wait for suggestions to load (can be optimized)

  // Select the first result if available
  const firstSuggestion = await driver.$('//android.widget.TextView[contains(@text, "Test School")]');
  if (await firstSuggestion.isExisting()) {
    await firstSuggestion.click();
    console.log("✅ Selected school from suggestions");
  } else {
    throw new Error("❌ No matching school suggestions found after typing");
  }

  await clickElement(driver, onboardingSchool.continueButton.path);
  console.log("✅ Clicked Continue on school page");
} else {
  // Default behavior for 'base' or others (skip allowed)
  const skipExists = await driver.$(onboardingSchool.skipQuestionText.path).isExisting();

  if (skipExists) {
    await clickElement(driver, onboardingSchool.skipQuestionText.path);
    console.log("✅ Clicked 'Skip this question'");
  } else {
    console.log("⚠️ Skip option not available. Clicking Continue directly");
    await clickElement(driver, onboardingSchool.continueButton.path);
  }
}

    //✅ Step 3: Select all grades dynamically
    const schoolKeys = Object.keys(onboardingGrade).filter(
      (key) => onboardingGrade[key].grades,
    );

    for (const schoolKey of schoolKeys) {
      const school = onboardingGrade[schoolKey];
      await clickElement(driver, school.path);
      console.log(`✅ Opened ${school.text}`);

      const gradeKeys = Object.keys(school.grades);

      for (let i = 0; i < gradeKeys.length; i++) {
        const gradeKey = gradeKeys[i];

        await clickElement(driver, school.path);
        console.log(`✅ Re-opened ${school.text}`);

        await clickElement(driver, school.grades[gradeKey].path);
        console.log(`✅ Selected Grade ${gradeKey}`);

        await clickElement(driver, onboardingGrade.continue.path);
        console.log("✅ Clicked Continue after grade selection");

        if (
          i !== gradeKeys.length - 1 ||
          schoolKey !== schoolKeys[schoolKeys.length - 1]
        ) {
          await clickElement(driver, onboardingGrade.backbutton.path);
          console.log("🔙 Back to Grade Selection");
        }
      }
    }

    //✅ Step 4: Click all subjects
    const subjectKeys = Object.keys(onboardingSubject.subjectlist);

    for (const subjectKey of subjectKeys) {
      const subject = onboardingSubject.subjectlist[subjectKey];
      const el = await waitForElement(driver, subject.path);
      if (await el.isExisting()) {
        await clickElement(driver, subject.path);
        console.log(`✅ Selected Subject: ${subjectKey.toUpperCase()}`);
        await driver.pause(300);
      }
    }

    await clickElement(driver, onboardingSubject.continue.path);
    console.log("✅ Clicked Continue after subject selection");

    await driver.pause(3000);
    console.log("🏠 Reached Home Screen");
  } catch (error) {
    handleTestError(error, "Normal Onboarding Test");
  } finally {
    await driver.deleteSession();
    console.log("✅ Session Closed");
  }
}

async function baseStudentSkipSchool(driver, results = []) {
  const testName = "base-student-skip_school";
  console.log(`\n🧪 Running test: ${testName}`);

  try {
    let variant = "";

    // Keep resetting app until variant is 'base'
    let attempt = 0;
    while (variant !== "base" && attempt < 5) {
      attempt++;
      console.log(`🔁 Attempt ${attempt}: Launching app to fetch variant...`);

      // Go through intro and role selection
      const allowPopup = await driver.$(onboardingIntro.allowpopup.path);
      if (await allowPopup.isExisting()) {
        await clickElement(driver, onboardingIntro.allow.path);
      }

      for (const option of onboardingIntro.letsgo) {
        const letsGoEl = await driver.$(option.path);
        if (await letsGoEl.isExisting()) {
          await letsGoEl.click();
          break;
        }
      }

       

      await clickElement(driver, onboardingRole.teacher.path);
      await clickElement(driver, onboardingRole.continue.path);

      const locationPopup = await driver.$(onboardingSchool.locationPrompt.path);
      if (await locationPopup.isExisting()) {
        await clickElement(driver, onboardingSchool.whileUsingApp.path);
      }

      // Now check the experiment variant from logs
      variant = await readExperimentVariantFromLog();
      console.log(`🧪 Detected variant: ${variant.value}`);

      if (variant !== "base") {
        console.log("⚠️ Variant is not 'base', resetting app...");
        driver = await restartDriver(driver); // short delay before retry
      }

     
    }

    if (variant !== "base") {
      throw new Error("❌ Failed to get 'base' variant after multiple attempts");
    }

    // At this point, variant is 'base', and we’re on school page
    const skipExists = await driver.$(onboardingSchool.skipQuestionText.path).isExisting();
    if (!skipExists) {
      throw new Error("❌ Expected 'Skip this question' to be visible for base-student");
    }

    await clickElement(driver, onboardingSchool.skipQuestionText.path);
    console.log(`✅ Passed: ${testName}`);
    results.push({ testName, status: "PASSED" });

  } catch (error) {
    console.error(`❌ Failed: ${testName} - ${error.message}`);
    results.push({ testName, status: "FAILED", error: error.message });
  }

  await driver.reset();
}

// Run if executed directly
if (require.main === module) {
  (async () => {
    const driver = await remote({
      ...appiumConfig.server,
      capabilities: {
        alwaysMatch: appiumConfig.capabilities,
        firstMatch: [{}],
      },
    });

    const results = [];

    try {
      await baseStudentSkipSchool(driver, results);
    } catch (err) {
      console.error("❌ Script Error Output:\n", err);
    } finally {
      await driver.deleteSession();
      console.log("✅ Session Closed");

      // Optional: Print test summary
      console.log("\n📋 Test Summary:");
      results.forEach((r) =>
        console.log(`${r.status} - ${r.testName}${r.error ? ` - ${r.error}` : ""}`),
      );
    }
  })();
}

module.exports = baseStudentSkipSchool;
