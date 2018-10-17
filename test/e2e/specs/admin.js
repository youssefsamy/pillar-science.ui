const credentials = require('../credentials');

module.exports = {
  'Normal user denied admin home': function (browser) {
    const adminHome = browser.page.adminHome();

    adminHome
      .login(credentials.user)
      .navigate()
    browser.assert.urlEquals(browser.globals.devServerURL + '/admin')
      .end()
  },
  'Admin user is allowed admin home': function (browser) {
    const adminHome = browser.page.adminHome();

    adminHome
      .login(credentials.admin)
      .navigate()
    browser.assert.urlEquals(browser.globals.devServerURL + '/admin')
      .end()
  }
}