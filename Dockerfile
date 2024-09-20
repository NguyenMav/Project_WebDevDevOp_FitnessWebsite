# Stage 1: Build
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: SonarQube Scan
FROM node:14 AS sonar

# Set the working directory
WORKDIR /app

# Copy the application code from the build stage
COPY --from=build /app .

# Install sonar-scanner
RUN npm install sonar-scanner

# Stage 3: Production Image
FROM node:14 AS production

# Set the working directory
WORKDIR /app

# Copy the application code from the build stage
COPY --from=build /app .

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]