import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {


    locators = {
        loginButton:{
            selector: "button[data-gtm-id]",
            description: "Login button"
        },
        emailInput:{
            selector: "input[type='email']",
            description: "Email input"
        },
        passwordInput:{
            selector: "input[type='password']",
            description: "Password input"
        }

    }

    /**
     * Open login page
     * @returns Promise<void>
     */
    async openPage (): Promise<void> {
        await this.open(browser.options.baseUrl!);
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
    }
}

export default new LoginPage();
