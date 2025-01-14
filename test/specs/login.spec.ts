import loginPage from "../page/login.page";


describe('Login scenarios', () => {


    it('Should successsful login into todoist app', async () => {
        await loginPage.openPage();
        await loginPage.fillEmail('cortesharveyw@gmail.com');
        await loginPage.fillPassword('Cortes10');
        await loginPage.clickLoginButton();
    });

});
