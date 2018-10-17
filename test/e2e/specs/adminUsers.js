const credentials = require('../credentials');

module.exports = {
  'Normal user denied admin user page': 'disabled' + function (browser) {
    const page = browser.page.adminUsers();

    page.login(credentials.user)
    page.navigate(() => {})
    browser.pause(1000)
      .assert.urlEquals(browser.globals.devServerURL + '/home') // User is redirected to regular user home page
      .end()
  },
  'Admin user can see user list': function (browser) {
    const page = browser.page.adminUsers();

    page.login(credentials.admin)
    page.navigate()

    page.expect.section('@users').to.be.visible.before(2000)
    page.section.users.expect.element('@james').text.contains('James the admin')
    page.section.users.expect.element('@james').text.contains('admin@pillar.science')
    page.section.users.expect.element('@david').text.contains('David the user')
    page.section.users.expect.element('@david').text.contains('user@pillar.science')
    browser.end()
  },
  'Admin user can create a new user': function (browser) {
    const adminUsersCreate = browser.page.adminUsersCreate();

    adminUsersCreate.login(credentials.admin).navigate()
      .waitForElementVisible('#app', 2000)
      .waitForRoute('admin_users_create')
      .setValue('@name', 'Gary the newcomer')
      .setValue('@email', 'newcomer@pillar.science')
      .click('@submit')
      .waitForRoute('admin_users')

    const adminUsers = browser.page.adminUsers();

    adminUsers.navigate()
      .waitForRoute('admin_users')
    adminUsers.expect.section('@users').to.be.visible.before(2000)
    adminUsers.section.users.expect.element('@gary').text.contains('Gary the newcomer')
    adminUsers.section.users.expect.element('@gary').text.contains('newcomer@pillar.science')
    browser.end()
  }
}