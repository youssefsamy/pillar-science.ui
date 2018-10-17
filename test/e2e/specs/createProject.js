const credentials = require('../credentials');

module.exports = {
  '@tags': ['active'],
  'Create a new project': function (browser) {
    browser.login(credentials.collegue)
      .url(browser.globals.devServerURL + '/projects')
      .waitForElementPresent('[test-route-name="projects"]')
      .click('[test-id="create-project-btn"]')
      .waitForElementPresent('[test-route-name="project_create_wizard"]')
      .waitForElementPresent('[test-id="project-team"] option[test-name="Pillar Science Test Labs"]')
      .setValue('[test-id="project-name"]', 'Nightwatch Testing Project')
      .click('[test-id="project-team"] option[test-name="Pillar Science Test Labs"]')
      .waitForElementPresent('[test-id="project-create-wizard"] #stepper-continue-btn:not([disabled])')
      .click('[test-id="project-create-wizard"] #stepper-continue-btn')
      .waitForElementPresent('[test-id="project-confirmation-step"]')
      .assert.containsText('[test-id="project-confirmation-step"] [test-id="name"] p', 'Nightwatch Testing Project')
      .assert.containsText('[test-id="project-confirmation-step"] [test-id="team"] p', 'Pillar Science Test Labs')
      .assert.containsText('[test-id="project-confirmation-step"] [test-id="members"] p', 'Emily the collegue')
      .click('[test-id="project-create-wizard"] #stepper-complete-btn')
      .waitForElementPresent('[test-route-name="projects"]')
      .waitForElementPresent('[test-component="project-card"][test-name="Nightwatch Testing Project"]')
  }
}
