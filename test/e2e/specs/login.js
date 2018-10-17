module.exports = {
  'Invalid login': function (browser) {
    const login = browser.page.login();

    login.navigate()
      .waitForElementVisible('#app', 2000)
      .assert.elementPresent('@email')
      .setValue('@email', 'admin@pillar.science')
      .assert.elementPresent('input[name="password"]')
      .setValue('@password', 'invalid-password')
      .assert.elementPresent('@login')
      .click('@login');
    browser.waitForElementPresent('.notices > .toast.is-danger', 2000)
      .end();
  },
  'Login to the app': function (browser) {
    const login = browser.page.login();

    login.navigate()
      .waitForElementVisible('#app', 2000)
      .assert.elementPresent('@email')
      .setValue('@email', 'admin@pillar.science')
      .assert.elementPresent('input[name="password"]')
      .setValue('@password', 'secret')
      .assert.elementPresent('@login')
      .click('@login');
    browser.waitForRoute('home')
      .assert.urlEquals(browser.globals.devServerURL + '/home')
      .end();
  }
}
