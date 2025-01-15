import loginPage from "../page/login.page";


describe('Login scenarios', () => {


    it('Should successsful login into todoist app', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail('cortesharveyw@gmail.com');
        await loginPage.fillPassword('Cortes10');
        await loginPage.clickLoginButton();
    });

    it('Should fail login into todoist app when email is missing', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail('');
        await loginPage.fillPassword('Cortes10');
        await loginPage.clickLoginButton();
        await expect(await loginPage.getLoginErrorMessageText()).toEqual('Please enter a valid email address.');
    });

    it('Should fail login into todoist app when password is missing', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail('cortesharveyw@gmail.com');
        await loginPage.fillPassword('');
        await loginPage.clickLoginButton();
        await expect(await loginPage.getPasswordErrorMessageText()).toEqual('Passwords must be at least 8 characters long.');
    });

    it('Should fail login into todoist app when wrong email is used', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail('cortesjarveyw@gmail.com');
        await loginPage.fillPassword('Cortes10');
        await loginPage.clickLoginButton();
        await expect(await loginPage.getLoginErrorMessageText()).toEqual('Wrong email or password.');
    });

    it('Should fail login into todoist app when wrong password is used', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail('cortesharveyw@gmail.com');
        await loginPage.fillPassword('Cortes11');
        await loginPage.clickLoginButton();
        await expect(await loginPage.getLoginErrorMessageText()).toEqual('Wrong email or password.');
    });
});
