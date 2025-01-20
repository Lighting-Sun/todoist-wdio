import Page from "./page";
import Sidebar from "../components/sidebar.component";
import AddTaskPopUp from "../components/addTaskPopUp.component";
import { faker } from '@faker-js/faker';

class TodayPage extends Page{

    sidebar = new Sidebar();
    addTaskPopUp = new AddTaskPopUp();

    locators = {
        todayPage:{
            selector: "//h1[text()='Today']",
            description: "Today page"
        },
        taskByName:{
            selector: "//div[@class='task_content'][text()='${value}']",
            description: "Task name input"
        },
        taskByDescriptionByName:{
            selector: "//div[@class='task_content'][text()='${value}']/ancestor::div[@class='task_list_item__content']//div[@class='task_description']",
            description: "Task description input"
        },
        todayTasksNames:{
            selector: "//section[contains(@aria-label,'Today')]//div[@class='task_list_item__content']//div[@class='task_content']",
            description: "Tasks names"
        },
        todayTasksDescriptions:{
            selector: "//section[contains(@aria-label,'Today')]//div[@class='task_list_item__content']//div[@class='task_description']",
            description: "Tasks descriptions"
        },

    }

    /**
     * Gets today page title text
     * @returns Promise<void>
    */
    async getTodayPageTitleText(): Promise<string> {
        return await this.wDioFactoryUtils.getText(this.locators.todayPage);
    }

    /**
     * Gets the task name by a name that is passed as parameter
     * @param taskName the name of the task
     * @returns Promise<string>
     */
    async getTaskNameByName(taskName: string): Promise<string> {
        return await this.wDioFactoryUtils.getText(await this.wDioFactoryUtils.getSelectorByValue(this.locators.taskByName, taskName));
    }

    /**
     * Gets the task description by a name that is passed as parameter
     * @param taskName the name of the task
     * @returns Promise<string>
     */
    async getTaskDescriptionByName(taskName: string): Promise<string> {
        return await this.wDioFactoryUtils.getText(await this.wDioFactoryUtils.getSelectorByValue(this.locators.taskByDescriptionByName, taskName));
    }

    /**
     * creates a task using the taskName and taskDescription passed as parameters
     * @param taskName
     * @param taskDescription
     */
    async createTask(taskName: string, taskDescription: string): Promise<void> {
        await this.sidebar.clickAddTaskButton();
        await this.addTaskPopUp.fillTaskName(taskName);
        await this.addTaskPopUp.fillTaskDescription(taskDescription);
        await this.addTaskPopUp.clickAddTaskButton();
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
        let taskNames: string[] = new Array(numberOfTasks);
        let taskDescriptions: string[] = new Array(numberOfTasks);

        for (let index = 0; index < numberOfTasks; index++) {
            taskNames[index] = faker.lorem.sentence.toString();
            taskDescriptions[index] = faker.lorem.sentence.toString();
            await this.createTask(taskNames[index], taskDescriptions[index]);
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

        for (let index = 0; index < taskNames.length; index++) {
            await this.createTask(taskNames[index], taskDescriptions[index]);
        }
    }

}

export default new TodayPage();
