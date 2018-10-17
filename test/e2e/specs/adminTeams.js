const credentials = require('../credentials');

module.exports = {
  'Normal user denied admin team page': 'disabled' + function (browser) {
    const page = browser.page.adminTeams();

    page.login(credentials.user)
      .navigate()
    browser.pause(1000)
      .assert.urlEquals(browser.globals.devServerURL + '/home') // User is redirected to regular user home page
      .end()
  },
  'Admin user can see team list': function (browser) {
    const page = browser.page.adminTeams();

    page.login(credentials.admin)
      .navigate()

    page.expect.section('@teams').to.be.visible.before(2000)
    page.section.teams.expect.element('@pillar').text.contains('Pillar Science Test Labs')
    browser.end()
  },
  'Admin user can create a new team': function (browser) {
    const adminTeamsCreate = browser.page.adminTeamsCreate();

    adminTeamsCreate.login(credentials.admin).navigate()
      .waitForElementVisible('#app', 2000)
      .waitForRoute('admin_teams_create')
      .setValue('@name', 'Nightwatch laboratories')
      .click('@submit')
      .waitForRoute('admin_teams')

    const adminTeams = browser.page.adminTeams();

    adminTeams.navigate()
      .waitForRoute('admin_teams')
    adminTeams.expect.section('@teams').to.be.visible.before(2000)
    adminTeams.section.teams.expect.element('@nightwatch').text.contains('Nightwatch laboratories')
    browser.end()
  }
}