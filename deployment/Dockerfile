FROM ubuntu:latest
WORKDIR '/etc'
RUN apt update
RUN apt-get update
RUN apt install python -y
RUN apt-get install curl -y 
RUN curl -sL https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get  install nodejs -y
RUN apt-get install aptitude -y
RUN aptitude install npm -y
COPY ./Bot/server/package.json ./
RUN npm install
COPY .  .
CMD ["node", "server/index.js"]
