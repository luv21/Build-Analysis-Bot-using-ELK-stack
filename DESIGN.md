## BOTWA

# Problem statement

Building a software on CI tools like Jenkins, TravisCI, etc before deploying is a crucial step in software engineering process which ensures the product is reliable and robust. Often as a part of this step, we write test cases to ensure the software is reliable and does not break when it goes into the production. Sometimes the build fails and this might happen due to a failed test case, broken component, API calls fail due to network error, etc. Although we have many integrations on Github which informs us if the build is successful or not, these integrations does not give us the reasons of failure nor the aggregated analysis of the errors and other metrics. To search for the reason of failure, we have to access the logs of CI tools and search through the log dump to identify the point of failure. 

While the logs provide these information about errors, firstly, these logs are very verbose and it is very difficult to identify errors in the log dump. Secondly, not everyone on the development team will have access to these logs. If we have a mechanism to collect these logs, parse them and extract the valuable information, we can use this data to perform aggregated analysis to identify common points of failure and most frequently occurring errors and present them in the form of a visual representation to the users.

Having this information accessible at a common place and ability to fetch them easily will help the developers to better identify the issues and fix them. This will in turn help in providing a better  software development experience to the developers.



# Bot Description

We are planning to design and implement a log analysis and error reporting bot which fetches and parses the Jenkins build logs and presents it to the users in the form of a report. The bot can be integrated into a slack channel where all developers can be informed with the above data and can participate in discussions to debug errors or improve the performance of the software.

Our implementation has a central repository where all the build information from Jenkins is stored and analysed using Elasticsearch and Logstash. Our bot fetches generates a report for each build failure and presents it onto the slack channel of developers. If the Devs want to look at a detailed report of things, they can access the bot dashboard.

Jenkins build failures can be categorized into categories like:
* Code Errors (i.e failed test cases): Semantical Errors, Network request errors, Programatical errors, Dependency errors
* Jenkins Errors: Missing softwares and packages eg: NPM not found, Missing artifacts, System errors  

Our report will provide analysis of above errors which are occuring the most over the course of multiple build failures. With respect to code errors, we can further classify them into Semantical Errors, Network request errors, Programatical errors, Dependency errors and analyze which test cases fail the most and what types of errors occur the most.

We use Logstash to parse and fiter the logs to fetch the errors and reasons from these logs (Eg: In index.js: Line 26: File not found). Using Elasticsearch, we index this data so that it would be easy for us to query the data to perform aggregate analysis. Our bot will be an application which would query the Elasticsearch to fetch these errors along with the reason of failures, perform analysis of errors, generate the report and post it onto the slack channel. We can also use this same application to provide a more detailed view of the report. Use of Logstash and Elasticsearch will help us store historical data and make the process parsing, filtering and querying easier.

This will help the developers to identify the commom points of failures types of failures and trends in failures. This will give developers a rolled up view of the project and fix the frequently failing components. This type of aggregated analysis is not available in through Jenkins logs where everything is a dump of text. Thus having all the analytics in one place, in a systematic format will also help our cause.   

# Use Cases
1. Use Case 1: Get report of a specific build
    1.  Precondition :  User must have Github APi token in Jenkins, install bot in slack . Also a web hook of Github to Jenkins to capture the commits.
  
    2. Main Flow:User will request the built status by providing the built number. Bot will provide the built status and the error information related to the build.
  
    3. Subflows:
        * User provides the built no with @built@****

        * Bot will provide the the status along with other parameters related to this particular build. If the build fails then bot will the provide the reason of failure and file associated with it.

  
    4. Alternate flow: Build passes successfully and there are no failures.

1. Use Case 2: Detailed report of overall error analysis
    1.  Precondition : User must install our bot in slack. 
  
    2. Main Flow: User will request the built analysis from the bot . Bot will provide the link to the dashboard with the visualizations displaying the requested built.
  
    3. Subflows:
        * User will request the built history visualization using the command show_vis

        * Bot will provide the link to the dashboard presenting visualizations of frequency distribution of errors, statistics on most failing test cases and common errors associated to frequnetly failing test cases. 

1. Use Case 3: Build status actions
    1.  Precondition : Install GitHub Jenkins plugin. Jenkins system must have Github API tokens. Github must contain the Jenkins environment URL in the Webhook section. 
  
    2. Main Flow: Users will commit the changes and push it to Github Repository [S1]. Post-Commit webhook will trigger the Build process for Jenkins [S2]. Bot finds out the cause of Build failure [S3]. Highlight the changes by comparing it with previous "Successful Builds" [S4].
  
    3. Subflows:
        * [S1] User will commit the changes by using the command "git push origin master" in the current repo folder.
        * [S2] User must have integrated the Jenkins with Github using Post-Commit Webhook. This will trigger a new build for Jenkins as soon as Github receives the push.
        * [S3] The logs of build jobs are parsed and checked if they are breaking due to the same reason (e.g., compilation failure, test execution failure, dependency resolution failure, file missing). 
        * [S4] Bot then identifies the files by generating an SHA and compares it with previous successful commits to show the difference in between the files.
    4. Alternate Flow:  Build is currently in "Successful" status.

# Design Sketches

## Wireframes
![WireFrame1](/Images/slack1.jpg)
![WireFrame2](/Images/Kibana1.jpg)

## Storyboard
![Storyboard](/Images/storyboard.jpg)


# Architecture Design

![Architecture](/Images/Archi.png)

## Components

### Jenkins
An open source automation tool such as jenkins for the automation of Build, test and Deployment of code present in github(or any SCM)

We are configuring  jenkins with  plugins for 
* GitHub authorization -  To provide access to enterprise GitHub by tokens 
* GitHub Plugin - To get access of the GitHub repo information

Build trigger information along with commit information is logged in the master in  …./<build#>/log

Last successful build - This information which is stored in jenkins is sent to the bot for analysis through File beat

### GitHub

The source code management for collaboration of work for a specific project. Github is configured with a webhook to jenkins,  so whenever a commit happens GitHub would trigger the build onto the jenkins

Alongside with trigger, it pushes the commit information upon the request from the jenkins plugin

Bot accesses the commit link of the last successful commit and the current failed commit to provide the code diff link to the user

### FileBeat

To export the log information from Jenkins to Logstash, we would use fileBeat. Filebeat monitors the Jenkins log files and automatically sends the new data to Logstash

### Logstash

Data is often scattered across many systems in many formats. Logstash helps in organizing the data and pushing into the elastic search so as to make it feasible for querying and data visualization

Logstash is being hosted on the providers end (Hosted by us) and the access point is the Bot

### Elastic Search

Elasticsearch is an open-source full-text search and analytics engine. We use it  to store, search, and analyze big volumes of build information quickly and in near real time.

We have the capability to store the log information of multiple users, coming from multiple jenkins servers


### Slack

Slack channels are been used by teams to communicate among each other. Multiple channels can be used to share both work related and casual information.

Using a specific  channel to interact with bot to get information. Slack acts as a source point to interact with the bot

## Constraints

1. The solution works only with Jenkins as the CI tool.

![Constraint 1](/Images/Constraints1.png)

2. Bot must have access to Github, Jenkins, and Slack.

![Constraint 2](/Images/Constraints2.png)

3. Delay in letting the users know the status of Build due to the latency induced by ELK Stack (Elasticsearch, Logstash).

## Additional patterns

1. Repository Design Pattern: In our architecture, all the build log info, error information from Jenkins and analysis data is stored in a centralized Elastic server. Our bot generates the report from this centralized database and shows the analysis to the user.

![pattern](/Images/pattern1.png)

2. Implicit Invocation Pattern: Whenever the build is complete on Jenkins, this event automatically sends the data into the ELK stack and triggers the bot to generate the report and post it on the slack channel. It does not require any user trigger for the above events to take place.
3. Explicit Invocation Pattern: If a user wants to fetch info of a previous build/historical data, then they have to explicitly make a request to the Bot to fetch that particular analysis.









