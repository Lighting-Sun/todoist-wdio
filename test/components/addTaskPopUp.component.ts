import BaseComponent from "./base.component";

class AddTaskPopUp extends BaseComponent{

    locators = {
        taskNameInput:{
            selector: "div.task_editor__content_field p",
            description: "Task name input"
        },
        taskDescriptionInput:{
            selector: "div.task_editor__description_field p",
            description: "Task description input"
        },
        addTaskButton:{
            selector: "button[data-testid='task-editor-submit-button']",
            description: "Add task button"
        }
    }

    /**
     * Fills the task name input
     * @param taskName the name of the task
     * @returns Promise<void>
     */
    async fillTaskName (taskName: string): Promise<void> {
        await this.wdioFactoryUtils.setValue(this.locators.taskNameInput, taskName);
    }

    /**
     * Fills the task description input
     * @param taskDescription the description of the task
     * @returns Promise<void>
     */
    async fillTaskDescription (taskDescription: string): Promise<void> {
        await this.wdioFactoryUtils.setValueByKeys(this.locators.taskDescriptionInput, taskDescription);
    }

    /**
     * Clicks on the add task button
     * @returns Promise<void>
     */
    async clickAddTaskButton (): Promise<void>  {
        await this.wdioFactoryUtils.click(this.locators.addTaskButton);
    }

} export default AddTaskPopUp;


