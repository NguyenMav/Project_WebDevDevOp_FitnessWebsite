# Stage 1: Build
FROM node:14 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: SonarQube Scan
FROM node:14 AS sonar

WORKDIR /app
COPY --from=build /app .

# Install sonar-scanner
RUN npm install -g sonar-scanner

# Make sure sonar-scanner has execute permissions
RUN chmod +x /usr/local/bin/sonar-scanner

# Stage 3: Production
FROM node:14 AS production

WORKDIR /app
COPY --from=build /app .

EXPOSE 3000
CMD ["npm", "start"]