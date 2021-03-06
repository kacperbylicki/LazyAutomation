const webdriver = require('selenium-webdriver');
require('dotenv').config({path: __dirname + '/.env'});

const buildBrowser = async () => {
    return new webdriver.Builder().withCapabilities(await webdriver.Capabilities.chrome()).build();
};

const loginStudent = async (elementLogin, elementPassword, login, password, browser) => {
    await browser.findElement(webdriver.By.id(elementLogin)).sendKeys(login);
    await browser.findElement(webdriver.By.id(elementPassword)).sendKeys(password);

    const button = await browser.findElement(webdriver.By.name('submitButton'));

    await button.click();
};

const main = async () => {
    const browser = await buildBrowser();

    await browser.get(process.env.PP_LINK);

    const elementLogin = "login";
    const elementPassword = "password";

    const login = process.env.PP_LOGIN;
    const password = process.env.PP_PASSWORD;

    await loginStudent(elementLogin, elementPassword, login, password, browser);
};

main().catch(error => {
    console.log(error);
});
