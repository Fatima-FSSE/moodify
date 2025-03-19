const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');

let driver;

Given('I open the weather app', async function () {
  driver = new Builder().forBrowser('chrome').build();
  await driver.get('http://localhost:3000/');
});

When('I enter {string} in the search box', async function (city) {
  const searchBox = await driver.findElement(By.id('react-select-3-input'));
  await searchBox.sendKeys(city);
  await driver.sleep(2000);
  await searchBox.sendKeys('\uE007'); // Press Enter to select 
});

Then('I should see the weather for {string}', async function (city) {
  const weatherResult = await driver.wait(
    until.elementLocated(By.className('city-name')),
    5000
  );
  const text = await weatherResult.getText();
  if (!text.includes(city)) {
    throw new Error(`Expected to see weather for ${city}, but got: ${text}`);
  }
  await driver.quit();
});