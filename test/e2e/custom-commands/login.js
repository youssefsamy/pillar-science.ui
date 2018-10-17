exports.command = function ({username, password}) {
  const login = this.page.login();

  login.navigate()
    .waitForElementVisible('#app', 2000)
    .assert.elementPresent('@email')
    .setValue('@email', username)
    .assert.elementPresent('input[name="password"]')
    .setValue('@password', password)
    .assert.elementPresent('@login')
    .click('@login')
  this.waitForElementPresent('input[test-route-name="home"]', 2000)
    .assert.urlEquals(this.globals.devServerURL + '/home')

  return this;
};