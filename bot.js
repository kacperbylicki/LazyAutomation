const webdriver = require('selenium-webdriver');
require('dotenv').config({path: __dirname + '/.env'});

async function buildBrowser() {
    return new webdriver.Builder().withCapabilities(await webdriver.Capabilities.chrome()).build();
}

async function loginStudent (elementLogin, elementPassword, login, password, browser) {
    await browser.findElement(webdriver.By.id(elementLogin)).sendKeys(login);
    await browser.findElement(webdriver.By.id(elementPassword)).sendKeys(password);

    const button = await browser.findElement(webdriver.By.name('submitButton'));

    await button.click();
}

async function main() {
    const browser = await buildBrowser();

    await browser.get('https://elogin.put.poznan.pl/');

    const elementLogin = "login";
    const elementPassword = "password";

    const login = process.env.PP_LOGIN;
    const password = process.env.PP_PASSWORD;

    await loginStudent(elementLogin, elementPassword, login, password, browser);
}

main().then(() => {
    console.log('Bot completed task.');
}).catch(err => {
    console.log(err);
});
