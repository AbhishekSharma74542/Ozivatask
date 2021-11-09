# Stable instructions should be on top and changing instructions to be on bottom
# Taking the node image from docker
FROM node:14.16.0-alpine3.13
# Creating a user adding to a group and using the user to run next set of commands
RUN addgroup abhishek && adduser -S -G abhishek abhishek
USER abhishek
# Going to the working directory where you want to set up your project
WORKDIR /app
# First install packages, if no new package this will not rebuild
COPY package*.json .
RUN npm install
# Copying current folder files to working directory
COPY . .
# Shell form command
CMD [ "node", "scrap_movies.js"]