# Use an official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files to the working directory
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
