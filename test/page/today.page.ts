import Page from "./page";
import AddTask from "../components/addTask.component";
import TaskMoreMenu from "../components/taskMoreMenu.component";
import DeleteTaskDialog from "../components/deleteTaskDialog.component";
import Sidemenu from "../components/sidemenu.component";
import UserOptions from "../components/userOptions.component";

class TodayPage extends Page{

    addTask = new AddTask();
    taskMoreMenu = new TaskMoreMenu();
    deleteTaskDialog = new DeleteTaskDialog();
    sidemenu = new Sidemenu();
    userOptions = new UserOptions();

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
            selector: "//div[@class='task_content'][text()='${value}']/ancestor::li[@class='task_list_item']//button[@data-testid='more_menu']",
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
        await this.wDioFactoryUtils.hover(this.locators.allTaksContainer);
    }

    /**
     * Hover over  a task container by name
     * @param taskName string
     * @returns Promise<void>
     */
    async hoverOverTaskContainerByName(taskName : string): Promise<void> {
        await this.wDioFactoryUtils.scrollTo(await this.wDioFactoryUtils.getSelectorByValue( this.locators.taskContainerByName, taskName));
        await this.wDioFactoryUtils.hover(await this.wDioFactoryUtils.getSelectorByValue( this.locators.taskContainerByName, taskName));
    }

    /**
     * Hover over  a task container by name
     * @param taskName string
     * @returns Promise<void>
     */
    async hoverOverTaskMoreMenuByName(taskName : string): Promise<void> {
        await this.wDioFactoryUtils.scrollTo(await this.wDioFactoryUtils.getSelectorByValue(this.locators.moreMenuTaskByTaskName, taskName));
        await this.wDioFactoryUtils.hover(await this.wDioFactoryUtils.getSelectorByValue( this.locators.moreMenuTaskByTaskName, taskName));
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
        await this.wDioFactoryUtils.click(await this.wDioFactoryUtils.getSelectorByValue( this.locators.moreMenuTaskByTaskName, taskName));
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
            await this.taskMoreMenu.clickDeleteTaskButtonMoreMenu();
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
            await this.hoverOverTaskMoreMenuByName(taskName);
            await this.clickOnTaskMoreMenuButtonByName(taskName);
            await this.taskMoreMenu.clickDeleteTaskButtonMoreMenu();
            await this.deleteTaskDialog.clickDeleteTaskButton();
        }
    }

}

export default new TodayPage();
