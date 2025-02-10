import Page from "./page";
import Sidebar from "../components/sidebar.component";
import AddTaskPopUp from "../components/addTaskPopUp.component";
import TaskMoreMenu from "../components/taskMoreMenu.component";
import DeleteTaskDialog from "../components/deleteTaskDialog.component";
import UtilsMethods from "../../utils/utilsMethods.utils";

class TodayPage extends Page{

    sidebar = new Sidebar();
    addTaskPopUp = new AddTaskPopUp();
    taskMoreMenu = new TaskMoreMenu();
    deleteTaskDialog = new DeleteTaskDialog();

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
        todayTaksContainer:{
            selector: "//section[contains(@aria-label,'Today')]//div[@class='task_list_item__content']",
            description: "Today tasks container"
        },
        todayMoreMenuTask: {
            selector: "//section[contains(@aria-label,'Today')]//button[@data-testid='more_menu']",
            description: "More options button for all taks in today section"
        },
        allTasksNames:{
            selector: "//div[@class='task_list_item__content']//div[@class='task_content']",
            description: "Tasks names"
        },
        allTasksDescriptions:{
            selector: "//div[@class='task_list_item__content']//div[@class='task_description']",
            description: "Tasks descriptions"
        },
        allTaksContainer:{
            selector: "//div[@class='task_list_item__content']",
            description: "All tasks container"
        },
        allMoreMenuTask: {
            selector: "//button[@data-testid='more_menu']",
            description: "More options button for all taks in today section"
        },
        taskContainerByName: {
            selector: "//div[@class='task_content'][text()='${value}']/ancestor::div[@class='task_list_item__content']",
            description: "Selects the task container by name"
        },
        moreMenuTaskByTaskName: {
            selector: "//div[@class='task_content'][text()='ewre']/ancestor::li[@class='task_list_item']//button[@data-testid='more_menu']",
            description: "More options button for a specific task by name"
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
        await this.wDioFactoryUtils.waitForStable(this.addTaskPopUp.locators.quickAddDialog);
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
        const taskNames: string[] = new Array(numberOfTasks);
        const taskDescriptions: string[] = new Array(numberOfTasks);

        for (let index = 0; index < numberOfTasks; index++) {
            taskNames[index] = await UtilsMethods.getRandomString();
            taskDescriptions[index] = await UtilsMethods.getRandomString();
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

    /**
     * Gets the task names
     * @returns Promise<string[]>
     */
    async getTaskNames(): Promise<string[]> {
        return await this.wDioFactoryUtils.getTextFromElements(this.locators.allTasksNames);
    }

    /**
     * Gets the task descriptions
     * @returns Promise<string[]>
     */
    async getTaskDescriptions(): Promise<string[]> {
        return await this.wDioFactoryUtils.getTextFromElements(this.locators.allTasksDescriptions);
    }

    /**
     * Hover over the first task more menu
     * @returns Promise<void>
     */
    async hoverOverFirstTaskMoreMenu(): Promise<void> {
        await this.wDioFactoryUtils.hover(this.locators.allTaksContainer)
    }

    /**
     * Hover over  a task container by name
     * @param taskName string
     * @returns Promise<void>
     */
    async hoverOverTaskContainerByName(taskName : string): Promise<void> {
        await this.wDioFactoryUtils.hover(await this.wDioFactoryUtils.getSelectorByValue( this.locators.taskContainerByName, taskName))
    }

    /**
     * Clicks on the first task more menu button
     * @returns Promise<void>
     */
    async clickOnFirstTaskMoreMenuButton(): Promise<void> {
        await this.wDioFactoryUtils.click(this.locators.allMoreMenuTask);
    }

    /**
     * Clicks on more menu button from a given task
     * @param taskName string
     * @returns Promise<void>
     */
    async clickOnTaskMoreMenuButtonByName(taskName : string): Promise<void> {
        await this.wDioFactoryUtils.click(await this.wDioFactoryUtils.getSelectorByValue( this.locators.moreMenuTaskByTaskName, taskName))
    }

    /**
     * Deletes all tasks
     * @returns Promise<void>
     */
    async deleteAllTasks(): Promise<void> {

        let isHoverable = await this.wDioFactoryUtils.isHoverable(this.locators.allTaksContainer);

        while(isHoverable){
            await this.hoverOverFirstTaskMoreMenu();
            await this.clickOnFirstTaskMoreMenuButton();
            await this.taskMoreMenu.clickDeleteTaskButton();
            await this.deleteTaskDialog.clickDeleteTaskButton();
            isHoverable = await this.wDioFactoryUtils.isHoverable(this.locators.allTaksContainer);
        }
    }

    /**
     * Deletes all tasks given an array of tasks names
     * @param taskNames Array<String>
     * @returns Promise<void>
    */
    async deleteAllTasksByTasksName(taskNames : Array<string>): Promise<void> {
        for (const taskName of taskNames) {
            await this.hoverOverTaskContainerByName(taskName);
            await this.clickOnTaskMoreMenuButtonByName(taskName);
            await this.taskMoreMenu.clickDeleteTaskButton();
            await this.deleteTaskDialog.clickDeleteTaskButton();
        }
    }

}

export default new TodayPage();
