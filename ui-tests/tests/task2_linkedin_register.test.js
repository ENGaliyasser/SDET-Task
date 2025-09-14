/**
 * task2LinkedinRegisterTest.js
 * Automated test for LinkedIn registration using Nightwatch.js and Page Object Model.
 * Steps:
 *   1. Open LinkedIn homepage and navigate to registration
 *   2. Enter email and password
 *   3. Submit registration form
 *   4. Enter first and last name
 *   5. Continue to next step
 *   6. Assert security verification page is shown
 */

const userData = require('../data/task2_linkedin_user.json');

module.exports = {
  'LinkedIn Registration Flow': function (browser) {
    const linkedinPage = browser.page.task2_linkedin_page();

    // Step 1: Open LinkedIn homepage and navigate to registration
    linkedinPage
      .navigate()
      .goToRegistration();
    browser.saveScreenshot('ui-tests/screenshots/task2/Step1_Open_LinkedIn_registration.png');
    // Step 2: Enter email and password
    linkedinPage
      .fillEmailAndPassword(userData.email, userData.password);
    browser.saveScreenshot('ui-tests/screenshots/task2/Step2_Enter_email_password.png');

    // Step 3: Submit registration form
    linkedinPage
      .submitRegistration();
    browser.saveScreenshot('ui-tests/screenshots/task2/Step3_Submit_registration.png');
    // Step 4: Enter first and last name
    linkedinPage
      .fillName(userData.firstName, userData.lastName);
    browser.saveScreenshot('ui-tests/screenshots/task2/Step4_Enter_first_last_name.png');

    // Step 5: Continue to next step
    linkedinPage
      .continueAfterName();
    browser.saveScreenshot('ui-tests/screenshots/task2/Step5_Continue_after_name.png');

    // Step 6: Assert security verification page is shown
    linkedinPage
      .verifySecurityPage();
    browser.saveScreenshot('ui-tests/screenshots/task2/Step6_Verify_security_page.png');

    // End the browser session
    browser.end();
  }
};
