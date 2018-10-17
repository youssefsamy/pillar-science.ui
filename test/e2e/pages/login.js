module.exports = {
  url: function () {
    return this.api.globals.devServerURL + '/login'
  },
  elements: {
    email: {
      selector: 'input[name="email"]'
    },
    password: {
      selector: 'input[name="password"]'
    },
    login: {
      selector: 'button.button'
    }
  }
}