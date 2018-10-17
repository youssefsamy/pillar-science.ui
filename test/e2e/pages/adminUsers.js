module.exports = {
  url: function () {
    return this.api.globals.devServerURL + '/admin/users'
  },
  sections: {
    users: {
      selector: '#adminUsersTable',
      elements: {
        james: 'tbody tr:nth-child(1)',
        david: 'tbody tr:nth-child(2)',
        scott: 'tbody tr:nth-child(3)',
        gary: 'tbody tr:nth-child(5)'
      }
    }
  }
}