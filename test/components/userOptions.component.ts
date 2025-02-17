import BaseComponent from "./base.component";

class UserOptions extends BaseComponent{

    locators = {
        logOutButton:{
            selector: "//span[text()='Log out']/..",
            description: "user options button"
        },
    }

    /**
     * Clicks on the settings button
     * @returns Promise<void>
     */
    async clickLogOutButtonButton(): Promise<void> {
        await this.wdioFactoryUtils.click(this.locators.logOutButton);
    }
}

export default UserOptions;
