# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Set the command to run your app using node
CMD [ "node", "dist/index.js" ]