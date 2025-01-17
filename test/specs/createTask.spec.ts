import loginPage from "../page/login.page";
import todayPage from "../page/today.page";
import { faker } from '@faker-js/faker';


describe('Login scenarios', () => {


    it.only('Create a single task', async () => {
        const taskName = faker.lorem.sentence.toString();
        const taskDescription = faker.lorem.sentence.toString();

        console.log('taskName: ', taskName);
        console.log('taskDescription: ', taskDescription);

        await loginPage.openPage();
        await loginPage.loginToPage('cortesharveyw@gmail.com','Cortes10');
        await todayPage.sidebar.clickAddTaskButton();
        await todayPage.addTaskPopUp.fillTaskName(taskName);
        await todayPage.addTaskPopUp.fillTaskDescription(taskDescription);
        await todayPage.addTaskPopUp.clickAddTaskButton();
        await expect(await todayPage.getTaskNameByName(taskName)).toEqual(taskName);
        await expect(await todayPage.getTaskDescriptionByName(taskName)).toEqual(taskDescription);
    });

});
