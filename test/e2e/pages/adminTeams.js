module.exports = {
  url: function () {
    return this.api.globals.devServerURL + '/admin/teams'
  },
  sections: {
    teams: {
      selector: '#adminTeamsTable',
      elements: {
        pillar: 'tbody tr:nth-child(1)',
        nightwatch: 'tbody tr:nth-child(2)'
      }
    }
  }
}