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
}

export default new LoginPage();
