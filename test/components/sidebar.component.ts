import BaseComponent from "./base.component";

class Sidebar extends BaseComponent{

    locators = {
        addTaskButton:{
            selector: "//div[@data-testid='app-sidebar-container']//button/span[text()='Add task']//ancestor::button",
            description: "Add task button"
        }
    }

    /**
     * Clicks on the add task button
     * @returns Promise<void>
     */
    async clickAddTaskButton(): Promise<void> {
        await this.wdioFactoryUtils.click(this.locators.addTaskButton);
    }
}

export default Sidebar;
