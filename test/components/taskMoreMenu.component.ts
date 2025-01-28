import BaseComponent from "./base.component";

class TaskMoreMenu extends BaseComponent{

    locators = {
        deleteTaskButton:{
            selector: "div[data-action-hint='task-overflow-menu-delete']",
            description: "Delete task button"
        }
    }

    /**
     * Clicks on the delete task button
     * @returns Promise<void>
     */
    async clickDeleteTaskButton(): Promise<void> {
        await this.wdioFactoryUtils.click(this.locators.deleteTaskButton);
    }

} export default TaskMoreMenu;
