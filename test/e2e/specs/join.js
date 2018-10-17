module.exports = {
  '@tags': ['active'],
  'Invalid token shows 404': function (browser) {
    const  page = browser.page.joinInvitation();

    page.navigate('invalid-token')
    browser.waitForRoute('app_invitation')
      .expect.element('h1.title').text.to.equal('404 - Page not found').before(2000)
    browser.end()

  },
  'Valid token': function (browser) {
    const page = browser.page.joinInvitation();

    page.navigate('94a08da1fecbb6e8b46990538c7b50b2')
    browser.waitForRoute('app_invitation')
    page.expect.element('@subtitle').text.to.equal('Scott the invited')
  },
  'Password too short': function (browser) {
    const page = browser.page.joinInvitation();

    page.setValue('@password', 'short')
    page.click('@subtitle') // This will trigger blur on @password
    page.expect.element('@passwordMessage').text.to.contain('The password should be at least 8 characters').before(2000)
  },
  'Invalid confirm password': function (browser) {
    const page = browser.page.joinInvitation();

    page.setValue('@password', 'valid-password')
      .setValue('@passwordConfirm', 'invalid')
      .click('@submit')
    page.expect.element('@passwordConfirmMessage').text.to.equal('The confirmation password must match the password').before(2000)
  },
  'New user accepts invitation': function (browser) {
    const page = browser.page.joinInvitation();

    page.clearValue('@password')
      .setValue('@password', 'my-secure-password')
      .clearValue('@passwordConfirm')
      .setValue('@passwordConfirm', 'my-secure-password')
      .click('@submit')
    browser
      .pause(2000)
      .waitForRoute('home')
      .end()
  }
}