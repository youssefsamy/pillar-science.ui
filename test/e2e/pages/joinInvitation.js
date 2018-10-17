module.exports = {
  commands: [
    {
      navigate: function (joinToken) {
        this.api
          .url(`${this.api.globals.devServerURL}/join/${joinToken}`)
      }
    }
  ],
  elements: {
    subtitle: 'h2.subtitle',
    password: 'input[name="password"]',
    passwordMessage: '#password > p.help.is-danger',
    passwordConfirm: 'input[name="passwordConfirm"]',
    passwordConfirmMessage: '#passwordConfirm > p.help.is-danger',
    submit: 'button#submit'
  }
}