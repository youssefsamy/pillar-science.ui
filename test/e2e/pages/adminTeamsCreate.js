module.exports = {
  url: function () {
    return this.api.globals.devServerURL + '/admin/teams/create'
  },
  elements: {
    name: 'input[name="name"]',
    submit: 'button#createTeam'
  }
}