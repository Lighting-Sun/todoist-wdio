import BaseComponent from "./base.component";

class SideMenu extends BaseComponent{
    locators = {
        sideMenu:{
            selector: "//button/span[text()='Add task']",
            description: "Add task button"
        }
    }

    /**
     * Clicks on the add task button
     * @returns Promise<void>
     */
    async clickAddTaskButton(): Promise<void> {
        await this.wdioFactoryUtils.click(this.locators.sideMenu);
    }
}

export default new SideMenu();
