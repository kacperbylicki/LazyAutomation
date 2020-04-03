const webdriver = require('selenium-webdriver');
require('dotenv').config({path: __dirname + '/.env'});

const buildBrowser = async () => {
    return new webdriver.Builder().withCapabilities(await webdriver.Capabilities.chrome()).build();
};

const loginUser = async (elementLogin, elementPassword, login, password, browser) => {
    await browser.findElement(webdriver.By.id(elementLogin)).sendKeys(login);
    await browser.findElement(webdriver.By.id(elementPassword)).sendKeys(password);

    const button = await browser.findElement(webdriver.By.id('submit'));

    await button.click();
};

const main = async () => {
    const browser = await buildBrowser();

    await browser.get(process.env.MYDEVIL_LINK);

    const elementLogin = "id_username";
    const elementPassword = "id_password";

    const login = process.env.MYDEVIL_LOGIN;
    const password = process.env.MYDEVIL_PASSWORD;

    await loginUser(elementLogin, elementPassword, login, password, browser);
};

main().catch(error => {
    console.log(error);
});

