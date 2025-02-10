import loginPage from "../page/login.page";
import todayPage from "../page/today.page";
import UtilsMethods from '../../utils/utilsMethods.utils';
import casual from "casual";

const userEmail = process.env.USEREMAIL!;
const userPassword = process.env.USERPASSWORD!;

describe('Task creation scenarios', () => {
    let createdTaskNames: Array<string> = []

    it('Create a single task @smoke', async () => {
        const taskName = casual.title;
        const taskDescription = casual.short_description;

        console.log('taskName: ', taskName);
        console.log('taskDescription: ', taskDescription);

        await loginPage.openPage();
        await loginPage.loginToPage(userEmail, userPassword);
        await todayPage.sidebar.clickAddTaskButton();
        await todayPage.addTaskPopUp.fillTaskName(taskName);
        await todayPage.addTaskPopUp.fillTaskDescription(taskDescription);
        await todayPage.addTaskPopUp.clickAddTaskButton();
        await expect(await todayPage.getTaskNameByName(taskName)).toEqual(taskName);
        await expect(await todayPage.getTaskDescriptionByName(taskName)).toEqual(taskDescription);
        createdTaskNames.push(taskName)
    });

    it('Create a 10 tasks', async () => {
        const taskNames = await UtilsMethods.getArrayOfRandomStrings(10);
        const taskDescriptions = await UtilsMethods.getArrayOfRandomStrings(10);

        await loginPage.openPage();
        await loginPage.loginToPage(userEmail, userPassword);
        await todayPage.createMultipleTasksByTaskNameAndDescription(taskNames, taskDescriptions);
        await expect(await todayPage.getTaskNames()).toEqual(taskNames);
        await expect(await todayPage.getTaskDescriptions()).toEqual(taskDescriptions);
        createdTaskNames = taskNames;
    });

    afterEach(async () => {
        await todayPage.deleteAllTasksByTasksName(createdTaskNames);
        createdTaskNames = [];
    });

});
