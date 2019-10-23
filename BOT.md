### Bot Implementation

Our bot is integrated with Slack platform and we integrated with slack using 2 ways:
1. /Slash-Commands: Used to provide interaction between user and the bot. User can give various commands on slack to perform certain actions.
2. Incomming webhooks: This is used to post messages into the slack channel from external sources. Since our bot is hosted separetely, we need this to post messages when jenkins initiates the build complete trigger to the bot and the bot then generates the report and posts it onto slack.
3. We are simulating API calls to Elasticsearch using Nock and mock data.


### Use Case Refinement
1. Use Case 1: Get report of a specific build
    1.  Precondition :  User must have Github APi token in Jenkins, install bot in slack . Also a web hook of Github to Jenkins to capture the commits.
  
    2. Main Flow:User will request the built status by providing the built number. Bot will provide the built status and the error information related to the build.
  
    3. Subflows:
        * User enters slack command `/bot-assemble <build_name> status`

        * Bot will provide the report of this particular build with details like files in which it failed and reasons why it failed.
  
    4. Alternate flow: Build passes successfully and there are no failures it will give the link to thr PR.

1. Use Case 2: Analysis of overall aggregated build failures
    1.  Precondition : User must install our bot in slack. 
  
    2. Main Flow: User will request the built analysis from the bot from slack . Bot will provide the link to the dashboard with the visualizations displaying the error analysis.
  
    3. Subflows:
        * User will request the built history visualization using the command `/bot-assemble <build_name> analysis`

        * Bot will provide the link to the dashboard presenting visualizations of frequency distribution of errors, statistics on most failing test cases and common errors associated to frequnetly failing test cases. 

1. Use Case 3: Build status actions
    1.  Precondition : Install GitHub Jenkins plugin. Jenkins system must have Github API tokens. Github must contain the Jenkins environment URL in the Webhook section. 
  
    2. Main Flow: Users will commit the changes and push it to Github Repository [S1]. Post-Commit webhook will trigger the Build process for Jenkins [S2]. Bot fetches the data of the recently completed build from elastic to perform analysis. Once the bot has a compliation of analysis for the current build, it will post onto the slack channel.
  
    3. Subflows:
        * [S1] User will commit the changes by using the command "git push origin master" in the current repo folder.
        * [S2] User must have integrated the Jenkins with Github using Post-Commit Webhook. This will trigger a new build for Jenkins as soon as Github receives the push.
        * [S3] Jenkins sends a trigger to bot stating that the build is complete.
        * [S4] Bot fetches data related to that build from elasticsearch
        * [S5] Bot posts the report onto the slack channel
    4. Alternate Flow:  Build is currently in "Successful" status.


### Testing

#### Browser Automation testing (Puppeteer):
For use cases 1 and 2, we can perform browser automation testing using Puppeteer to simulate user actions and check if we get the desired outputs. For use case 2, since the trigger is initiated by the jenkins, we cannot use browser automation to simulate the action. For this usecase, we instead use Nock and network requests to simulate the trigger and perform necessary actions once this request reaches the server.

#### Unit testing (Mocha + Chai):
We use mocha and chai to write unit tests for the modules to verify the functinalities of the modules and check if we are getting the desired outputs for the each usecase. For each usecase we have demonstrated main flow and alternate flow.



### Mocking Service Component (Nock and Mock JSON data):
For mocking, we have used mock data in the form of a JSON and Nock to intercept the api calls to elasticsearch. Once we intercept these requests, we access the mock data and return the required data based on the request and action. For simulating Trigger by Jenkins, we mock the trigger by sending a POST request manually to the server with requured data as part of the body of the request.


### Screencast
[Screencast link](https://drive.google.com/file/d/1A0yCeUv7KosN96VK_-xX3JH7_bvHIyXX/view?usp=sharing)

