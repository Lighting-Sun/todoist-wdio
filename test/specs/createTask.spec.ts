import loginPage from "../page/login.page";
import todayPage from "../page/today.page";
import UtilsMethods from '../../utils/utilsMethods.utils';
import casual from "casual";

const userEmail = process.env.USEREMAIL!;
const userPassword = process.env.USERPASSWORD!;

describe('Task creation scenarios', () => {

    it.only('Create 10 tasks', async () => {
        const taskNames = await UtilsMethods.getArrayOfRandomStrings(10);
        const taskDescriptions = await UtilsMethods.getArrayOfRandomStrings(10);
        const expectedTaskNames = await UtilsMethods.arrayToString(taskNames);
        const expectedTaskDescriptions = await UtilsMethods.arrayToString(taskDescriptions)
        await loginPage.openPage();
        await loginPage.loginToPage(userEmail, userPassword);
        await todayPage.addTask.createMultipleTasksByTaskNameAndDescription(taskNames, taskDescriptions);
        const atcualTaskNames =  await todayPage.getTaskNames();
        const actualTaskDescriptions = await todayPage.getTaskDescriptions();
        await expect(await UtilsMethods.arrayToString(atcualTaskNames)).toContain(expectedTaskNames);
        await expect(await UtilsMethods.arrayToString(actualTaskDescriptions)).toContain(expectedTaskDescriptions);
        await todayPage.deleteAllTasksByTasksName(taskNames);
    });

    it('Create a single task @smoke', async () => {
        const taskName = casual.title;
        const taskDescription = casual.short_description;

        console.log('taskName: ', taskName);
        console.log('taskDescription: ', taskDescription);

        await loginPage.openPage();
        await loginPage.loginToPage(userEmail, userPassword);
        await todayPage.addTask.clickAddTaskButton();
        await todayPage.addTask.fillTaskName(taskName);
        await todayPage.addTask.fillTaskDescription(taskDescription);
        await todayPage.addTask.clickAddTaskConfirmButton();
        await expect(await todayPage.getTaskNameByName(taskName)).toEqual(taskName);
        await expect(await todayPage.getTaskDescriptionByName(taskName)).toEqual(taskDescription);
        await todayPage.deleteAllTasksByTasksName([taskName]);
    });

});
