const webdriver = require('selenium-webdriver');
require('dotenv').config({path: __dirname + '/.env'});

async function buildBrowser() {
    return new webdriver.Builder().withCapabilities(await webdriver.Capabilities.chrome()).build();
}

async function loginUser (elementLogin, elementPassword, login, password, browser) {
    await browser.findElement(webdriver.By.id(elementLogin)).sendKeys(login);
    await browser.findElement(webdriver.By.id(elementPassword)).sendKeys(password);

    const button = await browser.findElement(webdriver.By.id('submit'));

    await button.click();
}

async function main() {
    const browser = await buildBrowser();

    await browser.get('https://panel33.mydevil.net/login/?next=/');

    const elementLogin = "id_username";
    const elementPassword = "id_password";

    const login = process.env.MYDEVIL_LOGIN;
    const password = process.env.MYDEVIL_PASSWORD;

    await loginUser(elementLogin, elementPassword, login, password, browser);
}

main().then(() => {
    console.log('Bot completed task.');
}).catch(err => {
    console.log(err);
});

