const webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until

const driver = new webdriver.Builder()
	.forBrowser('firefox')
	.build()

driver.get('http://www.bing.com');
driver.getTitle((title) => {
  console.log(title)
})
driver.quit();
