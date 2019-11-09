# Process

For this milestone we implemented the basic flow described by the use case of our project. For implementing the basic flow our team used well known Software Practices. As our general Software Process, we have used "scrumban" methodology which is a combination of Kanban and Scrum practices. The Kanban board provided good visualization of the overall project and stories created for different milestones. The Scrum planning meetings allowed our team to organize its work around informed priorities. As a part of Core Practice, we are using Code Review and as Corollary practice we are using Pair Programming. While following these practices we kept the meeting notes and the documentation of these practices.


## Core Practice

After learning about the important Core practices in the course, our team decided to choose Pair Programming as the core practice to be used for our project. Pair programming is an agile software development technique in which two programmers work together at one workstation. One person writes the code and the other reviews each line of code. It is an effective way to share knowledge and write a code with less bugs. In our case we divided teams into two pairs. 

Each pair worked on an issue. One person in the pair implemented the task while the other reviewed his code and performed brainstorming on the critical steps of the implementation. Most of the issues of our project have two assignees. 

In one of the project named “ Parsing Log Files in Log Stash” one of the team member wrote the Logstash filters while his partner checked the syntax of the regex and provided him input and brainstorming when required.


## Corollary Practice

 We used Code Review as the Corollary practice for our project. Code review is one of the most used core practice in the industry which helps to improve the code quality and consistency by sharing of knowledge within the team. 
 
 Each member of the team worked on different issues and the subtasks of that issue. After completing the implementation the team member  requests a code review from his peers in the team. 




# Stories

|           |              |              |                                                     |                                                                                               |                 |                                 |          |              | 
|-----------|--------------|--------------|-----------------------------------------------------|-----------------------------------------------------------------------------------------------|-----------------|---------------------------------|----------|--------------| 
| **Iteration** | **Project Task** | **Issue Number** | **Issue Name**                                          | **Task**                                                                                          | **Created/Updated** | **Assignees**                       | **Estimate** | **Completed**    | 
| 0         | Deployment   | 4            | Setup Elasticsearch and Logstash and Kibana         | Setup Elasticsearch and Logstash on local machine                                             | 20th Oct'19     | vpmaddur,lkhuran                | 3        | 3rd Nov '19  | 
|           |              |              |                                                     | Load data from Jenkins using Filebeat into Logstash                                           |                 |                                 |          |              | 
| 0         | Integration  | 5            | Jenkins setup                                       | Setup Jenkins                                                                                 | 20th Oct'19     | vpmaddur,sjbondu                | 3        | 5th Nov '19  | 
|           |              |              |                                                     | Establish webhooks between Git repo and Jenkins                                               |                 |                                 |          |              | 
|           |              |              |                                                     | Install required dependencies like Filebeat, etc on Jenkins                                   |                 |                                 |          |              | 
| 0         | Mock Data    | 6            | Mock data for use cases                             | Sample Elastic-type data in JSON format to simulate interaction between bot and elastic       | 20th Oct'19     | vpmaddur,karya2,sjbondu,lkhuran | 2        | 22nd Oct '19 | 
|           |              |              |                                                     | Mock triggwe to simulate Jenkins job complete event                                           |                 |                                 |          |              | 
|           |              |              |                                                     | Mock data to to simulate what data is sent from Jenkins to bot                                |                 |                                 |          |              | 
|           |              |              |                                                     | Mock dashboard to simulate usecase 2                                                          |                 |                                 |          |              | 
| 0         | Testing      | 7            | Puppeteer Testing                                   | Setup of Puppeteer, Mocha and Chai                                                            | 20th Oct'19     | karya2,sjbondu,lkhuran          | 3        | 22nd Oct '19 | 
|           |              |              |                                                     | Tests for Use case 1                                                                          |                 |                                 |          |              | 
|           |              |              |                                                     | Tests for Use case 2                                                                          |                 |                                 |          |              | 
|           |              |              |                                                     | Tests for Use case 3                                                                          |                 |                                 |          |              | 
| 0         | Use Case     | 8            | Refine Use cases                                    | Refined Use Cases                                                                             | 22nd Oct '19    | vpmaddur,karya2,sjbondu,lkhuran | 1        | 22nd Oct '19 | 
| 1         | Deployment   | 18           | Architecture of Backend                             | Setup backend to enable API calls to elastic                                                  | 29th Oct '19    | karya2                          | 3        | 7th Nov '19  | 
|           |              |              |                                                     | Setup pipeline flow for analytics                                                             |                 |                                 |          |              | 
| 1         | Use Case 2   | 19           | Analytics                                           | Perform aggregated analytics For jenkins trigger                                              | 29th Oct '19    | karya2,sjbondu                  | 8        |              | 
|           |              |              |                                                     | Perform aggregated analytics for user trigger                                                 |                 |                                 |          |              | 
|           |              |              |                                                     | Generate charts and convert to images                                                         |                 |                                 |          |              | 
| 1         | Integration  | 20           | Jenkins Intergrationwith Logstash                   | Configure Filebeat.yml file                                                                   | 29th Oct '19    | vpmaddur,sjbondu                | 1        | 5th Nov '19  | 
|           |              |              |                                                     | Configure Input section in logstash.conf                                                      |                 |                                 |          |              | 
| 1         | Parsing      | 21           | Parsing Log files in Logstash                       | Configure input, output, and filters in Logstash                                              | 29th Oct '19    | vpmaddur,lkhuran                | 5        | 8th Nov '19  | 
|           |              |              |                                                     | Regex to parse build logs in Logstash                                                         |                 |                                 |          |              | 
| 2         | Schema       | 26           | Modifying Elastic Mock Data with Proper Schema      | Modifying elastic_mock.json acoording to the required schema                                  | 5th Nov '19     | vpmaddur,lkhuran                | 1        | 8th Nov '19  | 
| 2         | Parsing      | 24           | Indexing in Elastic Search and Integrating with Bot | Create Index for each build in Elastic search                                                 | 4th Nov '19     | vpmaddur,lkhuran                |          |              | 
|           |              |              |                                                     | Exploring API's in Elastic Search to fetch the build results                                  |                 |                                 |          |              | 
|           |              |              |                                                     | Construct an API to send build analysis results to the bot                                    |                 |                                 |          |              | 
| 2         | Use Case 1   | 27           | Post-build plugin script for Jenkins                | The build information has to be provided by jenkins to the bot via the PostBuildScript plugin | 5th Nov '19     | sjbondu                         | 3        |              | 


# Scrum Meeting 1 - Date: 10/27/2019

### Luv Khurana

#### Positives

* The overall flow with the mock data of the primary use cases was implemented using Puppeteer
* Individual components were integrated and tested with the mock data.
* Slack API helped in the testing process.

#### Negatives

* Browser testing using Puppeteer had a steep learning curve.
* Communication gap was there

#### Tasks:

* Installation  of Elastic search, Logstash and Filebeat  done  on the local system
* Puppeteer testing for Build Status Use Case was implemented
* Puppeteer testing for Error Analysis Use Case was implemented

### Venkata Sai

* Implementing Async functions to receive API calls
* Mock Jenkins API request to Bot, Mock ElasticSearch response to Bot
* Exploring Jenkins APIs and ElasticSearch APIs

* Jenkins API Documentation is not clear
* Dockerizing the infrastructure

#### Tasks

* Github - Jenkins Integration and Installing WebHooks for repository
* Implemented mock services using nock and data to support Jenkins-Bot-ElasticSearch-Slack integration
* Unit test for all the use cases using Mocha and Chai


### Jayesh

#### Positives

* Ease of creating github  webhook
* Integrating git with jenkins using github repo and pipeline feature
* Node documentation and open source support was helpful in learning quickly  


#### Negatives

* Learning a new language and implementing functions were challenging
* Jenkins API documentation was not clear, which lead to increased effort in troubleshooting for API requests
* Getting a return value from a response body of async function
* Local tunnel issue, had to restart system every time the tunnel wasn’t functioning properly


#### Tasks  

* Jenkins setup in GCP
* Creating a Dashboard for use case-2
* Browser Automation using puppeteer - queryClass Selector
* Parsing Bot response from slack and passing to the functions

### Karthick:

#### Positives

* Flexibility in integration
* Individual component functionality
* Testing of user cases
* Pair programming and debugging issues

#### Negatives

* Collaboration and integration of individual work
* Screenshare with workload
* Communication

#### Tasks

* Setup project infrastructure along with testing framework
* Install the bot into the channel
* Setup slash-commands and incoming webhooks for slack channel
* Setup bot server
* Establish communication between slack channel and bot server
* Setup mock data for the bot

![sprint1](/Images/sprint1.jpg)


# Scrum Meeting 2 - 11/4/2019


### Luv Khurana

#### Positives

* Exploring Grok Debugger and its available features for testing Grok Filters and Regex.
* Creating Regex filters for filtering Jenkins logs at Logstash.
* Kibana provides complete visibility to the logs based on the Index
* Pair Programming

#### Negatives

* The Grok Filter library for Multiline filters was not very helpful.

#### Tasks

* Testing on Grok Debugger
* Index creation in for Elastic Search
* Filters for Logstash


### Venkata Sai

#### Positives

* Various filter plugins at logstash
* Pair programming
* Learning ELK Stack

#### Negatives

Multiline log filters and XML file parsers

#### Tasks:

* Dockerizing the complete infrastructure
* Implementing regex filters at logstash to parse logs
* Indexing logs in Elasticsearch


### Jayesh

#### Positives

* Availability of Various Jenkins plugins, which ease the task
* Integrating Jenkins with the bot via post build
* Analytics was made easy from the output obtained from elastic search
* Bot launched in GCP made communication with jenkins easier


#### Negatives

* Jenkins plugin documentation usage is not given
* Troubleshooting if the jenkins plugins were working or not were difficult


#### Tasks  

* Bot setup in GCP
* Post build jenkins plugin to bot
* The post endpoint to Bot



### Karthick

#### Postitives

* Use Pull requests
* Use Code reviews
* Use JSDocs to annotate function definitions
* Everyone on the team is familiar with software engineering practices
* Pair programming

#### Negatives

* Finish my tasks a bit earlier

### Tasks

* Setup backend of server to interact with elasticsearch
* Started incorporating JSDoc syntax for Project



#### Sprint Planning;

* Jenkins: Install dependencies and integrate with bot server 
* Integration between jenkins and logstash 
* Documenting Elasticsearch and logstash setup instructions
* Parsing Log files in logstash and indexing in elasticsearch
* Providing API communication between bot server and elasticsearch
* Perform basic aggregated analytics



![sprint2](/Images/sprint2.jpg)