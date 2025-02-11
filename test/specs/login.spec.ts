import loginPage from "../page/login.page";
import todayPage from "../page/today.page";
import { readFileSync } from 'fs';

const userEmail = process.env.USEREMAIL!;
const userPassword = process.env.USERPASSWORD!;

describe('Login scenarios', () => {
    const data = JSON.parse(readFileSync('./test/data/testData.json', 'utf8'));

    it.only('Should successsful login into todoist app @smoke', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail(userEmail);
        await loginPage.fillPassword(userPassword);
        await loginPage.clickLoginButton();
        await expect(await todayPage.getTodayPageTitleText()).toEqual('Today');
    });

    it('Should fail login into todoist app when email is missing @smoke', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail(data.users.emptyUser.email);
        await loginPage.fillPassword(userPassword);
        await loginPage.clickLoginButton();
        await expect(await loginPage.getLoginErrorMessageText()).toEqual(data.loginErrors.invalidAddress);
    });

    it('Should fail login into todoist app when password is missing', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail(userEmail);
        await loginPage.fillPassword(data.users.emptyUser.password);
        await loginPage.clickLoginButton();
        await expect(await loginPage.getPasswordErrorMessageText()).toEqual(data.loginErrors.passwordLength);
    });

    it('Should fail login into todoist app when wrong email is used', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail(data.users.invalidUser.email);
        await loginPage.fillPassword(userPassword);
        await loginPage.clickLoginButton();
        await expect(await loginPage.getLoginErrorMessageText()).toEqual(data.loginErrors.wrongEmailOrPassword);
    });

    it('Should fail login into todoist app when wrong password is used', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail(userEmail);
        await loginPage.fillPassword(data.users.invalidUser.password);
        await loginPage.clickLoginButton();
        await expect(await loginPage.getLoginErrorMessageText()).toEqual(data.loginErrors.wrongEmailOrPassword);
    });
});
