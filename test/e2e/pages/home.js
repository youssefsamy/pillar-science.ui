const appNavbar = require('../shared-elements/appNavbar')

module.exports = {
  url: function () {
    return this.api.globals.devServerURL + '/home'
  },
  elements: [
    appNavbar,
    {
      // page elements
    }
  ]
}