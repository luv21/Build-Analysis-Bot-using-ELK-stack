## BOTWA

# Problem statement

Building and testing a software on CI tools like Jenkins, TravisCI, etc before deploying is a crucial step in software engineering process which ensures the product is reliable and robust. Often as a part of this step, we write test cases to ensure the software is reliable and does not break when it goes into the production. Sometimes the build fails and this might happen due to a failed test case, broken component, API calls fail due to network error, etc. Although we have many integrations on Github which informs us if the build is successful or not, these integrations does not give us the reasons of failure nor the performance metrics of the code. To search for the reason of failure, we have to access the logs of CI tools and search through the log dump to identify the point of failure. Also, we can take advantage of this step to gather performance metrics of these software like time and space metrics and present it to the user. 

While we can present these statistics on the CI console, accessing this console is tedious and everyone will not have access to the CI consoles. Having a common place like a slack channel to present the build status, reasons of failure and performance statistics will make the development process smoother and efficient. The bot will help the developers to get a better insight and statistics of the entire build and test process so that they can pitch in the ideas to fix or improve the software components of that particular build.  


# Bot Description

We are planning to design and implement a performance analysis bot which resides in Test stage of CI pipeline and provides us with the runtime performance metrics like time, space, network statistics, etc(TBD) along with points and reasons of failure if any test case fails during this stage. The bot can be integrated into a slack channel where all developers can be informed with the above data and can participate in discussions to debug errors or improve the performance of the software.
