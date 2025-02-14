import BaseComponent from "./base.component";
import UtilsMethods from "../../utils/utilsMethods.utils";

class AddTask extends BaseComponent{

    locators = {
        addTaskButton:{
            selector: ".plus_add_button",
            description: "Add task button"
        },
        taskNameInput: {
            selector: ".task_editor__content_field p",
            description: "Task name input"
        },
        taskDescriptionInput:{
            selector: ".task_editor__description_container p",
            description: "Task description input"
        },
        addTaskConfirmButton:{
            selector: "button[data-testid='task-editor-submit-button']",
            description: "Add task button"
        },
        taskEditorForm:{
            selector: "form.task_editor",
            description: "task editor form"
        }
    }


    /**
     * Clicks on the add task button
     * @returns Promise<void>
     */
    async clickAddTaskButton(): Promise<void> {
        await this.wdioFactoryUtils.scrollTo(this.locators.addTaskButton);
        await this.wdioFactoryUtils.hover(this.locators.addTaskButton);
        await this.wdioFactoryUtils.waitForStable(this.locators.addTaskButton);
        await this.wdioFactoryUtils.click(this.locators.addTaskButton);
    }



    /**
     * Fills the task name input
     * @param taskName the name of the task
     * @returns Promise<void>
     */
    async fillTaskName (taskName: string): Promise<void> {
        await this.wdioFactoryUtils.setValueByKeys(this.locators.taskNameInput, taskName);
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
    async clickAddTaskConfirmButton (): Promise<void>  {
        await this.wdioFactoryUtils.scrollTo(this.locators.addTaskConfirmButton);
        await this.wdioFactoryUtils.hover(this.locators.addTaskConfirmButton);
        await this.wdioFactoryUtils.waitForStable(this.locators.addTaskConfirmButton);
        await this.wdioFactoryUtils.click(this.locators.addTaskConfirmButton);
    }

    /**
     * creates a task using the taskName and taskDescription passed as parameters
     * @param taskName
     * @param taskDescription
     */
    async createTask(taskName: string, taskDescription: string): Promise<void> {
        await this.clickAddTaskButton();
        await this.wdioFactoryUtils.waitForStable(this.locators.taskEditorForm);
        await this.fillTaskName(taskName);
        await this.fillTaskDescription(taskDescription);
        await this.clickAddTaskConfirmButton();
    }

    /**
     * creates a task using the taskName and taskDescription passed as parameters
     * @param taskName
     * @param taskDescription
     */
    async fillTaskForm(taskName: string, taskDescription: string): Promise<void> {
        await this.wdioFactoryUtils.waitForStable(this.locators.taskEditorForm);
        await this.fillTaskName(taskName);
        await this.fillTaskDescription(taskDescription);
        await this.clickAddTaskConfirmButton();
    }

    /**
     * Creates multiple tasks using the numberOfTasks passed as parameter
     * returns an object with the taskNames and taskDescriptions
     * @param numberOfTasks
     * @returns Promise<{taskNames: string[], taskDescriptions: string[]}>
     */
    async createMultipleTasksByNumber( numberOfTasks: number): Promise<{taskNames: string[], taskDescriptions: string[]}> {
        if  (numberOfTasks < 1) {
            throw new Error('numberOfTasks must be greater than 0');
        }
        const taskNames: string[] = new Array(numberOfTasks);
        const taskDescriptions: string[] = new Array(numberOfTasks);
        await this.clickAddTaskButton();
        for (let index = 0; index < numberOfTasks; index++) {
            taskNames[index] = await UtilsMethods.getRandomString();
            taskDescriptions[index] = await UtilsMethods.getRandomString();
            await this.fillTaskForm(taskNames[index], taskDescriptions[index]);
        }

        return await {taskNames, taskDescriptions};
    }

    /**
     * Creates multiple tasks using the taskNames and taskDescriptions passed as parameters
     * @param taskNames
     * @param taskDescriptions
     */
    async createMultipleTasksByTaskNameAndDescription( taskNames: string[], taskDescriptions: string[]): Promise<void> {
        if (taskNames.length < 1 || taskDescriptions.length < 1) {
            throw new Error('taskNames and descriptions must have at least one element');
        }

        if  (taskNames.length !== taskDescriptions.length) {
            throw new Error('taskNames and taskDescriptions must have the same length');
        }

        await this.clickAddTaskButton();
        for (let index = 0; index < taskNames.length; index++) {
            await this.fillTaskForm(taskNames[index], taskDescriptions[index]);
        }
    }
}

export default AddTask;
