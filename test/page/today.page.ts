import Page from "./page";
import Sidebar from "../components/sidebar.component";

class TodayPage extends Page{

    sidebar = new Sidebar();

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
        tasks:{
            selector: "//div[@class='task_list_item__content']",
            description: "Tasks"
        }
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

}

export default new TodayPage();
