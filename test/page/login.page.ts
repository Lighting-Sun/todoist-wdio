import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {


    locators = {
        loginButton:{
            selector: "button[type='submit']",
            description: "Login button"
        },
        emailInput:{
            selector: "input[type='email']",
            description: "Email input"
        },
        passwordInput:{
            selector: "input[type='password']",
            description: "Password input"
        },
        loginErrorMessage:{
            selector: "//input[@type='email']/../../../preceding-sibling::div",
            description: "Login error message"
        },
        passwordErrorMessage:{
            selector: "//input[@type='password']/../../following-sibling::div",
            description: "Password error message"
        }
    }

    /**
     * Open login page
     * @returns Promise<void>
     */
    async openPage (): Promise<void> {
        await this.open(browser.options.baseUrl! + '/auth/login');
    }

    /**
     * Fill email input
     * @param email email to fill
     * @returns Promise<void>
     */
    async fillEmail (email: string): Promise<void> {
        await this.wDioFactoryUtils.setValue(this.locators.emailInput, email);
    }

    /**
     * Fill password input
     * @param password password to fill
     * @returns Promise<void>
     */
    async fillPassword (password: string): Promise<void> {
        await this.wDioFactoryUtils.setValue(this.locators.passwordInput, password);
    }

    /**
     * Click login button
     * @returns Promise<void>
     */
    async clickLoginButton (): Promise<void>  {
        await this.wDioFactoryUtils.click(this.locators.loginButton);
    }

    /**
     * Login to page
     * @param email email to fill
     * @param password password to fill
     * @returns Promise<void>
     */
    async loginToPage(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async getLoginErrorMessageText(): Promise<string> {
        return await this.wDioFactoryUtils.getText(this.locators.loginErrorMessage);
    }

    async getPasswordErrorMessageText(): Promise<string> {
        return await this.wDioFactoryUtils.getText(this.locators.passwordErrorMessage);
    }
}

export default new LoginPage();
