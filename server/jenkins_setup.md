## Jenkins intial setup stage

### Create an intital github hook and add it to the jenkins configuration

https://dzone.com/articles/adding-a-github-webhook-in-your-jenkins-pipeline

The above reference has been used to setup the jenkins. By following these steps mentioned as per the link will lead in forming a hook between jenkins and GitHub

### Adding the github repo, and initiating the build from git SCM

* Step 1 - Go to Jenkins Home

* Step 2 - New Item -> pipeline -> Add git repo -> add credentials

* Step 3 - Trigger build from SCM -> JenkinsFile(avalaible in git has pipeline stages)

### Installed dependencies such as 

* Post build action - Used to configure jenkins with post build action, this part is essential in creating the communication between bot and jenkins.

* Post Build Script - Can execute a script and enables communication to bot

