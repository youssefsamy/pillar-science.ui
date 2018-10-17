module.exports = {
  url: function () {
    return this.api.globals.devServerURL + '/admin/users/create'
  },
  elements: {
    name: 'input[name="name"]',
    email: 'input[name="email"]',
    superAdmin: 'input[type="checkbox"][value="super-admin"]',
    submit: 'button#createUser'
  }
}