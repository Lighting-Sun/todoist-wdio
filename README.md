# todoist-wdio
## Tutorial on how to run from github actions [you need at least read permissions in the repository for this]
Please kindly ask the owner for access in case you want to try this out!
### Custom run using the project using github actions local actions run

You can run this repository without downloading it 

1. In this repositoy click on **Actions**
2. Select the **CI on Demand** Option
3. Click on the **Run Workflow** Option  
4. you can customize your run by selecting **browser** and **suite**
5. Optionally you can also check the allure report option if you want to be able to download the allure report (see [Visual Studio Code](https://github.com/Lighting-Sun/todoist-wdio/blob/main/README.md#visual-studio-code-only-follow-this-if-you-want-to-open-the-resulting-allure-report) section bellow on how to visualize the report)
6. Click on run worflow (you might need to reload the page so the new execution is visible)

### Custom run using the project using github actions BrowserStack run

You can run this repository without downloading it 

1. In this repositoy click on **Actions**
2. Select the **test on demand BrowserStack** Option
3. Click on the **Run Workflow** Option  
4. you can customize your run by selecting **browser** and **suite**
5. Optionally you can also check the allure report option if you want to be able to download the allure report (see [Visual Studio Code](https://github.com/Lighting-Sun/todoist-wdio/blob/main/README.md#visual-studio-code-only-follow-this-if-you-want-to-open-the-resulting-allure-report) section bellow on how to visualize the report)
6. Click on run worflow (you might need to reload the page so the new execution is visible)

#### Checking execution details

1. Once the workflow is completed click on the workflow
2. Click on the job
3. Click on the step that was run, in this case Test is the one that contains the code that was executed
4. You can now check the details for this run

### Visual Studio Code (only follow this if you want to open the resulting allure report)

1. You need to have [Visual Studio Code](https://code.visualstudio.com/) installed
2. Once you have installed Visual Studio Code you need to install Live Server extension to make it easier for you to see the report

#### Downloading and Opening allure report

1. Once the workflow is finished, click on it
2. In the Artifacts setcion click on the download button
3. Extract the contents from the folder
4. Open the folder with VS Code
5. Click on Liver server, and that's it!


#### Installing Live Server

1. Go to Visual Studio Code application.
2. On left sidebar in Visual Studio Code, click Extensions or press Crtl+Shift+X.
3. In the search, type Live server, click on Live Server, then click on install.

## Tutorial on how to run the project using comand line in a local machine
### Prerequisites
#### JDK Java

1. Make sure you have installed [JDK Java](https://www.oracle.com/java/technologies/downloads/).

#### Node JS

1. it is recommended to install Homebrew to help you with the tool installation process.
2. Also, we require to download and install [node](https://nodejs.org/en/download/).
3. To see if Node is installed, type in node -v Terminal.
4. To see if NPM is installed, type in npm -v Terminal.

You need to create a env file the .zshrc file (in case there is no .zshrc file follow [this guide](https://superuser.com/questions/886132/where-is-the-zshrc-file-on-mac)):
  ```
open -e ~/.zshrc
  ```
#### Browsers

Installed:
* Chrome
* Firefox

#### Visual Studio Code
1. You must have [Visual Studio Code](https://code.visualstudio.com/) installed
2. Once you have installed Visual Studio Code you need to install a couple of plugins to help you set up the framework.
These plugins are Prettier and ESlint

##### Installing Prettier in VS code
1. Go to Visual Studio Code application.
2. On left sidebar in Visual Studio Code, click Extensions or press Crtl+Shift+X.
3. In the search, type Prettier and click Prettier - Code formatter, then click on install.

### Download and open project

1. Click on the code button in this repository
2. Select the Download Zip option
3. Extract the .zip file with the Extract here option
4. Place the project folder on the desired location

#### Open and run project

1. Right click on the folder and open it with Visual Studio Code
2. In Visual Studio Code, open new terminal clicking top bar, click Terminal, then click New Terminal
3. Type `npm install` and wait all packages will be downloaded

4. create a .env file inside the root project folder (Make sure to ask the owner for the values)

```
USEREMAIL=
USERPASSWORD=
SLACK_WEBHOOK_URL=
BROWSERSTACK_USERNAME = 
BROWSERSTACK_ACCESS_KEY =
```

* To Run All test cases type
  ```
  npx wdio wdio.conf.local.ts
  ```
* To run in a specific browser apppend the browser name **chrome** and **firefox** are the only valid options
  ```
  npx wdio wdio.conf.local.ts --browser firefox
  ```
* To run a specific suite append the suite name **regression** and **loginAndPurchase** are the valid options
  ```
  npx wdio wdio.conf.local.ts --suite regression
  ```

#### Open allure report

1. After the excecution, make sure to check that there's a reports folder containing both allure results and report
2. Type the following command to open the report
  ```
  npm run open-allure 
  ```
3. The report should open and you should be able to check it out!
