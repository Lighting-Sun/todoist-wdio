import BaseComponent from "./base.component";

class Sidemenu extends BaseComponent{

    locators = {
        settingsButton:{
            selector: "[aria-label='Settings']",
            description: "user options button"
        },
    }

    /**
     * Clicks on the settings button
     * @returns Promise<void>
     */
    async clickSettingsButton(): Promise<void> {
        await this.wdioFactoryUtils.scrollTo(this.locators.settingsButton);
    }
}

export default Sidemenu;
