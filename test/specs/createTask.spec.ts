import loginPage from "../page/login.page";
import todayPage from "../page/today.page";


describe('Login scenarios', () => {


    it('Create a single task', async () => {
        await loginPage.openPage();
        await loginPage.loginToPage('cortesharveyw@gmail.com','Cortes10');
        await todayPage.sidebar.clickAddTaskButton();
        await todayPage.addTaskPopUp.fillTaskName('Task 1');
        await todayPage.addTaskPopUp.fillTaskDescription('Task 1 description');
        await todayPage.addTaskPopUp.clickAddTaskButton();
        await expect(await todayPage.getTaskNameByName('Task 1')).toEqual('Task 1');
        await expect(await todayPage.getTaskDescriptionByName('Task 1')).toEqual('Task 1 description');
    });

});
