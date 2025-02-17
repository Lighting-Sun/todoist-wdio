import BaseComponent from "./base.component";

class DeleteTaskDialog extends BaseComponent{

    locators = {
        confirmDeleteTaskButton:{
            selector: "//div[@role='dialog']//span[text()='Delete']/parent::button",
            description: "Delete task button"
        },
        confirmDeleteTaskDialog: {
            selector: "[role='dialog']",
            description: "Delete task button"
        }
    }

    /**
     * Clicks on the confirm delete task button
     * @returns Promise<void>
     */
    async clickDeleteTaskButton(): Promise<void> {
        await this.wdioFactoryUtils.click(this.locators.confirmDeleteTaskButton);
    }

} export default DeleteTaskDialog;

