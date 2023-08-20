# Use a base image
FROM node:18

RUN apt-get update && apt-get upgrade

#Set the working directory
WORKDIR /usr/src/app

#Copy package.json and package-lock.json
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the rest of the application code
COPY . . 

#Expose the desired port
EXPOSE 8080

#Start the application 
CMD ["node", "index.js"]