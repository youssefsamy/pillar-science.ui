exports.command = function (route, timeout = 5000) {
  this.waitForElementPresent(`input[test-route-name="${route}"]`, timeout)

  return this;
};