const { Builder } = require('selenium-webdriver');

async function createDriver(browser = 'chrome') {
  return await new Builder().forBrowser(browser).build();
}

module.exports = createDriver;