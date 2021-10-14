# JET Automation Task

### Prerequisite 
  - Download [Node.js LTS](https://nodejs.org/en/) and install based on your system.
  - To check installation: Open command prompt and run **node -v**. [NODE.js VERSION](https://ibb.co/tZy3X2b). Restart pc if needed. ***Only if** there is error then set environment variable *NODE_HOME*, Variable Value = *C:\Program Files\nodejs*)*.
  - Download [Visual Studio Code](https://code.visualstudio.com/Download) and install based on your system **Install with Default Configuration**
  - Latest Chrome or Firefox browser.

------------------------------------------------------------------------------------------------------------

### How to run test case. 
- Clone/Download repo into local machine and extract it.
- Open VS-code then File -> Open Folder... -> select location of extracted repo.
- Run command in VS-code terminal `npm install cypress --save-dev` it may take little longer.
- To run cypress for the first time, either run custom command using VS-Code termial `npm run openCypressRunner` (package.json) or `./node_modules/.bin/cypress open` to Open cypress test runner. 
- [Choose](https://ibb.co/HDHL3tF) browser from top right corder. Recommended *ELECTRON*.
- Click on desired test case to run.
- To run test case using command line use `npm run E2E_Place_Order_Single` or `npm run E2E_Place_Order_Standard` command.
- Configuration of [cypress.json](https://docs.cypress.io/guides/references/configuration#cypress-json)

------------------------------------------------------------------------------------------------------------

### Things to consider while executing test case. (Errors)
- While execution at night (closing hr of restaurants) I encountered with *Restaurant is close error*. Please make sure restaurant is opne when you execute test case.
- Sometimes DDOS protection triggred while execution. [DDoS Error](https://ibb.co/njtpSGh). (This can be eaisly solved using whitelisting ip address in real time)
- If test case is executed using termial (command line execution) it maybe unstable. For example: After clicking on location entered by user it take longer to get response/set location. (wait of 4000ms added into script)
- Hide XHR requests from the command log: This is OPEN issue [7362](https://github.com/cypress-io/cypress/issues/7362). (XHR hide request do not work with latest verions on cypress for now)
- cy.getCookies(): Length of response keep on changing, please change length. At time of execution it was `24`

------------------------------------------------------------------------------------------------------------

### Test execution result and report. 
- Test execution video [E2E Execution](https://streamable.com/oj26tc)
- Report: mochawesome-report/mochawesome.html

------------------------------------------------------------------------------------------------------------
### Note
- Depending on on flow we can follow test [standards](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)
- E2E_Place_Order_Single: Executing one entire flow in one single test for simplicity. (In single `it` block) 
- E2E_Place_Order_Standard: As per standards divide test into three parts(Three `it` blocks). *(partial flow) Until PAYPAL payment cancellation as it require more api data and session id logic*