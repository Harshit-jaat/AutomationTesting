const { remote } = require("webdriverio");
const path = require("path");

const appiumConfig = require(path.resolve(__dirname, "../../../../config/appium.config"));
const onboardingIntro = require(path.resolve(__dirname, "../../elements/onboarding/onboardingintro"));
const onboardingRole = require(path.resolve(__dirname, "../../elements/onboarding/onboardingrole"));
const onboardingGrade = require(path.resolve(__dirname, "../../elements/onboarding/onboardinggrade/india"));
const onboardingSubject = require(path.resolve(__dirname, "../../elements/onboarding/onboardingsubject"));

async function runTestForSubject(subjectKey) {
    const subject = onboardingSubject.subjectlist[subjectKey];
    if (!subject) {
        console.warn(`⚠️ Subject not found: ${subjectKey}`);
        return;
    }

    console.log(`\n🚀 Starting onboarding with subject: ${subjectKey.toUpperCase()}`);

    const driver = await remote({
        ...appiumConfig.server,
        capabilities: {
            alwaysMatch: appiumConfig.capabilities,
            firstMatch: [{}],
        },
    });

    try {
        // Allow popup + Let's Go
        const allowPopup = await driver.$(onboardingIntro.allowpopup.path);
        if (await allowPopup.isExisting()) {
            await driver.$(onboardingIntro.allow.path).then(el => el.click());
            console.log("✅ Clicked Allow");
        }

        await driver.$(onboardingIntro.letsgo.path).then(el => el.click());
        console.log("✅ Clicked Let's Go");

        // Select Role
        await driver.$(onboardingRole.teacher.path).then(el => el.click());
        await driver.$(onboardingRole.continue.path).then(el => el.click());
        console.log("✅ Selected Role: Teacher");

        // Select Grade
        await driver.$(onboardingGrade.lowersecondaryschool.path).then(el => el.click());
        await driver.$(onboardingGrade.lowersecondaryschool.grades[9].path).then(el => el.click());
        await driver.$(onboardingGrade.continue.path).then(el => el.click());
        console.log("✅ Selected Grade 9");

        // Select Subject
        await driver.$(subject.path).then(el => el.click());
        await driver.$(onboardingSubject.continue.path).then(el => el.click());
        console.log(`✅ Selected Subject: ${subjectKey.toUpperCase()}`);

        await driver.pause(2000);
    } catch (err) {
        console.error(`❌ Error for subject: ${subjectKey}`, err.message);
        throw err; // important so it counts as failed
    } finally {
        await driver.deleteSession();
        console.log(`✅ Session closed for subject: ${subjectKey}`);
    }
}

// 🔁 Run all subjects one by one (with result tracking)
if (require.main === module) {
    (async () => {
        const subjects = Object.keys(onboardingSubject.subjectlist);
        const passed = [];
        const failed = [];

        for (const subjectKey of subjects) {
            try {
                await runTestForSubject(subjectKey);
                passed.push(subjectKey.toUpperCase());
            } catch (err) {
                failed.push(subjectKey.toUpperCase());
            }

            console.log("\n------------------------------");
        }

        console.log("\n🎯 Test Summary:");
        if (passed.length) console.log(`✅ Passed: ${passed.join(", ")}`);
        if (failed.length) console.log(`❌ Failed: ${failed.join(", ")}`);

        console.log("📢 ✅ All subject onboarding tests completed!");
    })();
}

module.exports = runTestForSubject;